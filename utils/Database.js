import { Sequelize } from 'sequelize';

const sequelize = new Sequelize( "expdb", "hide", "the password", {
    host: "localhost",
    dialect: "mysql"

})

export default sequelize;
