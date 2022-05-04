const Atendimentos = require("./Atendimentos");
const Pacientes = require("./Pacientes");
const Psicologos = require("./Psicologos");

Psicologos.hasMany(Atendimentos, {
    foreignKey: 'psicologo_paciente'
  });
Atendimentos.belongsTo(Psicologos, {
    foreignKey: 'psicologo_paciente'
  });

Pacientes.hasMany(Atendimentos, {
    foreignKey: 'paciente_psicologo'
  });
Atendimentos.belongsTo(Pacientes, {
    foreignKey: 'paciente_psicologo'
  });

module.exports = {
	Pacientes,
	Psicologos,
	Atendimentos
};
