const express = require("express");
const cors = require("cors");
const db = require("./database");
const routes = require("./routes");

const handleError = require("./middleware/handleError");

const app = express();

db.hasConnection();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handleError);

// definicao de endereço e url
const hostname = "localhost";
const port = 4000;
app.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
