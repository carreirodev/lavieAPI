const express = require ('express');
const pacienteController = require ('../controllers/pacienteController');


const routes = express.Router();



// Rotas do CRUD para pacientes
routes.get("/pacientes", pacienteController.listarPacientes);
routes.get("/pacientes/:id", pacienteController.detalhesDoPaciente)
routes.post("/pacientes", pacienteController.cadastrarPaciente);
routes.put("/pacientes", pacienteController.atualizarPaciente);
routes.delete("/pacientes", pacienteController.apagarPaciente);



module.exports = routes;