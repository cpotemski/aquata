import { Injectable, LoggerService } from '@nestjs/common';
import { LogEvent } from './log-event';
import { LogLevels } from './log-levels';

@Injectable()
export class MyLoggerService implements LoggerService {
  events: LogEvent[] = [];
  private readonly logLevel: LogLevels;

  constructor() {
    this.logLevel = Object.keys(LogLevels).indexOf(process.env.LOG_LEVEL) - Object.keys(LogLevels).length / 2;
    console.log('logLevel', this.logLevel);
  }

  output(prefix: string, message: string, data: any) {
    if(data) {
      console.log(`${prefix} - ${message}`, JSON.stringify(data, null, ' ' ));
    } else {
      console.log(`${prefix} - ${message}`);
    }
  }

  debug(message: any, ...rest): any {
    if (this.logLevel >= LogLevels.debug) {
      this.output('DEBUG', message, rest);
    }
  }

  error(message: any, ...rest): any {
    if (this.logLevel >= LogLevels.error) {
      this.output('ERROR', message, rest);
    }
  }

  log(message: any, ...rest): any {
    if (this.logLevel >= LogLevels.log) {
      this.output('LOG', message, rest);
    }
  }

  verbose(message: any, ...rest): any {
    if (this.logLevel >= LogLevels.verbose) {
      this.output('VERBOSE', message, rest);
    }
  }

  warn(message: any, ...rest): any {
    if (this.logLevel >= LogLevels.warn) {
      this.output('WARN', message, rest);
    }
  }

  time(name: string, group: string = 'default') {
    if (this.logLevel >= LogLevels.debug) {
      this.events.push({
        name,
        timestamp: (new Date()).getTime(),
        group
      });
    }
  }

  byTimestamp(a, b) {
    return a.timestamp > b.timestamp ? 1 : (a.timestamp < b.timestamp ? -1 : 0);
  }

  timeEnd(group: string = 'default') {
    if (this.logLevel >= LogLevels.log) {
      const groupEvents = this.events
        .filter(event => event.group === group)
        .sort(this.byTimestamp);

      if (groupEvents && groupEvents.length > 0) {
        const startTime = groupEvents[0].timestamp;
        const endTime = (new Date()).getTime();
        console.log(`\nTimeline [${group}] - Start: ${startTime} - End: ${endTime} - Duration: ${endTime - startTime}ms`);
        groupEvents.forEach((event, index) => {
          const time = event.timestamp;
          const nextTime = index + 1 >= groupEvents.length ? endTime : groupEvents[index + 1].timestamp;
          const duration = nextTime - time;

          if (index !== 0) {
            console.log(`|`);
          }
          console.log(`|-- ${time - startTime} -- ${duration}ms -- ${event.name}`);
        });

        this.events = this.events.filter(event => event.group !== group);
      }
    }
  }
}
