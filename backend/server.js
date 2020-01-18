const express = require("express");
const bodyParser = require("body-parser")
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const cp = require("child_process");
const { spawn } = require("child_process");
let spawnChild;


const PORT = process.env.PORT||4001;

const app = express();
const router = express.Router();

router.get("/",(req,res)=>{
  res.send({response: "Alive"}).status(200);
});

router.post("/send_message",(req,res)=>{
  try {
    console.log(req.body)
    spawnChild.stdin.write(req.body.send+"\n"); 
    res.send({process:"false"});  
  } catch (e) {
    console.log(e);
    res.send("Couldnt send it my dude")
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(router);

function runScript(){
  return cp.spawn("python", ['-u',`helloworld.py`]);
}

const server = http.createServer(app);
const io = socketIo(server);

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  spawnChild = runScript();
  if (interval) {
    clearInterval(interval);
  }
  spawnChild.stdout.on('data', function(data) { 
    socket.emit("FromAPI", data.toString());
  });
  spawnChild.on('end', function(data) { 
    console.log("sup")
  });
  spawnChild.stderr.setEncoding('utf-8');
  spawnChild.stderr.on('data', function () {
    socket.emit('process_data', data);
  });

  // interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    spawnChild.kill('SIGINT')
  });
});

server.listen(PORT);


// const cp = require("child_process");
// const { spawn } = require("child_process");

// app.use(cors());
// app.use(bodyParser.json());

// var stream   = require('stream');

// app.listen(PORT, function() {
//   console.log("Server is running on Port: " + PORT);
// });

// app.get("/express_backend", (req, res) => {
//   console.log("worked");
//   res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
// });

// app.get("/startup", async (req, res) => {
//   try {
//     spawnChild = runScript();
    
//     spawnChild.stdout.once('data', function(data) { 
//       console.log(String.fromCharCode.apply(null,data))
//       res.send(data.toString());
//       death = false;
//     });

//     spawnChild.stdout.once('end', function() { 
//       death = true;
//     });

//   } catch (e) {
//     console.log(e);
//   }
// });

// app.post("/send_message", async (req, res) => {
//   try {
//     if (!death){
//       spawnChild.stdin.write(req.body.send.text+"\n");      
//     }
//     else{
//       res.send({process:"false"});
//     }
//   } catch (e) {
//     console.log(e);
//     res.send("Couldnt send it my dude")
//   }
// });

module.exports = router;