/* Front page: hero, scrolling card feed, about, footer. */

(function () {
  /* ------------------------------ hero ------------------------------ */

  document.getElementById("heroName").textContent = SITE.name;
  document.getElementById("heroTagline").textContent = SITE.tagline;
  document.getElementById("navResume").href = SITE.resume;

  const contacts = [
    { label: "Email", href: "mailto:" + SITE.email, text: SITE.email },
    { label: "GitHub", href: SITE.github, text: "github.com/ThomasZhang100" },
    { label: "Resume", href: SITE.resume, text: "Resume (PDF)" }
  ];

  const heroMeta = document.getElementById("heroMeta");
  heroMeta.appendChild(el("span", "pill", SITE.location));
  contacts.forEach((c) => {
    const a = el("a", "pill");
    a.href = c.href;
    if (!c.href.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    a.appendChild(el("span", null, c.text));
    a.appendChild(el("span", "arrow", "↗"));
    heroMeta.appendChild(a);
  });

  /* ------------------------------ cards ----------------------------- */

  function card(entry) {
    const a = el("a", "card reveal");
    a.href = entryUrl(entry);

    a.appendChild(makeThumb(entry, "thumb"));

    const body = el("div", "card-body");

    const top = el("div", "card-top");
    top.appendChild(el("h3", null, entry.title));
    top.appendChild(el("span", "date", entry.date));
    body.appendChild(top);

    const org = el("div", "org");
    if (entry.role) {
      org.appendChild(el("span", "role", entry.role));
      org.appendChild(document.createTextNode(" · "));
    }
    org.appendChild(document.createTextNode(entry.org || ""));
    body.appendChild(org);

    body.appendChild(el("p", "blurb", entry.blurb));
    body.appendChild(tagList(entry.tags));

    const foot = el("div", "card-foot");
    foot.appendChild(el("span", "more", "Read more"));
    body.appendChild(foot);

    a.appendChild(body);
    return a;
  }

  function renderSection(kind, listId) {
    const list = document.getElementById(listId);
    ENTRIES.filter((e) => e.kind === kind).forEach((entry) =>
      list.appendChild(card(entry))
    );
  }

  renderSection("experience", "cardsExperience");
  renderSection("project", "cardsProjects");

  /* ------------------------------ about ----------------------------- */

  const side = document.getElementById("aboutSide");
  [
    { label: "Based in", val: SITE.location },
    { label: "Email", val: SITE.email, href: "mailto:" + SITE.email },
    { label: "GitHub", val: "ThomasZhang100", href: SITE.github }
  ].forEach((row) => {
    side.appendChild(el("div", "label", row.label));
    const v = el("div", "val");
    if (row.href) {
      const a = el("a", null, row.val);
      a.href = row.href;
      a.style.borderBottom = "1px solid var(--rule-strong)";
      v.appendChild(a);
    } else {
      v.textContent = row.val;
    }
    side.appendChild(v);
  });

  const aboutMain = document.getElementById("aboutMain");
  SITE.about.forEach((para) => aboutMain.appendChild(el("p", null, para)));
  SITE.skills.forEach((block) => {
    const b = el("div", "skill-block");
    b.appendChild(el("h4", null, block.heading));
    b.appendChild(el("p", null, block.items));
    aboutMain.appendChild(b);
  });

  /* ------------------------------ footer ---------------------------- */

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

  /* --------------------- scroll reveal + header --------------------- */

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealables = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach((n) => n.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach((n) => io.observe(n));
  }

  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
