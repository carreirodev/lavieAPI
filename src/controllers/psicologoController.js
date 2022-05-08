const { Psicologos } = require("../models");
const bcrypt = require("bcryptjs");

const psicologoController = {
	async listarPsicologos(req, res) {
		const listaDePsicologos = await Psicologos.findAll({
			// include: Atendimentos
			where: {
				status: 1
			},

			attributes: {
				exclude: ["status"]
			}
		});
		console.log(req.auth);

		res.status(200).json(listaDePsicologos);
	},

	async detalhesDoPsicologo(req, res) {
		try {
			const id = req.params["id"];

			console.log(req.auth);

			const psicologo = await Psicologos.findOne({
				where: {
					status: 1,
					psicologo_id: id
				},
				attributes: ["psicologo_id", "nome", "email", "apresentacao"]
			});
			if (psicologo) {
				return res.status(200).json(psicologo);
			}

			res.status(404).send("id não encontrado!");
		} catch (error) {
			res.status(500);
			res.send("Erro ao tentar conectar com o servidor!");
		}
	},

	async registrarPsicologo(req, res) {
		try {
			const { nome, email, senha, apresentacao } = req.body;

			const newSenha = bcrypt.hashSync(senha, 10);

			const newPsicologo = await Psicologos.create({
				nome,
				email,
				senha: newSenha,
				apresentacao,
				status: 1
			});

			console.log("antes de deletar", newPsicologo);
			delete newPsicologo.dataValues.status;
			console.log("depois de deletar ", newPsicologo);

			return res.status(201).json(newPsicologo);
		} catch (error) {
			if (error.name == "SequelizeUniqueConstraintError") {
				return res.status(400).json("E-mail já existente!");
			}
			res.status(400);
			res.json("Erro ao tentar registrar!");
		}
	},

	async deletarPsicologo(req, res) {
		try {
			const { id } = req.params;

			console.log(req.auth);

			if (!id) {
				return res.status(404).json("id não encontrado");
			}

			if (req.auth.psicologo_id != id) {
				return res.status(401).json("Não autorizado!");
			}

			const psicologo = await Psicologos.findOne({
				where: {
					status: 1,
					psicologo_id: id
				}
			});

			if (psicologo) {
				await Psicologos.update({ status: 0 }, { where: { psicologo_id: id } });

				return res.status(204).json();
			}

			res.status(404).json("id não encontrado!");
		} catch (error) {
			return res.status(500).json("Erro ao tentar conectar com o servidor!");
		}
	},

	async atualizarPsicologo(req, res) {
		try {
			const { id } = req.params;

			console.log(req.auth);

			const { nome, email, senha, apresentacao } = req.body;

			if (!id) {
				return res.status(404).json("id não encontrado");
			}

			if (req.auth.psicologo_id != id) {
				return res.status(401).json("Não autorizado!");
			}

			const newSenha = bcrypt.hashSync(senha, 10);

			await Psicologos.update(
				{
					nome,
					email,
					senha: newSenha,
					apresentacao
				},
				{
					where: {
						psicologo_id: id,
						status: 1
					}
				}
			);

			const psicologoAtualizado = await Psicologos.findOne({
				where: {
					status: 1,
					psicologo_id: id
				},

				attributes: {
					exclude: ["status"]
				}
			});
			return res.status(200).json(psicologoAtualizado);
		} catch (error) {
			if (error.name == "SequelizeUniqueConstraintError") {
				return res
					.status(400)
					.json("E-mail já existente! Este e-mail já está sendo utilizado!");
			}
			return res.status(500).json("Erro ao tentar conectar com o servidor!");
		}
	}
};

module.exports = psicologoController;
