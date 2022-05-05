const {
    Pacientes
} = require("../models/");

const pacienteController = {
    async listarPacientes(req, res) {
        try {
            const lista = await Pacientes.findAll({
                where: {
                    status: 1
                },

                attributes: {
                    exclude: ['status']
                }
            });
            res.status(200);
            res.json(lista);
        } catch (error) {
            res.status(500);
            res.send("Erro ao recuperar dados dos pacientes");
        }
    },


    async detalhesDoPaciente(req, res) {
        const idPaciente = req.params['id'];
        console.log("id da url recuperado = " + req.params["id"])

        try {
            const lista = await Pacientes.findOne({
                where: {
                    status: 1,
                    paciente_id: idPaciente
                },

                attributes: {
                    exclude: ['status']
                }
            });
            res.status(200);
            res.json(lista);
        } catch (error) {
            res.status(500);
            res.send("Erro ao recuperar dados do banco")
        }
    },


    async cadastrarPaciente(req, res) {
        try {

            const {
                nome,
                email,
                idade
            } = req.body;
            const novoPaciente = await Pacientes.create({
                nome,
                email,
                idade,
                status: 1
            });
            return res.status(201).json(novoPaciente);
        } catch (error) {
            console.log("NÃO FOI POSSÍVEL CADASTRAR O PACIENTE");
            console.error(error);
            return res.status(500).json("Não foi possível cadastrar o paciente");
        }
    },


    async atualizarPaciente(req, res) {
        try {
            const {
                id
            } = req.params;
            const {
                nome,
                email,
                idade
            } = req.body;
            const atualizaDados = await Pacientes.update({
                nome,
                email,
                idade
            }, {
                where: {
                    paciente_id: id,
                    status: 1
                }
            });
            if (!atualizaDados) {
                return res.status(400).json('Erro ao tentar atualizar dados do paciente')
            }

            const pacienteAtualizado = await Pacientes.findOne({
                where: {
                    status: 1,
                    paciente_id: id
                },

                attributes: {
                    exclude: ['status']
                }
            });

            return res.status(200).json(pacienteAtualizado);
        } catch (error) {
            console.log("NÃO FOI POSSÍVEL ATUALIZAR OS DADOS DO PACIENTE");
            console.error(error);
            return res.status(500).json("Não foi possível atuzalizar os dados do paciente");
        }
    },


    async apagarPaciente(req, res) {
        try {
            const { id } = req.params;

            const paciente = await Pacientes.findOne({
                where: {
                    status: 1,
                    paciente_id: id
                },})
            if (paciente ){
                await Pacientes.update({
                    status: 0
                }, {
                    where: {
                        paciente_id: id,
                        status: 1
                    }
                });
                return res.status(204).json();
            }

            res.status(404).json("id não encontrado");
        } catch (error) {
            return res.status(500).json("Não foi possível apagar o paciente");
        }
    }

}


module.exports = pacienteController;