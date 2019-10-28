import http from "http";
import settings from "./config/Settings";
import app from "./app";
import logger from "./helpers/Logger";

const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(settings.apiListenPort);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof settings.apiListenPort === "string"
      ? "Pipe " + settings.apiListenPort
      : "Port " + settings.apiListenPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        logger.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        logger.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr.port;
    logger.log("Listening on " + bind);

    logger.log(`API document(swagger): ${settings.adminBaseUrl}/api-docs`);
    logger.log(`Technical Document: ${settings.adminBaseUrl}${settings.techDocConfig.endPoint}`);
    logger.log(`Test Report: ${settings.adminBaseUrl}${settings.testReportConfig.endPoint}`);
}
