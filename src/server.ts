import http from "http";
import settings from "./config/Settings";
import app from "./app";

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
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
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
    console.log("Listening on " + bind);

    const serverAddress: any = server.address();
    console.log(`API document(swagger): http://localhost:${serverAddress.port}/api-docs`);
    console.log(`Technical Document: http://localhost:${serverAddress.port}${settings.techDocConfig.endPoint}`);
    console.log(`Test Report: http://localhost:${serverAddress.port}${settings.testReportConfig.endPoint}`);
}
