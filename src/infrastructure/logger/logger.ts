export class Logger {
  static info(message: string, context?: string, metadata?: any) {
    console.log(JSON.stringify({ level: "info", message, context, metadata, timestamp: new Date().toISOString() }));
  }

  static error(message: string, context?: string, metadata?: any) {
    console.error(JSON.stringify({ level: "error", message, context, metadata, timestamp: new Date().toISOString() }));
  }
}
