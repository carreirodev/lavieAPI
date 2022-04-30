const Atendimentos = require("./Atendimentos");
const Pacientes = require("./Pacientes");
const Psicologos = require("./Psicologos");

Pacientes.belongsToMany(Psicologos, {
	foreignKey: "paciente_psicologo",
	through: Atendimentos
});

Psicologos.belongsToMany(Pacientes, {
	foreignKey: "psicologo_paciente",
	through: Atendimentos
});

module.exports = {
	Pacientes,
	Psicologos
};
