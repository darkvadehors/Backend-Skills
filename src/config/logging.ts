//Log request post with full date request and message

/**
 * Get time stamp
 * @returns current date to iso string
 */
const getTimeStamp = (): string => {
    return new Date().toISOString()
}


/**
 * GESTION DE CONSOLE LOG PAR TYPE DE SORTIE 
 * INFO WARN ERROR DEBUG
 */
const info = (namespace: string, message: string, object?: any) => {
    switch (true) {
        case (object):
            console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object)
            break;

        default:
            console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`)
            break;
    }
}

const warn = (namespace: string, message: string, object?: any) => {
    switch (true) {
        case (object):
            console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object)
            break;

        default:
            console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`)
            break;
    }
}

const error = (namespace: string, message: string, object?: any) => {
    switch (true) {
        case (object):
            console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object)
            break;

        default:
            console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`)
            break;
    }
}

const debug = (namespace: string, message: string, object?: any) => {
    switch (true) {
        case (object):
            console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object)
            break;

        default:
            console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`)
            break;
    }
}

export default {
    info,
    warn,
    error,
    debug
}