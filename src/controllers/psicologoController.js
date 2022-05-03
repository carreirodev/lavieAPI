const {
    Psicologos,
} = require("../models");
const bcrypt = require("bcryptjs");

const psicologoController = {
    async listarPsicologos(req, res) {
        const listaDePsicologos = await Psicologos.findAll({
            // include: Atendimentos
        });

        res.status(200).json(listaDePsicologos);
    },


    async detalhesDoPsicologo(req, res) {
        try {
        const id = req.params['id'];

            const psicologo = await Psicologos.findByPk(id);
            if (psicologo) {
                // delete psicologo._options.attributes;
                delete psicologo.dataValues.senha;
                delete psicologo._previousDataValues.senha;
                // console.log(psicologo);
                return res.status(200).json(psicologo);
            }

            res.status(404).send("id não encontrado!");

        } catch (error) {
            res.status(500);
            res.send("Erro ao tentar conectar com o servidor!")
        }
    },

    async registrarPsicologo(req, res) {
        try {
            const {
                nome,
                email,
                senha,
                apresentacao
            } = req.body;

            const newSenha = bcrypt.hashSync(senha, 10);

            const newPsicologo = await Psicologos.create({
                nome,
                email,
                senha: newSenha,
                apresentacao
            });

            return res.status(201).json(newPsicologo);
        } catch (error) {
            res.status(400);
            res.json("Erro ao tentar registrar!")
        }

    },

    async deletarPsicologo(req, res) {
        try {
            const {
                id
            } = req.params;

            const psicologo = await Psicologos.findByPk(id);

            if (psicologo) {
                await Psicologos.destroy({
                    where: {
                        psicologo_id: id
                    },
                });
    
                return res.status(204);
            }

            res.status(404).json("id não encontrado!");
            
        } catch (error) {
            return res.status(500).json("Erro ao tentar conectar com o servidor!");
        }

    },

    async atualizarPsicologo(req, res) {
        try {
            const {
                id
            } = req.params;

            const {
                nome,
                email,
                senha,
                apresentacao
            } = req.body;

            if (!id) {
                return res.status(400).json("id não encontrado");
            }

            await Psicologos.update({
                nome,
                email,
                senha,
                apresentacao
            }, {
                where: {
                    psicologo_id: id
                }
            });

            const psicologoAtualizado = await Psicologos.findByPk(id);
            return res.status(200).json(psicologoAtualizado);
        } catch (error) {
            return res.status(500).json("Erro ao tentar conectar com o servidor!");
        }


    }

};

module.exports = psicologoController;