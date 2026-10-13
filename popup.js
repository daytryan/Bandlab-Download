(() => {
    function init() {
        const version = chrome.runtime.getManifest().version;
        document.querySelector(".version").textContent += version;
    }

    document.addEventListener("DOMContentLoaded", () => {
        init();

        // Optional: Remove subscribe button entirely
        const subscribeBtn = document.getElementById("subscribe");
        if (subscribeBtn) {
            subscribeBtn.remove();
        }

        // Optional: Show "Unlimited" message
        const status = document.createElement("p");
        status.textContent = "Unlimited downloads enabled.";
        status.style.color = "green";
        status.style.fontWeight = "bold";
        document.body.appendChild(status);
    });
})();