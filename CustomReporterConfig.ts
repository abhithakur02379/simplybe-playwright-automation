import { Reporter, TestCase, TestError, TestResult, TestStep, FullResult } from "@playwright/test/reporter";
import winston from "winston";
import moment from "moment-timezone";

const console = new winston.transports.Console();
// Function to format log entries with timestamp and timezone
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Set the desired timezone
const timeZone = "Europe/Lisbon"; // For the EU
// const timeZone = 'America/New_York'; // For the US
// const timeZone = "Asia/Kolkata"; // For India
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: () => moment().tz(timeZone).format() }),
        customFormat
      ),
    level: 'info',
    // format: winston.format.json(),
    transports: [
        // - Write all logs with importance level of `info` or less than it
        new winston.transports.File({
            filename: './src/logs/info.log',
            level: 'info',
            options: { flags: 'w' },
        }),
        new winston.transports.File({
            filename: './src/logs/info.log',
            level: 'error',
            options: { flags: 'w' },
        }),
            
    ],
});

// Writes logs to console
logger.add(console);

export default class CustomReporterConfig implements Reporter {

    onTestBegin(test: TestCase): void {
        logger.info(`Test Case Started : ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        logger.info(`Test Case Completed : ${test.title} Status : ${result.status}`);
    }

    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
        if (step.category === `test.step`) {
            logger.info(`Executing Step : ${step.title}`);
        }
    }

    onError(error: TestError): void {
        logger.error(error.message);
    }

    onEnd(result: FullResult) {
        logger.info(`Finished the run: ${result.status}`);
    }


}