import bcrypt from 'bcrypt';
import loggerLog from "../logs/logger.log.js";
import 'dotenv/config'

export const encriptar = async (text) => {
    try {
        const saltRound = +process.env.BCRYPT_SALT;
        return await bcrypt.hash(text, saltRound);
    } catch (error) {
        loggerLog.error(error);
        throw new Error('Error al encriptar')
    }
}
export const comparar = async (text, hash) => {
    try {
        return await bcrypt.compare(text, hash);
    } catch (error) {
        loggerLog.error(error);
        throw new Error('Error al comparar')
    }
}