type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  message: string;
  level: LogLevel;
  context?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export class Logger {
  private static format(level: LogLevel, message: string, context?: string, metadata?: any): LogPayload {
    return {
      message,
      level,
      context,
      metadata,
      timestamp: new Date().toISOString(),
    };
  }

  static info(message: string, context?: string, metadata?: any) {
    const log = this.format("info", message, context, metadata);
    console.log(JSON.stringify(log));
  }

  static warn(message: string, context?: string, metadata?: any) {
    const log = this.format("warn", message, context, metadata);
    console.warn(JSON.stringify(log));
  }

  static error(message: string, context?: string, metadata?: any) {
    const log = this.format("error", message, context, metadata);
    console.error(JSON.stringify(log));
    
    // Sentry integration placeholder
    // Sentry.captureException(new Error(message), { extra: metadata });
  }

  static debug(message: string, context?: string, metadata?: any) {
    if (process.env.NODE_ENV === "development") {
      const log = this.format("debug", message, context, metadata);
      console.debug(JSON.stringify(log));
    }
  }
}
