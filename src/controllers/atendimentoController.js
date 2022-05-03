const Atendimentos = require("../models/Atendimentos")

const atendimentoController = {

    listarAtendimentos: async (req, res)=> {
        const lista = await Atendimentos.findAll()
        res.status(200).json(lista)
    },

    buscarAtendimento: async (req, res)=> {
        const atendimento = await Atendimentos.findOne({
            where: {
                atendimento_id: req.params.id
            }
        })
        if(atendimento){
            res.status(200).json(atendimento)
        } else{
            res.status(404).send('Id não encontrado')
        }
        
    },

    criarAtendimento: async (req, res) => {
        const novoAtendimento = {
            paciente_psicologo: req.body.paciente_id,
            data_atendimento: req.body.data_atendimento,
            observacao: req.body.observacao,
            psicologo_paciente: console.log(req.auth)
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
