/* Small shared helpers used by both the index and the entry pages. */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function initials(str) {
  return (str || "")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/* Image box that degrades to a labelled placeholder when the file
   is missing or has not been added to /images yet. */
function makeThumb(entry, className) {
  const box = el("div", className);
  box.setAttribute("data-initials", initials(entry.title));
  /* `imageFit: "contain"` fits the whole image inside the frame instead of
     cropping it to fill — for diagrams, where the edges carry meaning. */
  if (entry.imageFit === "contain") box.classList.add("is-contain");

  if (!entry.image) {
    box.classList.add("is-empty");
    return box;
  }

  const img = el("img");
  img.src = entry.image;
  img.alt = entry.title;
  img.loading = "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => {
    img.remove();
    box.classList.add("is-empty");
  });
  box.appendChild(img);
  return box;
}

function tagList(tags) {
  const wrap = el("div", "tags");
  (tags || []).forEach((t) => wrap.appendChild(el("span", "tag", t)));
  return wrap;
}

function entryUrl(entry) {
  return "entry.html?id=" + encodeURIComponent(entry.id);
}
