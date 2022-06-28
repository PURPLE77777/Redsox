const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + "/src"));
app.use(express.json());

app.use("/", (req, res) => {
    res.sendFile(__dirname + "/src/index.html");
});

app.listen(PORT);
