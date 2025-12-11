async function sha256(url) {
  try {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buf);
    return (
      "sha256:" +
      Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );
  } catch (e) {
    console.warn("Hash failed:", e);
    return null;
  }
}

async function registerImage(src) {
  const hash = await sha256(src);

  const id = `ext:${Date.now()}`;

  const payload = {
    id,
    creator_id: "ipshield-extension",
    registration_tx: {
      tx_hash: id,
      block_number: Date.now(),
      chain: "extension",
    },
    metadata: {
      name: "Image scanned",
      description: "Auto scanned via IP Shield",
    },
    media: [
      {
        media_id: id + "-m",
        url: src,
        ...(hash ? { hash } : {}),
      },
    ],
  };

  chrome.runtime.sendMessage(
    {
      action: "REGISTER_TOKEN",
      serverBase: "http://localhost:3000",
      payload,
    },
    (res) => console.log("REGISTER:", res)
  );
}

document.addEventListener("contextmenu", (e) => {
  if (e.target.tagName === "IMG") {
    registerImage(e.target.src);
  }
});
