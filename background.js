// No background logic needed for unlimited version
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // Ignore all payment-related messages
    if (msg.target === "BACKGROUND" && msg.type === "OPEN PAYMENT PAGE") {
        return;
    }
    sendResponse({});
});