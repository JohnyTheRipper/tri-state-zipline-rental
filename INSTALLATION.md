# Installation

## Requirements

- Node.js 20+
- SSL-capable production host
- Reverse proxy such as Nginx, Caddy, Apache or managed Node hosting
- Process manager such as PM2 or systemd

## Local Setup

```bash
cd "Partners/TriStateZiplineRental"
npm start
```

## Production Setup

1. Copy this folder to the production server.
2. Set `PORT` if the host requires a specific port.
3. Run `npm start` under a process manager.
4. Put the app behind SSL.
5. Configure backups for `data/proposals.json`.
6. Replace placeholder media.
7. Configure analytics, CRM and chatbot snippets in a consent-safe way before adding them to the template.

## Notes

- No secrets are hardcoded.
- Proposal submissions are written to `data/proposals.json`.
- For high-volume lead capture, replace JSON storage with PostgreSQL, MySQL, Airtable, HubSpot or a CRM webhook.

