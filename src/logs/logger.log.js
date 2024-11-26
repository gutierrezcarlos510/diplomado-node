import pino from 'pino'

const loggerLog = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'SYS:yyyy-MM-dd HH:mm:ss',
        }
    }
})
export default loggerLog;