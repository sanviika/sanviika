# Targets screens — HTML replica

Static HTML versions of the Figma section **“For Claude”**
(file `UtHigEPGn4RZZxHl7ihXoQ`, node `10013:45621`), built **only** from the
**Supply Wisdom Design System 1.0** (file `4SZ0GfBdj3o2oZNT7WIY7v`).
They are the starting point for the redesign: edit the HTML/CSS directly.

Open `index.html` in a browser. No build step and no dependencies (Roboto loads from Google Fonts).

## Structure

```
design/
├── index.html                     list of screens + their Figma frames
├── assets/
│   ├── tokens.css                 every DS token (colour, spacing, radius, size, type)
│   ├── components.css             DS components as .sw-* classes (tokens only)
│   ├── icons.js                   the 60 DS icons as an SVG sprite (currentColor)
│   └── app.js                     small behaviours (tabs, chips, row expand, editor…)
└── screens/
    ├── targets.html               Targets Main Screen
    ├── cyber-score.html           Cyber Score (empty state)
    ├── target-about.html          About > TP > Filled
    ├── target-subscriptions.html  Subscription
    ├── target-risk-metric.html    Default  (add #expanded for "Default > Expanded")
    └── target-trend.html          Trend
```

The screens link to each other the way the Figma flow arrows do: target name → About,
the record tabs, the back arrow, and the Targets / Cyber Score toggle.

## Working with it

- **Change a colour or spacing everywhere:** edit `assets/tokens.css`.
- **Change a component everywhere:** edit its block in `assets/components.css`.
  The block headers use the DS component names (Button, Input, Select, Chip, Risk Metric Table…).
- **Change one screen:** edit the HTML in `screens/`. Page-specific layout lives in that page's `<style>` tag.
- **Icons:** `<svg class="sw-icon" style="--size:20px"><use href="#i-NAME"></use></svg>`.
  `window.SW_ICONS` lists the available names.

## Where the Figma screens differ from the design system

These parts of the screens are not in the DS, so the nearest DS element was used instead:

| In the Figma screen | Used instead (DS) |
| --- | --- |
| Supply Wisdom logo image | Nav Bar logo mark ("S") + wordmark |
| mingcute / icon-park / heroicons icons | DS icons (`comment`, `chevron-down`, `swap`, `hash`, `history`, `edit`, `trash`, `cloud-upload`, …) |
| Underlined "Active / Inactive Subscriptions" tabs | Segmented Control |
| Gray box behind the record tabs | Page Header (Record), which has no box, as in the DS Risk Metric template |
| Dashed section separators | Divider (solid) |
| Purple "+ Add" text links | Tertiary Button with a plus icon |
| Cognizant logo thumbnail next to "Logo.png" | `image` icon |
| Editor "clear formatting" and code-block buttons | DS editor toolbar set (bold, italic, underline, strike, code, lists, link, image, quote, divider) |
| Calculator icon inside the "NA" value cell | Plain table Value input |
| Dark rating text on red cells | `text/on-action` (white), as the DS Rating Cell specifies |

Dark mode is not wired up yet. The DS defines dark values, but only part of them could be read from Figma.
The moon icon is there; add a `[data-theme="dark"]` block to `tokens.css` to turn it on.
