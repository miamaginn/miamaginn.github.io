# Handoff: Mia's portfolio site ("The Scenic Route")

Paste this file into Claude Code along with `index.html` (the finished prototype). The goal is to get the site into a real repo, tidy it up, and publish it on a live URL.

## What this is

A personal portfolio that houses projects (vibe-coded sites, apps, experiments), Substack essays, social links and a short bio. Instead of a normal page, visitors "walk" a winding trail through a low-poly 3D landscape as they scroll. A prominent **Skip the walk** button opens a plain see-everything page, and **Return to the scenic route** brings them back.

`index.html` is a complete, working, single-file site. No build step is required to run it.

## The one rule: do not rewrite the design

The look and feel were chosen deliberately over many rounds. Please keep the visuals, layout and motion as they are unless asked. Work on content, polish, performance, accessibility and deployment.

## Design decisions already made (keep these)

- Bright palette that shifts through the walk: dawn peach, blue day, golden hour, dusk purple and coral, then night. Sky changes arrive as expanding circles.
- Real WebGL terrain (three.js, bundled inline): low-poly hills on both sides, faceted shading, fog that matches the sky, low-poly pine trees, a narrow earthy footpath. Camera is level and walks forward along the winding path.
- Type: Instrument Serif (headings), Geist (body), Geist Mono (labels), loaded from Google Fonts.
- Start screen is a big wooden trailhead sign planted in the grass beside the path, with a trail map, the four-stop route list, and social links.
- Stops appear beside the path and grow as you reach them: About (with a photo circle placeholder), three project windows (browser-window style), Essays, Elsewhere (social links orbiting a ring), and an end card.
- Two birds fly in carrying a banner ("Click on each project to learn more.") over the first project.
- Top bar: name on the left, **About** and **Contact Me** right next to it, **Skip the walk** on the right. No social links in the top bar.
- Removed on purpose: lamp posts, the lantern, dotted center line, big outlined text in the sky, coins, a pixel character, a campfire. Do not add these back.

## Content rules

- Never use em-dashes anywhere in copy.
- Do not mention wealth management, and do not mention the concert logging app.
- Keep the tone warm and natural, not corporate.

## Where to edit content

Everything lives in one `SITE` object near the top of the main script in `index.html`:

- `name`, `photo` (image URL or data URI; empty shows the dashed placeholder circle), `tagline`, `bio` (two paragraphs)
- `route` (the four short descriptions on the sign)
- `projects` (name, type, host, blurb, url) for three projects
- `essays` (title, meta, url) for three essays
- `socials` (name, url) for Substack, LinkedIn, Instagram, X
- `closing` and `email`

All of these are currently placeholders for Mia to fill in. Ask her for real copy and links, or leave the placeholders and list what is still missing.

## How it works (so changes do not break it)

- **Scroll engine:** a tall scroller with a sticky full-height stage. Scroll progress maps to distance along the route, with a slow-in, slow-out ease so the camera lingers at each stop. The camera follows a smoothed version of the scroll position.
- **Terrain:** generated in code from noise, built as a grid that follows the winding route. Custom shader handles low/high colors, sun lighting and fog, all driven by the current sky palette.
- **Stops:** HTML cards positioned by projecting 3D anchor points to the screen each frame, scaled by distance. The sign is anchored at ground level.
- **Modes:** hash routes `#scenic-route` and `#everything` switch between the walk and the plain page. Scroll position is saved and restored when switching.
- **three.js:** a slim bundle (about 500 KB) is inlined in the first `<script>` tag. If you want, replace it with an npm install of `three` and a small bundler setup, but the behavior must stay identical.

## Suggested tasks, in order

1. **Set up the repo.** Create a folder with `index.html`, a `README.md`, and a `.gitignore`. Initialize git and commit the prototype unchanged first, so there is a clean baseline.
2. **Add real metadata.** Page title, meta description, Open Graph and Twitter card tags, favicon, `lang`, and a theme color. Use placeholders for the share image until Mia supplies one.
3. **WebGL fallback.** If WebGL is unavailable or fails to initialize, automatically show the see-everything page instead of a blank stage.
4. **Reduced motion.** Respect `prefers-reduced-motion`: keep the walk but remove the bird flutter, hover bobbing and long transitions, or default to the see-everything page.
5. **Accessibility pass.** Make sure all stop content is reachable by keyboard and screen readers (focusing a stop link already scrolls to it), check color contrast on the wooden sign and cards, and add a visible focus style check.
6. **Mobile check.** Test at 360, 390 and 430 px wide and on a short landscape phone. The sign sits snug under the top bar on small screens, so give it a bit more room if needed.
7. **Performance.** Cap the pixel ratio (already 2), confirm 60 fps on a mid-range phone, and consider lowering terrain density or tree count on low-end devices.
8. **Photo slot.** When Mia has a photo, set `SITE.photo` and confirm it looks right in the About card and on the see-everything page.
9. **Real content and links.** Fill in the `SITE` object once Mia provides copy, project URLs, essay links and social handles.

## Deployment

Pick one of these (all free for a static site), then connect a custom domain if Mia has one:

- **Cloudflare Pages** or **Netlify**: connect the GitHub repo, no build command, publish directory is the repo root.
- **Vercel**: import the repo, framework preset "Other", no build command.
- **GitHub Pages**: enable Pages on the main branch, root folder.

After publishing, test the live URL on a phone, test both `#scenic-route` and `#everything`, and check the share preview in a link debugger.

## Things to confirm with Mia before launch

- Which domain to use, and whether to buy one.
- Final project list and which three to feature first.
- Whether the photo should be a real photo or an illustration.
- Whether to keep the scenic route as the default landing view or let the see-everything page load first on mobile.
