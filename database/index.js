const Sequelize = require("sequelize");

const senhaDATABASE = "sdGyJJhChiqbydu8VCut"; // <= COLOQUE AQUI SUA SENHA

const DB_NAME = "lavie";
const DB_USER = "root";
const DB_PASS = senhaDATABASE;
const DB_CONFIG = {
	dialect: "mysql",
	host: "localhost",
	port: 3306,
	define: {
		timestamp: false
	}
};

// objeto para guardar a conexão do banco dados
let db = {};

try {
	db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
} catch (error) {
	console.error("Error ao tentar uma conexão com banco dados");
}

async function hasConnection() {
	try {
		await db.authenticate();
		console.log("Banco dados conectado!");
	} catch (error) {
		console.error("Erro ao tentar se conectar ao banco de dados1");
	}
}

Object.assign(db, { hasConnection });

module.exports = db;
