(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/climate-tech-inventor/",
    "verprefix": "",
    "workerjs": "/climate-tech-inventor/worker.js",
    "monacoworkerjs": "/climate-tech-inventor/monacoworker.js",
    "gifworkerjs": "/climate-tech-inventor/gifjs/gif.worker.js",
    "serviceworkerjs": "/climate-tech-inventor/serviceworker.js",
    "typeScriptWorkerJs": "/climate-tech-inventor/tsworker.js",
    "pxtVersion": "9.3.7",
    "pxtRelId": "localDirRelId",
    "pxtCdnUrl": "/climate-tech-inventor/",
    "commitCdnUrl": "/climate-tech-inventor/",
    "blobCdnUrl": "/climate-tech-inventor/",
    "cdnUrl": "/climate-tech-inventor/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "microbit",
    "simUrl": "/climate-tech-inventor/simulator.html",
    "simserviceworkerUrl": "/climate-tech-inventor/simulatorserviceworker.js",
    "simworkerconfigUrl": "/climate-tech-inventor/workerConfig.js",
    "partsUrl": "/climate-tech-inventor/siminstructions.html",
    "runUrl": "/climate-tech-inventor/run.html",
    "docsUrl": "/climate-tech-inventor/docs.html",
    "multiUrl": "/climate-tech-inventor/multi.html",
    "asseteditorUrl": "/climate-tech-inventor/asseteditor.html",
    "skillmapUrl": "/climate-tech-inventor/skillmap.html",
    "authcodeUrl": "/climate-tech-inventor/authcode.html",
    "multiplayerUrl": "/climate-tech-inventor/multiplayer.html",
    "kioskUrl": "/climate-tech-inventor/kiosk.html",
    "isStatic": true
};

    var scripts = [
        "/climate-tech-inventor/highlight.js/highlight.pack.js",
        "/climate-tech-inventor/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/climate-tech-inventor/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/climate-tech-inventor/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/climate-tech-inventor/target.js");
    scripts.push("/climate-tech-inventor/pxtembed.js");

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
