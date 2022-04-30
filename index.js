const express = require("express");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// definicao de endereço e url
const hostname = "localhost";
const port = 4000;
app.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
