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
                status:1
            },
        });
        
        if(!psicologo || !bcrypt.compareSync(senha, psicologo.senha)){
            return res.status(401).json("E-mail ou senha inválido, verifique e tente novamente");
        }

        const token = jwt.sign({
            psicologo_id: psicologo.psicologo_id,
            email: psicologo.email,
            nome: psicologo.nome,
            apresentacao: psicologo.apresentacao,
        },
        secret.key
        );
        return res.status(200).json(token);

    },
};

module.exports = authController;