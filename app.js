const api = require("./app/main");
const kafka = require("./app/kafka")

process.on("uncaughtException", cleanup);
process.on("SIGINT", cleanup);
process.on("SIGUSR1", cleanup);
process.on("SIGUSR2", cleanup);

(async () => {
    try {
        await api.init();
        await kafka.init();
    } catch (err) {
        console.log("Ошибка при инициализации сервиса: " + (err.stack || err));
        cleanup();
    }
})();

function cleanup() {
    kafka.close()
    setTimeout(function () {
        console.log("exiting...");
        process.exit(1);
    }, 3000);
}