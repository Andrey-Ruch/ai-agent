// import chalk from "chalk";
// import { insertLog } from "@/lib/connectDB";
// //import fs from "fs";

// export enum logType {
//   critical = "critical",
//   error = "error",
//   info = "info",
//   debug = "debug",
// }

// const logToFile = (error: Error | string, tpLg: logType) => {
//   SaveToFile(error, tpLg);
// };

// export default logToFile;

// const SaveToFile = (error: Error | string, tpLg: logType) => {
//   const testMode = process.env.TEST_MODE == "true";
  
//   if (!testMode) {
//     try {
//       switch (tpLg) {
//         case logType.debug:
//           console.error(chalk.bgCyan(`${logType[tpLg]} :`, error));
//           break;
//         case logType.error:
//           console.error(chalk.bgRed(`${logType[tpLg]} :`, error));
//           if (process.env.NODE_ENV !== "development") {
//             insertLog(error + "", tpLg);
//           }
//           break;
//         case logType.critical:
//           console.error(chalk.bgRed(`${logType[tpLg]} :`, error));
//           if (process.env.NODE_ENV !== "development") {
//             insertLog(error + "", tpLg);
//           }
//           break;
//         default: // logType.info
//           console.error(chalk.bgBlue(`${logType[tpLg]} :`, error));
//           break;
//       }
//     } catch (er) {
//       console.error(chalk.bgBlue(`${logType.critical} :`, er));
//     }
//   }
// };
