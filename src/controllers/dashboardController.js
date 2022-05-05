const {
    Psicologos,
    Pacientes,
    Atendimentos
} = require("../models");

const dashboardController = {
    async pacientesTotal(req, res) {
        try {
            const pacienteNumero = await Pacientes.count({
                where: {
                    status: 1
                },
            });

            res.status(200).json(pacienteNumero);

        } catch (error) {

            res.status(500).json("Erro ao tentar conectar com o servidor.");
        }
    },

    async atendimentosTotal(req, res) {
        try {
            const atendimentoNumero = await Atendimentos.count();

            res.status(200).json(atendimentoNumero);

        } catch (error) {

            res.status(500).json("Erro ao tentar conectar com o servidor.");
        }
    },

    async psicologosTotal(req, res) {
        try {
            const psicologoNumero = await Psicologos.count({
                where: {
                    status: 1
                },
            });

            res.status(200).json(psicologoNumero);

        } catch (error) {

            res.status(500).json("Erro ao tentar conectar com o servidor.");
        }
    },

    async mediaAtendimentos(req, res) {
        try {
            const atendimentoNumero = await Atendimentos.count();
            const psicologoNumero = await Psicologos.count(); //all active(1) or desative(0)

            res.status(200).json((atendimentoNumero/psicologoNumero));

        } catch (error) {

            res.status(500).json("Erro ao tentar conectar com o servidor.");
        }
    },

}

module.exports = dashboardController;