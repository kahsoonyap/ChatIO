const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const PORT = 4000;

const { exec } = require("child_process");
const { spawn } = require("child_process");

const { onExit } = require("@rauschma/stringio");

const file = "";

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

app.get("/express_backend", (req, res) => {
  console.log("worked");
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/startup", async (req, res) => {
  console.log("startup");
  try {
    s = spawn("python", [`${file}`], {
      stdio: [process.stdin, process.stdout, process.stderr]
    });
    // render front here
    await onExit(s);
  } catch (e) {
    console.log(e);
  }
});

app.post("/send_message", async (req, res) => {
  console.log("send_message");
  // send message to terminal
});
