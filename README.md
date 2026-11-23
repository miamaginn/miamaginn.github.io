# The Scenic Route

Mia's portfolio. Visitors walk a winding trail through a low-poly 3D landscape as they scroll, stopping at an about card, three projects, essays and social links. **Skip the walk** opens a plain page with everything on it.

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

- `name`, `photo` (image URL or path like `photo.jpg`; empty shows the dashed placeholder), `tagline`, `bio` (two paragraphs)
- `route`: the four short lines on the trailhead sign
- `projects`: name, type, host, blurb, url (three of them)
- `essays`: title, meta, url (three of them)
- `socials`: name, url
- `closing` and `email`

Copy rules: no em-dashes, keep it warm and natural.

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
- **Reduced motion:** with `prefers-reduced-motion`, the walk stays but the bird flutter, card bobbing, orbiting links, hover lifts and long fade-ins are turned off, and jump links scroll instantly.
- **Low-end devices** (4 or fewer CPU cores, or 3 GB or less memory) get fewer trees and a lower pixel ratio. Same look, lighter load.
- **Keyboard and screen readers:** every stop stays in the accessibility tree; tabbing to a link in a stop walks the camera there.
