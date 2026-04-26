window.addEventListener("load", async () => {
  if (location.protocol === "blob:") return;
  if (window.top !== window.self) return;
  if (localStorage.getItem("blobMode") !== "on") return;

  try {
    if ("serviceWorker" in navigator && typeof __uv$config !== "undefined") {
      await Promise.race([
        navigator.serviceWorker
          .register("/uv/sw.js", { scope: __uv$config.prefix })
          .then(() => navigator.serviceWorker.ready),
        new Promise(r => setTimeout(r, 2000))
      ]);
    }
  } catch (e) {
    console.error("SW pre-register failed:", e);
  }

  blobThis();
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