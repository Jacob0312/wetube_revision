import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
	console.log(`${req.url} ${req.method}`);
	next();
};

const handleHome = (req, res) => {
	return res.send(`I love middlewares`);
};
app.get("/", logger, handleHome);

function handleListening() {
	console.log(`Server listening on port http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);
