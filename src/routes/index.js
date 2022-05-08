const express = require("express");
const pacienteController = require("../controllers/pacienteController");
const atendimentoController = require("../controllers/atendimentoController");
const psicologoController = require("../controllers/psicologoController");
const authController = require("../controllers/authController");
const dashboardController = require("../controllers/dashboardController");
const authLoginValidation = require("../validator/auth/login");
const auth = require("../middleware/auth");
const psicologoCreateValidation = require("../validator/psicologos/create");
const psicologoUpdateValidation = require("../validator/psicologos/update");
const psicologoSelectIDValidation = require("../validator/psicologos/selectID");
const atendimentoCreateValidation = require("../validator/atendimentos/create");
const pacienteCreateValidation = require("../validator/pacientes/create");

const routes = express.Router();

// Rotas do CRUD para pacientes
routes.get("/pacientes", auth, pacienteController.listarPacientes);
routes.get("/pacientes/:id", auth, pacienteController.detalhesDoPaciente);
routes.post("/pacientes", auth, pacienteCreateValidation, pacienteController.cadastrarPaciente);
routes.put("/pacientes/:id", auth, pacienteController.atualizarPaciente);
routes.delete("/pacientes/:id", auth, pacienteController.apagarPaciente);

routes.get("/atendimentos", atendimentoController.listarAtendimentos);
routes.get(
	"/atendimentos/:id",
	psicologoSelectIDValidation,
	auth,
	atendimentoController.buscarAtendimento
);
routes.post(
	"/atendimentos",
	auth,
	atendimentoCreateValidation,
	atendimentoController.criarAtendimento
);

routes.get("/psicologos", auth, psicologoController.listarPsicologos);
routes.get(
	"/psicologos/:id",
	psicologoSelectIDValidation,
	auth,
	psicologoController.detalhesDoPsicologo
);
routes.post("/psicologos", psicologoCreateValidation, psicologoController.registrarPsicologo);
routes.post("/login", authLoginValidation, authController.login);
routes.put(
	"/psicologos/:id",
	psicologoUpdateValidation,
	auth,
	psicologoController.atualizarPsicologo
);
routes.delete(
	"/psicologos/:id",
	psicologoSelectIDValidation,
	auth,
	psicologoController.deletarPsicologo
);

routes.get("/dashboard/numero-paciente", auth, dashboardController.pacientesTotal);
routes.get("/dashboard/numero-atendimento", auth, dashboardController.atendimentosTotal);
routes.get("/dashboard/numero-psicologo", auth, dashboardController.psicologosTotal);
routes.get("/dashboard/media-atendimento", auth, dashboardController.mediaAtendimentos);

module.exports = routes;
