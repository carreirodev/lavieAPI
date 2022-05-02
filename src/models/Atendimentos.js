const db = require("../database");
const { DataTypes } = require("sequelize");
const Psicologos = require("./Psicologos");
const Pacientes = require("./Pacientes");

const Atendimentos = db.define(
	"atendimentos",
	{
		atendimento_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		psicologo_paciente: {
			type: DataTypes.INTEGER,
			references: {
				model: Psicologos,
				key: "psicologo_id"
			}
		},
		paciente_psicologo: {
			type: DataTypes.INTEGER,
			references: {
				model: Pacientes,
				key: "paciente_id"
			}
		},
		data_atendimento: {
			type: DataTypes.DATE,
			allowNull: false
		},
		observacao: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: "atendimentos",
		timestamps: false
	}
);

module.exports = Atendimentos;
