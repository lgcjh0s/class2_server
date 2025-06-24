import * as moment from "moment";

export class Logger {

    assemble(level: 'debug' | 'info' | 'error', message: string, tag: string): string {
        const sysDt: string = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
        const log: string = level.toUpperCase() + ' :: ' + sysDt
            + (tag === ' ' ? '' : ' [' + tag + '] ') + message;
        
        return log;
    }

    debug(message: string, tag: string = ''): void {
        console.debug(this.assemble('debug', message, tag));
    }

    info(message: string, tag: string = ''): void {
        console.info(this.assemble('info', message, tag));
    }

    error(message: string, tag: string = ''): void {
        console.error(this.assemble('error', message, tag));
    }
}