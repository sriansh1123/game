/* Cloaker: opens a blob: tab containing a fullscreen iframe pointing
   back to the real Hub. The iframe is on the real origin, so UV works. */
(function () {
  function buildShell(target) {
    return `<!doctype html>
<html><head>
<meta charset="utf-8">
<title>about:blank</title>
<link rel="icon" href="data:,">
<style>html,body,iframe{margin:0;padding:0;height:100%;width:100%;border:0;background:#000;overflow:hidden}</style>
</head><body>
<iframe src="${target}" allow="autoplay; clipboard-read; clipboard-write; fullscreen; picture-in-picture" allowfullscreen></iframe>
</body></html>`;
  }

  window.openInBlob = function (target) {
    target = target || location.href;
    const blob = new Blob([buildShell(target)], { type: "text/html" });
    const url  = URL.createObjectURL(blob);
    const win  = window.open(url, "_blank");
    if (!win) {
      alert("Popup was blocked. Allow popups for this site to use blob mode.");
      URL.revokeObjectURL(url);
      return;
    }
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };
})();