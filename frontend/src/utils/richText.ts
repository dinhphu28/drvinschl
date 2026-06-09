export const sanitizeRichText = (html: string) => {
  if (typeof window === "undefined" || !html) {
    return html || "";
  }

  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script, style, iframe, object, embed").forEach((el) => el.remove());
  doc.body.querySelectorAll("*").forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();
      const unsafeUrl = (name === "href" || name === "src") && value.startsWith("javascript:");
      if (name.startsWith("on") || unsafeUrl) {
        el.removeAttribute(attr.name);
      }
    });
  });
  return doc.body.innerHTML;
};
