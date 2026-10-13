!function () {
    const downloadIcon = `
<svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"/>
</svg>`;

    // Add download button for waveform (m4a)
    function addWaveformButton(container, waveformCanvas) {
        const cover = container.querySelector("div.revision-tile-player>div.revision-tile-project-cover") ||
                      container.querySelector("div.track-page-player-cover");
        if (!cover) return;

        const m4aUrl = waveformCanvas.getAttribute("waveform-url").replace(".json", ".m4a");

        const btn = document.createElement("button");
        btn.innerHTML = downloadIcon;
        btn.className = "ndy_bandlab_btn";
        btn.style.height = "25px";
        btn.style.position = "absolute";
        btn.style.backgroundColor = "#0000005f";
        btn.style.border = "none";
        btn.style.padding = "0px";
        btn.style.top = "0%";
        btn.style.left = "77%";
        btn.style.zIndex = "1";
        btn.style.cursor = "pointer";

        btn.onclick = () => {
            window.open(m4aUrl, "_blank");
        };

        cover.insertBefore(btn, cover.firstChild);
    }

    // Add download button for video
    function addVideoButton(video) {
        if (!video.src) return;
        const parent = video.parentNode;
        if (parent.querySelector("button.ndy_bandlab_btn")) return;

        const btn = document.createElement("button");
        btn.innerHTML = downloadIcon;
        btn.className = "ndy_bandlab_btn";
        btn.style.height = "25px";
        btn.style.position = "absolute";
        btn.style.backgroundColor = "#0000005f";
        btn.style.border = "none";
        btn.style.padding = "0px";
        btn.style.top = "0%";
        btn.style.left = "95%";
        btn.style.zIndex = "1";
        btn.style.cursor = "pointer";

        btn.onclick = () => {
            const a = document.createElement("a");
            a.href = video.src;
            a.download = video.src.split("/").pop();
            a.target = "_blank";
            document.body.appendChild(a);
            a.style.display = "none";
            a.click();
            document.body.removeChild(a);
        };

        parent.insertBefore(btn, parent.firstChild);
    }

    // Scan page and inject buttons
    function scanAndInject() {
        // Waveform players
        let players = document.querySelectorAll("div.revision-tile-player");
        if (players.length === 0) {
            players = document.querySelectorAll("div.track-page-player");
        }
        players.forEach(player => {
            const canvas = player.querySelector("canvas.waveform-bars");
            if (canvas && !player.querySelector("button.ndy_bandlab_btn")) {
                addWaveformButton(player, canvas);
            }
        });

        // Video elements
        Array.from(document.querySelectorAll("video"))
            .filter(v => v.src)
            .forEach(video => {
                if (!video.parentNode.parentNode.querySelector("button.ndy_bandlab_btn")) {
                    addVideoButton(video);
                }
            });
    }

    // Start
    document.addEventListener("DOMContentLoaded", () => {
        const script = document.createElement("script");
        script.src = chrome.runtime.getURL("js/bandlab_inject.js");
        document.head.appendChild(script);

        // Scan every second for new content
        setInterval(scanAndInject, 1000);
    });
}();