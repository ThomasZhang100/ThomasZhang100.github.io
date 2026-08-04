/* Detail page: reads ?id=<slug> and renders that entry from data.js. */

(function () {
  const root = document.getElementById("entryRoot");
  const id = new URLSearchParams(window.location.search).get("id");
  const entry = ENTRIES.find((e) => e.id === id);

  document.getElementById("navResume").href = SITE.resume;
  document.getElementById("year").textContent = new Date().getFullYear();

  const footerLinks = document.getElementById("footerLinks");
  [
    { text: "Email", href: "mailto:" + SITE.email },
    { text: "GitHub", href: SITE.github },
    { text: "Resume", href: SITE.resume }
  ].forEach((l) => {
    const a = el("a", null, l.text);
    a.href = l.href;
    if (!l.href.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    footerLinks.appendChild(a);
  });

  if (!entry) {
    const head = el("section", "entry-head");
    head.appendChild(el("h1", null, "Not found"));
    head.appendChild(el("p", null, "That entry doesn’t exist (yet)."));
    const back = el("a", "back", "Back to all work");
    back.href = "index.html";
    head.appendChild(back);
    root.appendChild(head);
    return;
  }

  document.title = entry.title + " — Thomas Zhang";

  /* ------------------------------- head ------------------------------ */

  const head = el("section", "entry-head");

  const back = el("a", "back", "All work");
  back.href = "index.html#" + (entry.kind === "project" ? "projects" : "experience");
  head.appendChild(back);

  head.appendChild(
    el("p", "eyebrow", entry.kind === "project" ? "Project" : "Experience")
  );
  head.appendChild(el("h1", null, entry.title));

  const meta = el("div", "entry-meta");
  if (entry.role) {
    meta.appendChild(el("span", null, entry.role));
    meta.appendChild(el("span", "sep", "/"));
  }
  if (entry.org) {
    meta.appendChild(el("span", null, entry.org));
    meta.appendChild(el("span", "sep", "/"));
  }
  meta.appendChild(el("span", "when", entry.date));
  head.appendChild(meta);

  root.appendChild(head);

  /* ------------------------------- hero ------------------------------ */

  /* No placeholder here: if the image is missing the banner is simply
     dropped rather than leaving an empty frame. */
  if (entry.image) {
    const hero = el(
      "figure",
      entry.imageFit === "contain" ? "entry-hero is-contain" : "entry-hero"
    );
    const img = el("img");
    img.src = entry.image;
    img.alt = entry.title;
    img.addEventListener("error", () => hero.remove());
    hero.appendChild(img);
    root.appendChild(hero);
  }

  /* ------------------------------- body ------------------------------ */

  const body = el("div", "entry-body");
  const main = el("div", "entry-main");

  const lede = el("div", "entry-lede");
  (entry.overview || []).forEach((p) => lede.appendChild(el("p", null, p)));
  main.appendChild(lede);

  /* The paper follows the opening paragraphs and comes before the detail
     sections: read the summary, then the document itself, then the
     breakdown. `documentCard` is hoisted, so it can be called from here. */
  if (entry.documents && entry.documents.length) {
    const s = el("section", "entry-section entry-docs");
    /* Every label here follows the document's own `kicker`, so calling it a
       report rather than a paper is a one-word change in data.js. */
    s.appendChild(
      el(
        "h3",
        null,
        entry.documents.length > 1
          ? "Writing"
          : "The " + (entry.documents[0].kicker || "paper").toLowerCase()
      )
    );
    entry.documents.forEach((doc) => s.appendChild(documentCard(doc)));
    main.appendChild(s);
  }

  (entry.details || []).forEach((section) => {
    const s = el("section", "entry-section");
    s.appendChild(el("h3", null, section.heading));
    const ul = el("ul");
    (section.points || []).forEach((pt) => ul.appendChild(el("li", null, pt)));
    s.appendChild(ul);
    main.appendChild(s);
  });

  /* ------------------------- papers / reports ------------------------ */

  function documentCard(doc) {
    const card = el("article", "doc-card");

    if (doc.cover) {
      const coverLink = el("a", "doc-cover");
      coverLink.href = doc.href;
      coverLink.target = "_blank";
      coverLink.rel = "noopener";
      const img = el("img");
      img.src = doc.cover;
      img.alt = "First page of " + doc.title;
      img.loading = "lazy";
      img.addEventListener("error", () => coverLink.remove());
      coverLink.appendChild(img);
      card.appendChild(coverLink);
    }

    const info = el("div", "doc-info");

    const meta = el("div", "doc-meta");
    meta.appendChild(el("span", null, doc.kicker || "Paper"));
    meta.appendChild(el("span", "sep", "·"));
    meta.appendChild(el("span", null, "PDF"));
    if (doc.pages) {
      meta.appendChild(el("span", "sep", "·"));
      meta.appendChild(el("span", null, doc.pages + " pages"));
    }
    info.appendChild(meta);

    const h = el("h4", "doc-title");
    const titleLink = el("a", null, doc.title);
    titleLink.href = doc.href;
    titleLink.target = "_blank";
    titleLink.rel = "noopener";
    h.appendChild(titleLink);
    info.appendChild(h);

    if (doc.authors) info.appendChild(el("p", "doc-authors", doc.authors));
    if (doc.venue) info.appendChild(el("p", "doc-venue", doc.venue));
    if (doc.summary) info.appendChild(el("p", "doc-summary", doc.summary));

    const actions = el("div", "doc-actions");

    const open = el("a", "btn");
    open.href = doc.href;
    open.target = "_blank";
    open.rel = "noopener";
    open.appendChild(el("span", null, "Open the PDF"));
    open.appendChild(el("span", "arrow", "↗"));
    actions.appendChild(open);

    const download = el("a", "btn btn-ghost doc-download", "Download");
    download.href = doc.href;
    download.setAttribute("download", "");
    actions.appendChild(download);

    info.appendChild(actions);
    card.appendChild(info);

    /* Inline viewer, always on. It is lazily loaded, and CSS hides it on
       small screens, where browsers embed PDFs poorly — phones fall back
       to the cover image plus the open/download buttons. */
    const preview = el("div", "doc-preview");
    const frame = el("iframe");
    frame.src = doc.href + "#view=FitH";
    frame.title = doc.title;
    frame.loading = "lazy";
    preview.appendChild(frame);

    const wrap = el("div", "doc-wrap");
    wrap.appendChild(card);
    wrap.appendChild(preview);
    return wrap;
  }

  /* --------------------------- figure stack -------------------------- */

  /* One image per row, full column width, with its own block of prose
     underneath — for entries that want to walk through something in order
     rather than show a grid of thumbnails. */
  if (entry.figures && entry.figures.length) {
    const s = el("section", "entry-section entry-figures");
    /* Omit `figuresHeading` and the figures simply follow the text with no
       label above them. */
    if (entry.figuresHeading) s.appendChild(el("h3", null, entry.figuresHeading));
    entry.figures.forEach((item) => {
      const block = el("div", "fig-block");

      const cls = ["fig"];
      if (item.wide) cls.push("is-wide");
      if (item.tall) cls.push("is-tall");
      const fig = el("figure", cls.join(" "));

      if (item.video) {
        /* Muted + loop + playsinline so it behaves like a GIF, but with
           controls so a long clip can be paused or scrubbed. */
        const video = el("video");
        video.src = item.video;
        video.poster = item.poster || "";
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.controls = true;
        video.preload = "metadata";
        video.setAttribute("aria-label", item.alt || item.caption || entry.title);
        video.addEventListener("error", () => fig.remove());
        fig.appendChild(video);
      } else {
        const img = el("img");
        img.src = item.src;
        img.alt = item.alt || item.caption || entry.title;
        img.loading = "lazy";
        img.addEventListener("error", () => fig.remove());
        fig.appendChild(img);
      }

      if (item.caption) fig.appendChild(el("figcaption", null, item.caption));
      block.appendChild(fig);

      if (item.text && item.text.length) {
        const copy = el("div", "fig-text");
        item.text.forEach((p) => copy.appendChild(el("p", null, p)));
        block.appendChild(copy);
      }

      s.appendChild(block);
    });
    main.appendChild(s);
  }

  if (entry.gallery && entry.gallery.length) {
    const s = el("section", "entry-section");
    s.appendChild(el("h3", null, "Gallery"));
    const grid = el("div", "gallery");
    entry.gallery.forEach((item) => {
      const fig = el("figure");
      const img = el("img");
      img.src = item.src;
      img.alt = item.caption || entry.title;
      img.loading = "lazy";
      img.addEventListener("error", () => fig.remove());
      fig.appendChild(img);
      if (item.caption) fig.appendChild(el("figcaption", null, item.caption));
      grid.appendChild(fig);
    });
    s.appendChild(grid);
    main.appendChild(s);
  }

  body.appendChild(main);

  /* ------------------------------- side ------------------------------ */

  const side = el("aside", "entry-side");

  if (entry.tags && entry.tags.length) {
    const block = el("div", "side-block");
    block.appendChild(el("h4", null, "Tools & topics"));
    block.appendChild(tagList(entry.tags));
    side.appendChild(block);
  }

  if (entry.links && entry.links.length) {
    const block = el("div", "side-block");
    block.appendChild(el("h4", null, "Links"));
    entry.links.forEach((l) => {
      const a = el("a", "side-link", l.label);
      a.href = l.href;
      a.target = "_blank";
      a.rel = "noopener";
      block.appendChild(a);
    });
    side.appendChild(block);
  }

  if (side.childNodes.length) body.appendChild(side);
  root.appendChild(body);

  /* ---------------------------- prev / next -------------------------- */

  const idx = ENTRIES.indexOf(entry);
  const prev = ENTRIES[idx - 1];
  const next = ENTRIES[idx + 1];

  const nav = el("nav", "entry-nav");

  function navLink(target, label) {
    const a = el("a", "np");
    a.href = entryUrl(target);
    a.appendChild(el("span", null, label));
    a.appendChild(document.createTextNode(target.title));
    return a;
  }

  nav.appendChild(prev ? navLink(prev, "Previous") : el("span"));
  nav.appendChild(next ? navLink(next, "Next") : el("span"));
  root.appendChild(nav);

  /* ------------------------------ header ----------------------------- */

  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
