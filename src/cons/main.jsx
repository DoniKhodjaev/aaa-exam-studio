import React from "react";
import { createRoot } from "react-dom/client";
import ConsApp from "./App.jsx";
import "../index.css";
createRoot(document.getElementById("root")).render(<ConsApp />);

/* Офлайн-режим и установка как приложение (iPad: Поделиться → На экран «Домой»). */
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./cons-sw.js", { scope: "./" }).catch(() => {});
  });
}
