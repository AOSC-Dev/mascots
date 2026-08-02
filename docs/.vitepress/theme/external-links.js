export function openExternalLinksInBrowser() {
  if (typeof window === "undefined" || !window.document) return;

  document.addEventListener("click", (event) => {
    if (!window.Neutralino) return;
    if (!(event.target instanceof Element)) return;

    const anchor = event.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href) return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    const isExternalHttp =
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname !== "localhost" &&
      url.hostname !== "127.0.0.1";

    if (isExternalHttp || url.protocol === "mailto:") {
      event.preventDefault();
      event.stopPropagation();
      window.Neutralino.os.open(href);
    }
  });
}
