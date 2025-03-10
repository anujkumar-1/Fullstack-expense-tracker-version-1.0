import {DataTypes} from "sequelize"
import sequelize from '../utils/Database.js';

import User from "./User.js"

const Income = sequelize.define("income", {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false

    },
    category:{
        type: DataTypes.STRING,
        allowNull: false
    }
})


User.hasMany(Income)
Income.belongsTo(User)

export default Income