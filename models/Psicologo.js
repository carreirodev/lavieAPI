const db = require("../database");
const { DataTypes } = require("sequelize");

const Psicologo = db.define(
	"Psicologo",
	{
		psicologo_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},

		senha: {
			type: DataTypes.STRING,
			allowNull: false
		},

		apresentacao: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: "psicologo",
		timestamps: false
	}
);

module.exports = Psicologo;
