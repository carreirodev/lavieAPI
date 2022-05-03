const { Psicologos } = require("../models");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
const bcrypt = require("bcryptjs");

const authController = {
    async login(req, res){
        const { email, senha } = req.body;

        const psicologo = await Psicologos.findOne({
            where:{
                email,
            },
        });
        
        if(!psicologo){
            return res.status(400).json("Email não cadastrado");
        }

        if (!bcrypt.compareSync(senha, psicologo.senha)){
            return res.status(401).json("Senha inválida!");
        }

        const token = jwt.sign({
            psicologo_id: psicologo.psicologo_id,
            email: psicologo.email,
            nome: psicologo.nome,
            apresentacao: psicologo.apresentacao,
        },
        secret.key
        );
        return res.json(token);

    },
};

module.exports = authController;