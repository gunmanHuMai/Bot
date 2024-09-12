import { EventEmitter } from 'events';

export class Logger extends EventEmitter {
    public logs: string[] = [];
    public format: string;
    private formatTokens: string[];

    constructor(format: string = 'yyyy/mm/dd HH:MM:ss.l') {
        super();
        this.format = format;
        this.formatTokens = this.parseFormatTokens();
        this.setListener();
    }

    public getFormatTime(): string {
        const now = new Date();
        const timeValues: { [token: string]: string } = {
            'yyyy': String(now.getFullYear()),
            'mm': String(now.getMonth() + 1).padStart(2, '0'),
            'dd': String(now.getDate()).padStart(2, '0'),
            'HH': String(now.getHours()).padStart(2, '0'),
            'hh': String(now.getHours() % 12 || 12).padStart(2, '0'),
            'MM': String(now.getMinutes()).padStart(2, '0'),
            'ss': String(now.getSeconds()).padStart(2, '0'),
            'l': String(now.getMilliseconds()).padStart(3, '0'),
        };

        const formattedTime = this.formatTokens.reduce(
            (result, token) => result.replace(token, timeValues[token]),
            this.format
        );

        if (this.formatTokens.includes('hh')) {
            const period = Number(timeValues['HH']) < 12 ? 'AM' : 'PM';
            return `${formattedTime} ${period}`;
        }

        return `[${formattedTime}]`;
    }

    public parseFormatTokens(): string[] {
        const timeTokenRegex = /(yyyy|mm|dd|HH|hh|MM|ss|l)/g;
        const matches = this.format.match(timeTokenRegex);
        return matches ? matches : [];
    }

    private addLog(message: string): void {
        this.logs.push(message);
    }

    private setListener() {
        this.on('api', (message: string) => {
            const msg = `${this.getFormatTime()} [api] ${message}`;
            this.addLog(msg);
            console.log(msg);
        });

        this.on('error', (message: string) => {
            const msg = `${this.getFormatTime()} [error] ${message}`;
            this.addLog(msg);
            console.log(msg);
        });

        this.on('lavashark', (message: string) => {
            const msg = `${this.getFormatTime()} [lavashark] ${message}`;
            this.addLog(msg);
            console.log(msg);
        });

        this.on('localNode', (message: string) => {
            const msg = `${this.getFormatTime()} [localNode] ${message}`;
            this.addLog(msg);
            console.log(msg);
        });

        this.on('log', (message: string) => {
            const msg = `${this.getFormatTime()} ${message}`;
            this.addLog(msg);
            console.log(msg);
        });

        this.on('discord', (message: string) => {
            const msg = `${this.getFormatTime()} [discord] ${message}`;
            this.addLog(msg);
            console.log(msg);
        });
    }
}
