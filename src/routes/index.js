const express = require ('express');
const pacienteController = require ('../controllers/pacienteController');
const atendimentoController = require('../controllers/atendimentoController');
const psicologoController = require('../controllers/psicologoController');


const routes = express.Router();



// Rotas do CRUD para pacientes
routes.get("/pacientes", pacienteController.listarPacientes);
routes.get("/pacientes/:id", pacienteController.detalhesDoPaciente);
routes.post("/pacientes", pacienteController.cadastrarPaciente);
routes.put("/pacientes", pacienteController.atualizarPaciente);
routes.delete("/pacientes", pacienteController.apagarPaciente);

routes.get("/atendimentos", atendimentoController.listarAtendimentos);
routes.get("/atendimentos/:id", atendimentoController.buscarAtendimento);
routes.post("/atendimentos", atendimentoController.criarAtendimento);

routes.get("/psicologos", psicologoController.listarPsicologos);
routes.get("/psicologos/:id", psicologoController.detalhesDoPsicologo);
routes.post("/psicologos", psicologoController.registrarPsicologo);
routes.put("/psicologos/:id", psicologoController.atualizarPsicologo);
routes.delete("/psicologos/:id", psicologoController.deletarPsicologo);

module.exports = routes;