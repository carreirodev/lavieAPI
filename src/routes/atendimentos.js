const express = require('express')
const routes = express.Router()
const atendimentoController = require('../controllers/atendimentoController')

routes.get("/atendimentos", atendimentoController.listarAtendimentos)
routes.get("/atendimentos/:id", atendimentoController.buscarAtendimento)
routes.post("/atendimentos", atendimentoController.criarAtendimento)
module.exports = routes;