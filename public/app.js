(function () {
  const STATIC_PROPOSAL_EMAIL = "info@tristateziplinerental.com";
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const actions = document.querySelector(".header-actions");
  const video = document.querySelector("[data-hero-video]");
  const videoToggle = document.querySelector("[data-video-toggle]");

  function closeMenus() {
    document.querySelectorAll(".has-submenu.is-open").forEach((item) => {
      item.classList.remove("is-open");
      const button = item.querySelector(":scope > button");
      if (button) button.setAttribute("aria-expanded", "false");
    });
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      if (actions) actions.classList.toggle("is-open", !open);
    });
  }

  document.querySelectorAll(".nav-drop-toggle").forEach((button) => {
    button.addEventListener("click", (event) => {
      const item = event.currentTarget.closest(".has-submenu");
      const wasOpen = item.classList.contains("is-open");
      closeMenus();
      item.classList.toggle("is-open", !wasOpen);
      event.currentTarget.setAttribute("aria-expanded", String(!wasOpen));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeMenus();
    if (toggle && nav) {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      if (actions) actions.classList.remove("is-open");
    }
  });

  document.addEventListener("click", (event) => {
    if (header && !header.contains(event.target)) closeMenus();
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && video) {
    video.pause();
    video.removeAttribute("autoplay");
  }

  if (video && videoToggle) {
    videoToggle.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        videoToggle.textContent = "Pause video";
        videoToggle.setAttribute("aria-pressed", "false");
      } else {
        video.pause();
        videoToggle.textContent = "Play video";
        videoToggle.setAttribute("aria-pressed", "true");
      }
    });
  }

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "gallery_filter_clicked", filter: button.dataset.filter });
    });
  });

  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => {
      const eventName = element.dataset.track;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: `${eventName}_clicked`, label: element.textContent.trim() });
      if (window.fbq && eventName === "phone") window.fbq("trackCustom", "PhoneLinkClicked");
      if (window.fbq && eventName === "email") window.fbq("trackCustom", "EmailLinkClicked");
    });
  });

  document.querySelectorAll("[data-proposal-form]").forEach((form) => {
    const params = new URLSearchParams(window.location.search);
    const landing = form.querySelector('[name="landingPage"]');
    const utmSource = form.querySelector('[name="utmSource"]');
    const utmMedium = form.querySelector('[name="utmMedium"]');
    const utmCampaign = form.querySelector('[name="utmCampaign"]');
    if (landing) landing.value = window.location.pathname;
    if (utmSource) utmSource.value = params.get("utm_source") || "";
    if (utmMedium) utmMedium.value = params.get("utm_medium") || "";
    if (utmCampaign) utmCampaign.value = params.get("utm_campaign") || "";

    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener(
        "focus",
        () => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: "proposal_form_started" });
        },
        { once: true },
      );
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = form.querySelector(".form-status");
      if (status) status.textContent = "Submitting proposal request...";

      if (isStaticPageHost()) {
        if (status) status.textContent = "Opening your email client with the proposal request details.";
        window.location.href = buildProposalMailto(form);
        return;
      }

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(form)),
        });
        const result = await response.json();
        if (!response.ok || !result.ok) {
          throw new Error(result.error || "Submission failed");
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "proposal_form_submitted", proposal_id: result.id });
        if (window.fbq) window.fbq("track", "Lead");
        window.location.href = result.redirectedTo || "/proposal-confirmation";
      } catch (error) {
        if (status) status.textContent = "The request could not be submitted. Please check the form or call the team directly.";
      }
    });
  });

  function isStaticPageHost() {
    return window.location.hostname.endsWith("github.io");
  }

  function buildProposalMailto(form) {
    const data = new FormData(form);
    const organization = String(data.get("organizationName") || "Event Proposal").trim();
    const fields = [
      "organizationName",
      "contactName",
      "email",
      "phone",
      "eventDate",
      "eventType",
      "attendance",
      "budgetRange",
      "eventLocation",
      "city",
      "state",
      "availableLength",
      "availableWidth",
      "surfaceType",
      "indoorOutdoor",
      "truckAccess",
      "overheadObstructions",
      "desiredPackage",
      "brandingInterest",
      "eventGoals",
      "additionalNotes",
      "landingPage",
      "utmSource",
      "utmMedium",
      "utmCampaign",
    ];
    const body = fields
      .map((name) => [fieldLabel(name), String(data.get(name) || "").trim()])
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");
    const params = new URLSearchParams({
      subject: `Tri-State Zipline proposal request - ${organization}`,
      body: `${body}\n\nSubmitted from: ${window.location.href}`,
    });
    return `mailto:${STATIC_PROPOSAL_EMAIL}?${params.toString()}`;
  }

  function fieldLabel(name) {
    return String(name)
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (letter) => letter.toUpperCase());
  }
})();
