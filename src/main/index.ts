import "module-alias/register";
import "dotenv/config";

import { ServerHelper } from "@/main/server/server";

const serverHelper = new ServerHelper(3000);

(async (): Promise<void> => {
  try {
    await serverHelper.init(process.env.MONGODB_URI as string);
    serverHelper.start();

    const exitSignals: Array<NodeJS.Signals> = ["SIGINT", "SIGTERM", "SIGQUIT"];

    for (const signal of exitSignals) {
      process.on(signal, async () => {
        try {
          console.info("Closing Express HTTP Server...");
          console.info("Closing MongoDB Database connection...");
          serverHelper.shutdown().then(() => {
            console.info("Express HTTP Server closed.");
            console.info("MongoDB Database connection closed.");
            process.exit(0);
          });
        } catch (error) {
          console.error(`App exited with error: ${error}`);
          process.exit(1);
        }
      });
    }
  } catch (error) {
    console.error(`App exited with error: ${error}`);
    process.exit(1);
  }
})();
