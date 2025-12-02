chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === "scan_page") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(
        tabId,
        { action: "get_page_text" },
        async (text) => {
          const res = await fetch("http://localhost:3000/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
          });
          const data = await res.json();
          sendResponse(data);
        }
      );
    });
    return true;
  }
});
