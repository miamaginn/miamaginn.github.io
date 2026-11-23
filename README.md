# The Scenic Route

Mia's portfolio. Visitors walk a winding trail through a low-poly 3D landscape as they scroll, chasing a little pink bug past an about card, three projects, essays and social links. At the end you catch the bug and it radiates hearts. **Skip the chase** opens a plain page with everything on it.

It's a static site with no build step.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole site: styles, markup and the main script |
| `vendor/three.min.js` | A slim three.js bundle (MIT) used for the 3D terrain |
| `favicon.svg`, `apple-touch-icon.png` | Browser and home screen icons |
| `og-image.png` | Placeholder share image (1200×630). Swap in a real one any time |
| `tools/make-images.js` | Regenerates the placeholder PNGs: `node tools/make-images.js` |
| `HANDOFF.md` | The original design notes. Read the "do not rewrite the design" rule before changing visuals |

## Editing content

All copy and links live in the `SITE` object near the top of the main script in `index.html`:

- `name`, `photo` (image URL or path like `photo.jpg`; empty shows the dashed placeholder), `tagline`, `chase` (sign only), `updates`, `bio` (two paragraphs)
- `route`: the four short lines on the trailhead sign
- `projects`: name, type, host, blurb, url. Add as many as you like: each one becomes its own stop on the walk (the sky and stop numbers adjust). Optional extras: `demo` (a list of screenshots, shown as a slideshow instead of linking out) and `lizard: true` (the lizard with the Add to Home Screen sign)
- `essays`: title, meta, url (three of them)
- `socials`: name, url (currently Substack and TikTok; add more entries any time)
- `closing`
- `contact.endpoint`: where the Contact Me form sends messages (see below)

Copy rules: no em-dashes, keep it warm and natural.

## Contact form

**Contact Me** (top bar, end card and plain-page footer) opens a small form. It posts to [FormSubmit](https://formsubmit.co), a free service with no account, which emails each message to Mia. The address is never displayed on the page.

- The very first message sent through the form triggers an activation email from FormSubmit. Click the link in it once; after that, messages are delivered.
- That email also offers a random alias. Put it in place of the address in `contact.endpoint` (`https://formsubmit.co/ajax/<alias>`) so the address is not in the page source either.

## Running locally

Open `index.html` directly, or serve the folder (better, since it matches production):

```
npx http-server -p 8642 -c-1
```

Then visit `http://localhost:8642/` (the walk) and `http://localhost:8642/#everything` (the plain page).

## Deploying

Any static host works. No build command; publish directory is the repo root.

- **Cloudflare Pages / Netlify:** connect the GitHub repo, leave the build command empty, output directory `/`.
- **Vercel:** import the repo, framework preset "Other", no build command.
- **GitHub Pages:** Settings → Pages → deploy from `main`, root folder.

Live at https://miamaginn.github.io (GitHub Pages, deployed from `main`). If you move to a custom domain, replace `https://miamaginn.github.io` in the `<head>` of `index.html` so share previews keep working.

## Behaviour notes

- **No WebGL:** if the browser can't run WebGL, or the GPU context is lost, the site switches to the plain page and hides the scenic-route buttons.
- **The bug:** a projected sprite (like the stop cards), always a few steps ahead on the path. Over the last stretch you close the gap, it turns around and the caption appears. It steers clear of the end card on every screen size.
- **Reduced motion:** with `prefers-reduced-motion`, the walk stays but the bird flutter, bug scuttling, floating hearts, card bobbing, orbiting links, hover lifts and long fade-ins are turned off, and jump links scroll instantly.
- **Low-end devices** (4 or fewer CPU cores, or 3 GB or less memory) get fewer trees and a lower pixel ratio. Same look, lighter load.
- **Keyboard and screen readers:** every stop stays in the accessibility tree; tabbing to a link in a stop walks the camera there.
