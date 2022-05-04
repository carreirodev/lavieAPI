const db = require("../database");
const { DataTypes } = require("sequelize");

const Pacientes = db.define(
	"Pacientes",
	{
		paciente_id: {
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
		idade: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		tableName: "pacientes",
		timestamps: false
	}
);

module.exports = Pacientes;
