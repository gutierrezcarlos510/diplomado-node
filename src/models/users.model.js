import sequelize from "../database/database.js";
import {DataTypes} from "sequelize";
import {Status} from "../constants/index.constants.js";
import {Task} from "./tasks.model.js";
import { encriptar } from "../common/bcrypt.js";
import loggerLog from "../logs/logger.log.js";

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull:{
                msg: 'Username is required'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password cannot be null'
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: "El status debe ser 'active' o 'inactive'"
            }
        }
    }
});
User.hasMany(Task);
Task.belongsTo(User);

User.beforeCreate(async(user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        loggerLog.error(error);
        throw new Error('Error al encriptar');
    }
})
User.beforeUpdate(async(user) => {
    try {
        if(user.password){
            user.password = await encriptar(user.password);
        }
    } catch (error) {
        loggerLog.error(error);
        throw new Error('Error al encriptar');
    }
})
