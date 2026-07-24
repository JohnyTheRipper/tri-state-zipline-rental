const business = {
  name: "Tri-State Zipline Rental",
  tagline: "America's Premier Mobile Zipline Experience",
  secondaryTagline:
    "Mobile Zipline Experiences for Colleges, Corporate Events, Festivals, and Municipalities Throughout the Northeast.",
  operatedBy: "Extreme Party Racing & Entertainment",
  phoneDisplay: "(732) 357-ZIP1",
  phoneSecondary: "(732) 357-9471",
  phoneHref: "+17323579471",
  email: "info@tristateziplinerental.com",
  region: "New Jersey, New York, Pennsylvania, and the Northeast",
  referenceImage: "/assets/premier_zipline.jpg",
  proposalEmail: "info@tristateziplinerental.com"
};

const nav = [
  {
    label: "Experiences",
    href: "/experiences",
    items: [
      ["Mobile Zipline", "/mobile-zipline"],
      ["Adventure Zones", "/experiences#adventure-zones"],
      ["Additional Attractions", "/experiences#additional-attractions"],
      ["Brand Activations", "/brand-activations"]
    ]
  },
  {
    label: "Packages",
    href: "/packages",
    items: [
      ["Package Overview", "/packages"],
      ["Package Comparison", "/package-comparison"],
      ["Request Proposal", "/request-a-proposal"]
    ]
  },
  {
    label: "Who We Serve",
    href: "/who-we-serve",
    items: [
      ["Colleges", "/colleges-and-universities"],
      ["Corporate Events", "/corporate-events"],
      ["Municipal Events", "/municipal-events"],
      ["Festivals", "/festivals-and-county-fairs"],
      ["Tourism", "/tourism-and-destination-marketing"],
      ["Camps", "/camps-and-youth-programs"],
      ["Brand Activations", "/brand-activations"]
    ]
  },
  { label: "Safety", href: "/safety" },
  { label: "Gallery", href: "/gallery" },
  {
    label: "Resources",
    href: "/resources",
    items: [
      ["Event Planning", "/event-planning"],
      ["Safety", "/safety"],
      ["FAQs", "/frequently-asked-questions"],
      ["Videos", "/videos"],
      ["Case Studies", "/case-studies"],
      ["Blog", "/blog"]
    ]
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

const trustStrip = [
  ["Fully Insured", "Commercial event coverage and documentation available"],
  ["Professionally Operated", "Experienced event and attraction staff"],
  ["Staff Included", "Setup, operation, supervision and breakdown"],
  ["Northeast Coverage", "New Jersey, New York, Pennsylvania and beyond"],
  ["State Inspected", "Commercial-grade event equipment"]
];

const packages = [
  {
    slug: "signature-zipline",
    name: "Signature Zipline",
    price: "$5,500+",
    short: "The flagship staffed mobile zipline experience.",
    bestFor: "Colleges, municipal events, fairs, festivals and high-traffic public events",
    features: [
      "Mobile zipline",
      "Professional operators",
      "Safety equipment",
      "Standard setup and operation",
      "Event planning support",
      "Insurance documentation upon request"
    ],
    staffing: "Professional operators included",
    size: "Professional event audiences",
    duration: "Owner-approved operating window required",
    branding: "Available with approved production plan",
    logistics: "Final layout depends on access, surface, clearances and event plan."
  },
  {
    slug: "adventure-zone",
    name: "Adventure Zone",
    price: "$9,500+",
    short: "A larger attraction footprint anchored by the mobile zipline.",
    bestFor: "Events that need a complete attraction zone, not a single rental item",
    features: [
      "Mobile zipline",
      "One or more additional attractions",
      "Professional staffing",
      "Setup and breakdown",
      "Event operations support"
    ],
    staffing: "Professional staffing",
    size: "Medium to large events",
    duration: "Single or expanded event windows",
    branding: "Available",
    logistics: "Attraction mix and site plan require owner approval."
  },
  {
    slug: "campus-takeover",
    name: "Campus Takeover",
    price: "$12,000+",
    short: "A campus-ready activation for student-life teams.",
    bestFor: "Welcome Week, orientation, homecoming, spring fling and campus festivals",
    features: [
      "Mobile zipline",
      "Multiple premium attractions",
      "Campus-event coordination",
      "Professional staff",
      "Crowd-flow planning",
      "Event support"
    ],
    staffing: "Professional staff",
    size: "Campus-wide events",
    duration: "Campus-specific schedule",
    branding: "University and sponsor opportunities",
    logistics: "Campus access, security and operating hours reviewed during planning."
  },
  {
    slug: "municipal-festival-package",
    name: "Municipal Festival Package",
    price: "$15,000+",
    short: "Public-event support for high-attendance community events.",
    bestFor: "Town days, National Night Out, fairs, county festivals and public celebrations",
    features: [
      "Premium attraction package",
      "Professional event staff",
      "Site-planning support",
      "Operations area",
      "Public-event coordination",
      "Full setup and breakdown"
    ],
    staffing: "Public-event staff",
    size: "High-attendance public events",
    duration: "Single or multi-day availability with approved plan",
    branding: "Sponsor integration available",
    logistics: "Procurement, insurance and public-site planning support available."
  },
  {
    slug: "corporate-adventure-activation",
    name: "Corporate Adventure Activation",
    price: "$25,000+",
    short: "A high-impact activation for employee engagement and brand moments.",
    bestFor: "Employee appreciation, corporate family days, product launches and branded events",
    features: [
      "Multiple premium attractions",
      "Branded experience options",
      "Dedicated event manager",
      "Professional staffing",
      "Production support",
      "Corporate-event coordination"
    ],
    staffing: "Premium staffing and dedicated event manager",
    size: "Corporate campuses and major company events",
    duration: "Custom event schedule",
    branding: "Advanced branding options",
    logistics: "Designed for HR, employee engagement, internal comms and agency teams."
  },
  {
    slug: "large-scale-custom-activation",
    name: "Large-Scale Custom Activation",
    price: "$40,000+",
    short: "A custom production engagement for major events and agencies.",
    bestFor: "Agencies, tourism groups, sponsors and major multi-day event producers",
    features: [
      "Multiple major attractions",
      "Multi-day operation",
      "Custom branding",
      "Sponsor integration",
      "Dedicated production management",
      "Advanced logistics planning",
      "Custom guest experience",
      "Video and content opportunities",
      "Agency coordination"
    ],
    staffing: "Dedicated production team",
    size: "Major events and destination activations",
    duration: "Custom scope",
    branding: "Full custom activation planning",
    logistics: "Requires custom discovery and production planning."
  }
];

const audiences = {
  "colleges-and-universities": {
    title: "Colleges & Universities",
    headline: "Campus zipline experiences built for student-life impact.",
    concerns: ["Risk review", "Campus access", "Student participation", "Crowd flow", "Procurement documentation"],
    examples: [
      "Welcome Week",
      "Homecoming",
      "Orientation",
      "Spring Fling",
      "Student Activities",
      "Campus Festivals",
      "Alumni Events",
      "Recruitment Events"
    ],
    recommended: ["Signature Zipline", "Adventure Zone", "Campus Takeover"]
  },
  "corporate-events": {
    title: "Corporate Events",
    headline: "Adventure-driven corporate experiences that get employees participating.",
    concerns: ["Brand impact", "Employee engagement", "Legal review", "Vendor credibility", "Executive confidence"],
    examples: [
      "Employee Appreciation",
      "Family Days",
      "Company Picnics",
      "Team Building",
      "Grand Openings",
      "Employee Engagement",
      "Product Launches",
      "Corporate Campus Events"
    ],
    recommended: ["Adventure Zone", "Corporate Adventure Activation", "Large-Scale Custom Activation"]
  },
  "municipal-events": {
    title: "Municipal Events",
    headline: "A public-event centerpiece with professional planning support.",
    concerns: ["Insurance documents", "Public safety", "Procurement", "Crowd control", "Community appeal"],
    examples: [
      "Town Days",
      "National Night Out",
      "Community Festivals",
      "Summer Concert Series",
      "Parks and Recreation Events",
      "Holiday Events",
      "Public Celebrations"
    ],
    recommended: ["Signature Zipline", "Municipal Festival Package"]
  },
  "festivals-and-county-fairs": {
    title: "Festivals & County Fairs",
    headline: "A visible, media-worthy attraction for fairgrounds and festivals.",
    concerns: ["Attendance draw", "Queue flow", "Site access", "Sponsor value", "Multi-day operation"],
    examples: ["County Fairs", "Food Festivals", "Street Festivals", "Seasonal Celebrations", "Sponsored Attractions"],
    recommended: ["Signature Zipline", "Municipal Festival Package", "Large-Scale Custom Activation"]
  },
  "tourism-and-destination-marketing": {
    title: "Tourism & Destination Marketing",
    headline: "Destination activations that create photo, video and attendance value.",
    concerns: ["Visitor draw", "Media appeal", "Sponsor integration", "Location logistics", "Brand alignment"],
    examples: ["Tourism Events", "Destination Activations", "Waterfront Events", "Regional Campaigns", "Sponsored Attractions"],
    recommended: ["Corporate Adventure Activation", "Large-Scale Custom Activation"]
  },
  "camps-and-youth-programs": {
    title: "Camps & Youth Programs",
    headline: "Adventure programming for large youth audiences and camp events.",
    concerns: ["Supervision", "Program value", "Safety review", "Site suitability", "Schedule planning"],
    examples: ["Camp Program Days", "Youth Leadership Events", "Summer Programming", "Teen Events"],
    recommended: ["Signature Zipline", "Adventure Zone"]
  },
  "brand-activations": {
    title: "Brand Activations",
    headline: "Sponsor-ready zipline activations for experiential marketing teams.",
    concerns: ["Brand visibility", "Content capture", "Sponsor integration", "Agency workflow", "Custom production"],
    examples: ["Experiential Marketing", "Sponsor Integration", "Agency Activations", "Product Launches", "Content Opportunities"],
    recommended: ["Corporate Adventure Activation", "Large-Scale Custom Activation"]
  }
};

const seoPages = {
  "mobile-zipline-rental": {
    title: "Mobile Zipline Rental for Major Events",
    copy: "A professionally staffed attraction for colleges, corporations, municipalities, festivals and tourism events.",
    angle: "General buyer education with practical planning guidance."
  },
  "zipline-rental-nj": {
    title: "Zipline Rental NJ",
    copy: "Mobile zipline experiences for New Jersey municipalities, universities, corporate campuses, fairs and tourism events.",
    angle: "New Jersey planners often need insurance documentation, municipal fit review, traffic planning and visible public-event value."
  },
  "zipline-rental-ny": {
    title: "Zipline Rental NY",
    copy: "Premium mobile zipline production for New York colleges, companies, festivals, municipal events and tourism activations.",
    angle: "New York events often require careful access, production timing, crowd flow and venue coordination."
  },
  "zipline-rental-pa": {
    title: "Zipline Rental PA",
    copy: "High-impact mobile zipline experiences for Pennsylvania events, campuses, fairs, parks and corporate programs.",
    angle: "Pennsylvania events include campuses, fairgrounds, parks, corporate campuses and regional tourism activations."
  },
  "college-zipline-rental": {
    title: "College Zipline Rental",
    copy: "A campus-ready centerpiece for welcome week, orientation, homecoming, spring fling and student activities.",
    angle: "Student-life teams need participation, safety review, campus access planning and simple proposal documentation."
  },
  "corporate-zipline-rental": {
    title: "Corporate Zipline Rental",
    copy: "A premium employee-engagement and brand-impact experience for corporate campuses and major company events.",
    angle: "Corporate planners need risk confidence, executive-ready presentation and employee participation."
  },
  "festival-zipline-rental": {
    title: "Festival Zipline Rental",
    copy: "A visible attraction that can anchor attendance, sponsorship and crowd excitement at fairs and festivals.",
    angle: "Festival producers need a central draw, queue planning, sponsor visibility and reliable operation."
  },
  "municipal-zipline-rental": {
    title: "Municipal Zipline Rental",
    copy: "Professional planning support for town days, parks and recreation events, National Night Out and public celebrations.",
    angle: "Municipal buyers care about procurement, insurance, public safety and vendor credibility."
  },
  "mobile-zipline-for-universities": {
    title: "Mobile Zipline for Universities",
    copy: "A safe, staffed and memorable student-life activation for university event teams.",
    angle: "University teams need campus coordination, student turnout and planning support."
  },
  "employee-engagement-activities": {
    title: "Employee Engagement Activities",
    copy: "Adventure-driven corporate experiences that encourage participation and create shared memories.",
    angle: "HR teams need more than entertainment; they need participation and a strong internal story."
  },
  "corporate-team-building-activities": {
    title: "Corporate Team Building Activities",
    copy: "A high-energy alternative to ordinary team-building entertainment for large-scale corporate events.",
    angle: "Large teams need a visible, memorable activity that feels premium and professionally managed."
  }
};

const faqs = [
  [
    "How much space is required?",
    "Preliminary planning starts at approximately 200 feet in length, approximately 30 feet of overhead clearance, an open setup area, truck and trailer access, and no overhead obstructions. Final dimensions, clearances, anchoring, access, operating layout and site suitability must be confirmed before booking."
  ],
  [
    "Is the mobile zipline insured?",
    "Insurance documentation may be available upon request. Exact coverage language and limits must be verified by the business owner before production launch."
  ],
  [
    "How many riders can participate per hour?",
    "Final rider requirements and operating capacity depend on the approved configuration and will be confirmed during planning."
  ],
  ["Can the zipline operate on pavement?", "Potential site surfaces are reviewed during planning. Surface suitability depends on venue layout, access, anchoring, operating configuration and local requirements."],
  ["How far do you travel?", "Tri-State Zipline Rental primarily serves New Jersey, New York, Pennsylvania and the Northeast. Travel outside the core region may be reviewed for qualified events."],
  ["What ages can ride?", "Final rider requirements depend on the approved configuration and owner-approved operating rules. Do not publish exact age requirements until verified."],
  ["Can additional attractions be added?", "Yes. Adventure Zone, Campus Takeover, Municipal Festival, Corporate Adventure Activation and custom packages can include additional attractions subject to owner approval and event requirements."],
  ["Can the zipline operate at night?", "Night operation may be possible with appropriate planning, lighting, staffing and site approval. Final feasibility is confirmed during planning."],
  ["What happens if it rains?", "Weather plans are reviewed during event planning. Do not publish exact wind, rain or shutdown limits until verified by the owner."],
  ["How early should we book?", "Major public, university and corporate events should begin planning as early as practical, especially for high-attendance dates, municipal procurement and multi-day activations."],
  ["Are professional operators included?", "Yes. Professional operators are included as part of the staffed mobile zipline experience."],
  ["Is setup and breakdown included?", "Yes. Standard setup and breakdown are included, subject to event access, layout, timing and approved scope."],
  ["Can you provide insurance documents?", "Documentation may be provided for qualified events. Exact documents and wording require owner verification."],
  ["Can the experience be branded?", "Branding opportunities may be available for corporate events, sponsors, tourism activations and agencies. Custom branding requires planning and owner approval."],
  ["Do you work with municipalities and universities?", "Yes. The experience is structured for recreation departments, public-sector buyers, college activities teams and professional event planners."],
  ["Can you support multi-day events?", "Multi-day operation may be available for qualified events and custom activations, subject to scope, staffing and logistics."],
  ["What information is required for a proposal?", "Useful proposal information includes date, location, audience size, event type, budget range, available length and width, surface type, indoor/outdoor setting, overhead obstructions, truck access, operating hours and event goals."],
  ["Are permits required?", "Permit requirements vary by venue and municipality. The organizer should identify local requirements; Tri-State Zipline Rental can support planning documentation where appropriate."],
  ["Is truck access required?", "Truck and trailer access are preliminary planning requirements and must be confirmed during site review."],
  ["What surface types are acceptable?", "Surface suitability depends on site conditions and approved configuration. Final suitability must be confirmed before booking."]
];

const galleryCategories = [
  "Mobile Zipline",
  "Colleges and Universities",
  "Municipal Events",
  "Corporate Events",
  "Festivals",
  "Tourism Events",
  "Camps",
  "Brand Activations",
  "Daytime Events",
  "Nighttime Events",
  "Drone Photography",
  "Rider Closeups",
  "Crowd Shots",
  "Setup and Operations",
  "Branding Opportunities"
];

const videoCategories = [
  "Homepage Hype Video",
  "Drone Reel",
  "POV Ride Footage",
  "College Event Footage",
  "Corporate Event Footage",
  "Municipal Event Footage",
  "Festival Footage",
  "Nighttime Footage",
  "Setup Footage",
  "Client Testimonials"
];

const blogIdeas = [
  "How to Plan a Mobile Zipline Experience for a College Event",
  "Mobile Zipline Space Requirements Explained",
  "How Municipalities Can Create a Festival Centerpiece",
  "Employee Engagement Activities That Drive Participation",
  "Planning a High-Impact Corporate Family Day",
  "How Far in Advance Should You Book a Mobile Zipline?",
  "What Event Planners Should Know About Attraction Insurance",
  "Mobile Zipline Ideas for Welcome Week and Orientation",
  "How to Add Branded Experiences to a Corporate Event",
  "Daytime Versus Nighttime Zipline Events"
];

const corePages = {
  "/mobile-zipline": "Mobile Zipline",
  "/experiences": "Experiences",
  "/packages": "Packages",
  "/package-comparison": "Package Comparison",
  "/who-we-serve": "Who We Serve",
  "/safety": "Safety",
  "/event-planning": "Event Planning",
  "/gallery": "Gallery",
  "/videos": "Videos",
  "/case-studies": "Case Studies",
  "/about": "About",
  "/resources": "Resources",
  "/blog": "Blog",
  "/frequently-asked-questions": "Frequently Asked Questions",
  "/contact": "Contact",
  "/request-a-proposal": "Request a Proposal",
  "/proposal-confirmation": "Proposal Confirmation",
  "/privacy-policy": "Privacy Policy",
  "/terms-and-conditions": "Terms and Conditions",
  "/accessibility-statement": "Accessibility Statement"
};

module.exports = {
  business,
  nav,
  trustStrip,
  packages,
  audiences,
  seoPages,
  faqs,
  galleryCategories,
  videoCategories,
  blogIdeas,
  corePages
};
