# ThomasZhang100.github.io

Personal site — static HTML/CSS/JS, no build step, no dependencies.

```
index.html            front page: hero + scrolling feed of experiences & projects
entry.html            detail page, rendered from ?id=<slug>
assets/js/data.js     ← all content lives here (the only file you normally edit)
assets/js/common.js   shared helpers
assets/js/main.js     front page rendering
assets/js/entry.js    detail page rendering
assets/css/style.css  styles
images/               one image per entry (see images/README.md)
media/                web-ready video encodes used by figures
docs/                 papers and reports linked from entries
TZ_resume_c.pdf       resume linked from the header and footer
```

## Adding or editing an entry

Everything on the site comes from the `SITE` and `ENTRIES` objects in
`assets/js/data.js`. Copy an existing entry, change the `id` (it becomes the
URL, `entry.html?id=your-slug`), and set `kind` to `"experience"` or
`"project"`. Order in the array is the order on the page.

Drop the matching image in `images/` and set `image: "images/your-file.jpg"`.
If the file isn't there yet, the card falls back to a placeholder instead of
breaking.

Card thumbnails and detail-page banners crop to fill by default, which suits
photos. For a diagram, where cropping the edges loses information, add
`imageFit: "contain"` to the entry — the card letterboxes the whole image
inside its 16:10 frame and the banner drops its height cap and shows the
image whole. The out-of-order processor entry uses this.

## Walking through a set of figures

For an entry that should read top-to-bottom — image, then your commentary,
then the next image — add a `figures` array (the Fu Lab entry uses this):

```js
figuresHeading: "In the lab",     // optional, defaults to "Figures"
figures: [
  {
    src: "images/fu-1.png",
    alt: "…",                     // optional, falls back to the caption
    caption: "One line under the image.",     // optional
    text: ["A paragraph.", "Another paragraph."],  // optional
    wide: true,                   // optional, see below
    tall: true                    // optional, see below
  }
]
```

Figures render in array order at the width of the text column, capped at
520px tall so portraits and wide diagrams carry similar weight. Two escapes
from that default, for images the cap makes unreadable:

- `wide: true` spills the figure across the sidebar gutter on desktop, for
  something dense and horizontal like a waveform or a spreadsheet. It
  collapses back to the column on narrow screens.
- `tall: true` raises the height cap to 880px, for a page-shaped diagram —
  a full schematic, say — that turns into a postage stamp at 520px.

Use `gallery` instead when you just want a grid of thumbnails.

A figure can be a video instead of an image — swap `src` for `video` (plus an
optional `poster` still). It autoplays muted on loop, like a GIF, but keeps
controls so a long clip can be paused:

```js
{ video: "media/scraper.mp4", poster: "images/scraper-poster.jpg", wide: true }
```

To make one from a screen recording — H.264 in an MP4 is a fraction of the size
of a GIF and far sharper. `setpts=0.5*PTS` plays it at 2×; drop that filter to
keep real time:

```sh
ffmpeg -i images/MyRecording.mov -an \
  -vf "setpts=0.5*PTS,fps=30,scale=1100:-2" \
  -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart \
  media/my-clip.mp4
ffmpeg -ss 45 -i images/MyRecording.mov -frames:v 1 -vf scale=1100:-2 -q:v 4 \
  images/my-clip-poster.jpg
```

Source `.mov` files are gitignored — commit the encode in `media/`, not the
36 MB original.

## Attaching a paper or report

Put the PDF in `docs/`, then add a `documents` array to the entry:

```js
documents: [
  {
    kicker: "Paper",            // or "Report", "Thesis", ...
    title: "…",
    authors: "…",
    venue: "…",
    summary: "…",               // optional, 2–3 lines
    href: "docs/my-paper.pdf",
    cover: "images/my-paper-cover.jpg",   // optional
    pages: 11                   // optional
  }
]
```

That renders a full-width card with **Open the PDF** and **Download** above an
always-on inline viewer (hidden on phones, where embedded PDFs misbehave — they
get the cover image instead), plus a sidebar link and a "Paper included" flag on
the front-page card.

To make the cover from page 1 of the PDF:

```sh
qlmanage -t -s 1400 -o /tmp docs/my-paper.pdf
sips -Z 760 -s format jpeg -s formatOptions 80 /tmp/my-paper.pdf.png \
  --out images/my-paper-cover.jpg
```

## Previewing locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publishing

Push to `main`. GitHub Pages serves the repo root at
<https://ThomasZhang100.github.io>.
