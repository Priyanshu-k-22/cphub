# CpHub Website

A React + Vite + Tailwind site for CpHub, the college's Competitive Programming and DSA community.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Folder structure

```
cp-dsa-club/
├── index.html              # HTML shell, loads fonts + the app
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Assembles every section, in page order
│   ├── index.css            # Tailwind + custom animations (terminal cursor,
│   │                         floating cards, scanline, grid background)
│   ├── ui/                  # Small reusable pieces used across sections
│   │   ├── Container.jsx        # Page-width wrapper
│   │   ├── SectionLabel.jsx     # "// 01/10  Section Title" divider
│   │   ├── VerdictBadge.jsx     # Status pill (OPEN/CLOSED/LIVE/etc.)
│   │   └── Buttons.jsx          # PrimaryButton, GhostButton
│   ├── hooks/
│   │   ├── useInView.js         # Triggers animated stat counters on scroll
│   │   └── useCountdown.js      # Live "HH : MM : SS" contest countdown
│   ├── data/                 # Edit these to update site content — no JSX here
│   │   ├── events.js
│   │   ├── contests.js
│   │   ├── leaderboard.js
│   │   ├── team.js              # President, Organisers, Problem/Solutions teams
│   │   ├── achievements.js
│   │   └── gallery.js
│   └── components/           # One file per homepage section
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── ClubIntro.jsx
│       ├── Vision.jsx
│       ├── Mission.jsx
│       ├── Stats.jsx
│       ├── Events.jsx
│       ├── Contests.jsx
│       ├── Leaderboard.jsx
│       ├── OurTeam.jsx          # President + Organisers + Problem Setting + Solutions
│       ├── Achievements.jsx
│       ├── Gallery.jsx
│       ├── About.jsx
│       ├── Join.jsx
│       ├── Contact.jsx
│       └── Footer.jsx
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Where to edit things

- **Change any content (names, dates, scores, roles):** edit the matching file in `src/data/`.
  Components just render whatever is in there.
- **Change a section's layout or styling:** edit its file in `src/components/`.
- **Add a new section:** create a component in `src/components/`, add its data file in
  `src/data/` if needed, then import and place it in `src/App.jsx`. Add a matching link in
  `NAV_LINKS` inside `src/components/Navbar.jsx`.
- **Change colors/fonts globally:** the palette is used as inline Tailwind hex classes
  (e.g. `text-[#4AFFC4]`) throughout `src/components/*` — the core tokens are:
  - Background: `#060A10` / `#080D14` / `#0C1420`
  - Border: `#1C2734`
  - Accent (verdict green): `#4AFFC4`
  - Text: `#EDF2F7` (primary), `#AEB9C7` / `#8B95A7` (secondary), `#556275` (muted)
  - Fonts: Space Grotesk (display), JetBrains Mono (mono/data), Inter (body)

## Our Team section

`src/data/team.js` has two exports:

- `LEADERSHIP` — the President, shown as a featured card at the top.
- `TEAM_GROUPS` — an array of groups (Organisers, Problem Setting Team, Solutions Team),
  each with a short description and a list of members. Add/remove members or whole groups
  here; the `OurTeam.jsx` component renders whatever is in this file automatically.
