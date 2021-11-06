window.addEventListener("load", () => {

    if ("cordova" in window) {
    } else {

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("sw.js", { scope: "./" })
                .then(function (reg) { });
        }
        var OneSignal = window.OneSignal || [];
        var initConfig = {
            appId: "0e7468fd-cf9c-4079-8af1-99e3fc4069de",
            notifyButton: {
                enable: true,
            },
        };
        OneSignal.push(function () {
            OneSignal.SERVICE_WORKER_PARAM = { scope: "push/onesignal/" };
            OneSignal.SERVICE_WORKER_PATH =
                "push/onesignal/OneSignalSDKWorker.js";
            OneSignal.SERVICE_WORKER_UPDATER_PATH =
                "push/onesignal/OneSignalSDKUpdaterWorker.js";
            OneSignal.init(initConfig);
        });
    }
});