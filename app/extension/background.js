chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "REGISTER_TOKEN") {
    fetch(`${msg.serverBase}/api/yakoa/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg.payload),
    })
      .then((res) => res.json())
      .then((data) => sendResponse(data))
      .catch((e) => sendResponse({ error: e.message }));

    return true;
  }

  if (msg.action === "GET_TOKEN_STATUS") {
    fetch(`${msg.serverBase}/api/yakoa/token?id=${msg.id}`)
      .then((res) => res.json())
      .then((data) => sendResponse(data))
      .catch((e) => sendResponse({ error: e.message }));

    return true;
  }
});
