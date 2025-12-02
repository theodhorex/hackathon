chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "get_page_text") {
    const text = document.body.innerText || "";
    sendResponse(text);
  }
});
