// @ts-nocheck
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

const Component = () => {
  const ipcRenderer = (window as any).ipcRenderer;
  const [readerConnected, setReaderConnected] = useState(false);

  const [placeData, setPlaceData] = useState({
    displayData: false,
    isConnected: false,
    macAddress: "",
    hasTriedToConnect: false,
  });

  ipcRenderer.on("reader-connected", () => {
    console.log("Reader connected");
    setReaderConnected(true);
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>GS Tickets</h1>
      {readerConnected && (
        <div>
          <h4>Четецът е свързан</h4>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          className="button-33"
          onClick={() => {
            ipcRenderer.send("reconnect-socket");
          }}
        >
          Свържи четец
        </button>
        <button
          className="button-33"
          onClick={() => {
            ipcRenderer.send("disconnect-socket");
          }}
        >
          Прекрати връзката
        </button>
      </div>

      {placeData.displayData ? (
        placeData.isConnected ? (
          <h2>Обектът е свързан</h2>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Обектът не е регистриран</h2>
            <p>{placeData.macAddress}</p>
          </div>
        )
      ) : null}

      {!placeData.isConnected && (
        <button
          className="button-33"
          onClick={() => {
            ipcRenderer.send("connect-place");
          }}
        >
          {placeData.hasTriedToConnect
            ? "Опитай ново свързване"
            : "Свържи обект"}
        </button>
      )}
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);
