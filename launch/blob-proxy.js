window.addEventListener("load", () => {
  if (location.protocol === "blob:") return;
  if (window.top !== window.self) return;
  if (localStorage.getItem("blobMode") === "on") {
    blobThis();
  }
});

async function blobThis() {
  try {
    const r = await fetch(location.href, { credentials: "include" });
    let html = await r.text();
    html = html.replace(/<head[^>]*>/i,
      m => m + '<base href="' + location.origin + '/">');
    const blob = new Blob([html], { type: "text/html" });
    window.location.replace(URL.createObjectURL(blob));
  } catch (e) {
    alert("Blob error: " + e.message);
  }
}