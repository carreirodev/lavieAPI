const {
    Atendimentos,
    Psicologos,
    Pacientes
} = require("../models/")

const atendimentoController = {

    listarAtendimentos: async (req, res) => {
        const lista = await Atendimentos.findAll({
            include: [{
                    model: Psicologos,
                    attributes: {
                        exclude: ['senha', 'status']
                    },
                },
                {
                    model: Pacientes,
                    attributes: {
                        exclude: ['status']
                    },
                }
            ],
        });
        res.status(200).json(lista);
    },

    buscarAtendimento: async (req, res) => {
        const atendimento = await Atendimentos.findOne({
            include: [{
                    model: Psicologos,
                    attributes: {
                        exclude: ['senha', 'status']
                    },
                },
                {
                    model: Pacientes,
                    attributes: {
                        exclude: ['status']
                    },
                }
            ],
            where: {
                atendimento_id: req.params.id
            },
        });
        if (atendimento) {
            res.status(200).json(atendimento)
        } else {
            res.status(404).send('Id não encontrado')
        }

    },

    criarAtendimento: async (req, res) => {
        const novoAtendimento = {
            paciente_psicologo: req.body.paciente_id,
            data_atendimento: req.body.data_atendimento,
            observacao: req.body.observacao,
            psicologo_paciente: req.auth.psicologo_id
        }
        try {
            const atendimentoCriado = await Atendimentos.create(novoAtendimento)
            res.status(201).json(atendimentoCriado)
        } catch (error) {
            res.status(400).send('Algum campo com erro')
        }
    }
}

module.exports = atendimentoController