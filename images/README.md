# Images

Drop one image per entry in this folder, then point `assets/js/data.js` at it.

The filenames the site currently expects:

| Entry | File |
| --- | --- |
| Safety-Oriented GPU Ahmrchitecture | `parallel-group.jpg` |
| Microfabrication (Fu Lab) | `fu-lab.jpg` |
| India Air Pollution Platform | `hmei.jpg` |
| Pacbot | `pacbot.jpg` |
| Out-of-Order Processor | `ooo-processor.jpg` |
| 16-bit RTL Processor on FPGA | `rtl-processor.jpg` |

Paper covers (page 1 of a PDF in `docs/`) live here too:

| Paper | File |
| --- | --- |
| Measured Models | `measured-models-cover.jpg` |

Notes:

- Any missing image degrades gracefully — the card shows a clean dashed
  placeholder with the entry's initials instead of a broken image.
- Cards crop to **16:10**, so roughly 1600×1000 px works well. Anything
  wider is fine; it is center-cropped — unless the entry sets
  `imageFit: "contain"`, which fits the whole image instead.
- `.jpg`, `.png`, `.webp`, and `.svg` all work — just match the extension
  in `data.js`.
- Extra images for a detail page go in that entry's `gallery` array:
  `gallery: [{ src: "images/pacbot-board.jpg", caption: "Rev C board" }]`
- For a walkthrough — one image per row, in order, with a paragraph or two
  of your own text under each — use `figures` instead (see the root README).
  `fu-1.png` … `fu-4.png` are the Fu Lab figures, `hmei-3.png` and
  `hmei-2.png` the HMEI ones, `pacbot-1.jpg` and `pacbot-2.jpg` the Pacbot
  ones, `ooo-2/3/1/4.png` the out-of-order processor ones, and
  `punc-3.jpg`, `punc-2.jpg` the FPGA processor ones — each shown in the
  order listed in `figures`, which is not always the filename order.
- Photos straight off a phone are worth downsizing before they go in a
  figure; the `.jpg` copies here came from `sips -Z 1800 -s format jpeg
  -s formatOptions 82 photo.png --out photo.jpg`, which took two 5 MB PNGs
  down to under 500 KB each with no visible difference at page width.
- Video figures live in `/media` as MP4, with their poster frame here
  (`scraper-poster.jpg`). Source `.mov` files in this folder are gitignored;
  the root README has the `ffmpeg` recipe for making the encode.
