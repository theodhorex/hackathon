const serverBase = document.getElementById("serverBase");
const imageUrl = document.getElementById("imageUrl");
const output = document.getElementById("output");

document.getElementById("scanBtn").onclick = async () => {
  const id = `popup:${Date.now()}`;

  const payload = {
    id,
    creator_id: "popup-scan",
    registration_tx: {
      tx_hash: id,
      block_number: Date.now(),
      chain: "popup",
    },
    metadata: {
      name: "Popup Scan",
    },
    media: [
      {
        media_id: id + "-m",
        url: imageUrl.value,
      },
    ],
  };

  chrome.runtime.sendMessage(
    {
      action: "REGISTER_TOKEN",
      serverBase: serverBase.value,
      payload,
    },
    (res) => {
      output.innerText = JSON.stringify(res, null, 2);
    }
  );
};

document.getElementById("pollBtn").onclick = () => {
  const id = prompt("Token ID:");
  chrome.runtime.sendMessage(
    {
      action: "GET_TOKEN_STATUS",
      serverBase: serverBase.value,
      id,
    },
    (res) => {
      output.innerText = JSON.stringify(res, null, 2);
    }
  );
};
