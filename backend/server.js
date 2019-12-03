const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
var stream   = require('stream');
const PORT = 4000;

const cp = require("child_process");
const { spawn } = require("child_process");

const { onExit } = require("@rauschma/stringio");

const file = "";

app.use(cors());
app.use(bodyParser.json());

function runScript(){
  return cp.spawn("python", ['-u',`helloworld.py`]);
}

let spawnChild;


app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

app.get("/express_backend", (req, res) => {
  console.log("worked");
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/startup", async (req, res) => {
  try {
    spawnChild = runScript();
    
    spawnChild.stdout.once('data', function(data) { 
      console.log(String.fromCharCode.apply(null,data))
      res.send(data.toString());
    });

  } catch (e) {
    console.log(e);
  }
});

app.get("/send_message", async (req, res) => {
  try {
    spawnChild.stdin.write("hello\n");
    spawnChild.stdout.once('data', function(data) { 
      console.log(String.fromCharCode.apply(null,data))
      res.send(data.toString());
    });
  } catch (e) {
    console.log(e);
    res.send("Couldnt send it my dude")
  }
});
