const Pacientes = require("../models/Pacientes");

const pacienteController = {
    async listarPacientes(req, res) {
        try {
            const lista = await Pacientes.findAll();
            res.status(200);
            res.json(lista);
        }
        catch (error) {
            res.status(500);
            res.send("Erro ao recuperar dados dos pacientes");
        }
    },


    async detalhesDoPaciente (req, res) {
        const idPaciente = req.params['id'];
        console.log("id da url recuperado = " + req.params["id"])

        try {
            const paciente = await Pacientes.findByPk(idPaciente);
            if (paciente){ 
                res.status(200);
                res.json(paciente);
            }
            else{
                res.status(404); // not found
                res.send("Paciente "+idPaciente+" não encontrado");
            }
        }
        catch (error) {
            res.status(500);
            res.send("Erro ao recuperar dados do banco")
        }
    },


    async cadastrarPaciente (req, res) {
        try {
            // capturei os dados da request numa estrutura
            const { nome, email, idade } = req.body;
            const novoPaciente = await Pacientes.create({nome, email, idade});
            return res.status(201).json(novoPaciente);
        }
        catch (error) {
            console.log("NÃO FOI POSSÍVEL CADASTRAR O PACIENTE");
            console.error(error);
            return res.status(500).json("Não foi possível cadastrar o paciente");
        }
    },


    async atualizarPaciente(req, res){
        try {
            // capturei os dados da request numa estrutura
            const { id } = req.params;
            const { nome, email, idade } = req.body;
            const atualizaDados = await Pacientes.update({nome, email, idade});
            return res.status(201).json(atualizaDados);
        }
        catch (error) {
            console.log("NÃO FOI POSSÍVEL ATUALIZAR OS DADOS DO PACIENTE");
            console.error(error);
            return res.status(500).json("Não foi possível atuzalizar os dados do paciente");
        }
    },


    apagarPaciente(req, res){
        console.log("estou na funcao de apagar");
        res.send("PRODUTOcontroller-apagar");
    }

}


module.exports = pacienteController;