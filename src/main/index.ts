import "module-alias/register";
import "dotenv/config";

import { ServerHelper } from "./server/server";

const serverHelper = new ServerHelper(3000);

(async (): Promise<void> => {
  await serverHelper.init(process.env.MONGODB_URI as string);
  serverHelper.start();
})();
