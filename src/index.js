import app from './app.js';
import 'dotenv/config';
import loggerLog from './logs/logger.log.js';
import sequelize from "./database/database.js";
async function main() {
    const port = process.env.PORT;
    try {
        await sequelize.sync({ force: false });
        app.listen(port, () => {
            loggerLog.info('Server is running on port 3000....');
        });
    } catch (e) {
        loggerLog.error(e);
    }
}
main();