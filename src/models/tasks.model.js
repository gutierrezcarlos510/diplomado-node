import sequelize from "../database/database.js";
import {DataTypes} from "sequelize";

export const Task = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Nombre es requerido'
            }
        }
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false}
});