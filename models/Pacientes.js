const db = require("../database");
const { DataTypes } = require("sequelize");

const Paciente = db.define(
	"Paciente",
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
		}
	},
	{
		tableName: "paciente",
		timestamps: false
	}
);

module.exports = Paciente;
