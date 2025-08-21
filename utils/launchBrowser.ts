// import puppeteer from 'puppeteer';
// // import chromium from '@sparticuz/chromium';
// import logToFile, { logType } from "@/utils/logToFile";


// export async function launchBrowser(email: string) {
//   try {
//     logToFile(`Attempting to launch browser for ${email}`, logType.error);
//       // Use environment-defined executable path or fall back to system path
//       const executablePath =  "/usr/bin/chromium-browser"       //'/usr/lib/chromium';// process.env.PUPPETEER_EXECUTABLE_PATH ||
//   logToFile('Executable path: ' + executablePath, logType.debug);
//   // for development (windows)
//   if (process.env.NODE_ENV === 'development') {
//     const browser = await puppeteer.launch({
//       ignoreDefaultArgs: ['--disable-extensions'],
//     });
//     logToFile('Browser launched successfully', logType.info);
//     return browser;
//   }
//   // for production (linux)
//   const browser = await puppeteer.launch({
//     executablePath: executablePath,
//     args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu',],
//     headless: true,
//   });

//     logToFile('Browser launched successfully', logType.error);
//     return browser;
//   } catch (error) {
//     logToFile('Browser launch error:' + error, logType.error);
//     throw error;
//   }
// }