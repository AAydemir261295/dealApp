const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize("deals", "qkpostgres", "567607", {
    host: "localhost",
    dialect: "postgres"
})

// class Deals extends Model { }

const Deals = sequelize.define("deals",
    {
        deal_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            autoIncrementIdentity: true
            // allowNull: true,
        },
        deal_timestamp: {
            type: DataTypes.BIGINT,
        },
        deal_theme: {
            type: DataTypes.STRING()
        },
        deal_text: { type: DataTypes.STRING(512) },
        deal_status: { type: DataTypes.STRING(64) },
        deal_solution_text: { type: DataTypes.STRING(512) },
        deal_result: { type: DataTypes.STRING(512) }

    },
    {
        createdAt: false,
        updatedAt: false,
    }
)

Deals.removeAttribute('id')


// module.exports = sequelize;
module.exports = { sequelize, Deals };