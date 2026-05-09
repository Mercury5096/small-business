(function () {
    var pageConfig = {
        "game.html": { width: 1920 },
        "game0.html": { width: 1920 },
        "game1.html": { width: 1920 }
    };

    var pageName = window.location.pathname.split("/").pop() || "index.html";
    var config = pageConfig[pageName] || { width: 1440 };
    var baseWidth = config.width;
    var body = document.body;
    var doc = document.documentElement;

    if (!body || body.getAttribute("data-responsive-stage") === "ready") return;
    body.setAttribute("data-responsive-stage", "ready");

    var style = document.createElement("style");
    style.textContent = [
        "html { margin: 0; overflow-x: hidden; }",
        "html { background: #b8d8d0; }",
        "body[data-responsive-stage='ready'] {",
        "  width: " + baseWidth + "px;",
        "  min-width: " + baseWidth + "px;",
        "  max-width: none;",
        "  transform-origin: top left;",
        "  margin: 0;",
        "}"
    ].join("\n");
    document.head.appendChild(style);

    function contentHeight() {
        var previousTransform = body.style.transform;
        body.style.transform = "none";
        var height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            doc.scrollHeight,
            doc.offsetHeight,
            window.innerHeight
        );
        body.style.transform = previousTransform;
        return height;
    }

    function applyScale() {
        var scale = window.innerWidth / baseWidth;
        var height = contentHeight();

        body.style.zoom = "";
        body.style.transform = "";

        if ("zoom" in body.style) {
            body.style.zoom = scale;
            doc.style.minHeight = height * scale + "px";
            body.style.minHeight = height + "px";
        } else {
            body.style.transform = "scale(" + scale + ")";
            doc.style.minHeight = height * scale + "px";
            body.style.minHeight = height + "px";
        }
    }

    window.addEventListener("resize", applyScale);
    window.addEventListener("orientationchange", applyScale);
    window.addEventListener("load", applyScale);
    applyScale();
})();
