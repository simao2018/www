function onBatteryStatus(status) {
  console.log("Battery Level Low " + status.level + "%");
}

const openInAppBrowserOptions = "location=yes,zoom=false";

const openInAppBrowser = (link) => {
  cordova.InAppBrowser.open(link, "_blank", openInAppBrowserOptions);
};

const toogleModalOffline = (show) => {
  const modal = document.getElementById("modal-unconnect");
  modal.className = show ? "show" : "";
};

const deviceReady = () => {
  window.screen.orientation.lock("landscape");
  window.addEventListener("batterystatus", onBatteryStatus, false);
  document.addEventListener("offline", () => toogleModalOffline(true), false);
  document.addEventListener("online", () => toogleModalOffline(false), false);
};
