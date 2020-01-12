const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const PORT = process.env.PORT||4001;

const app = express();
const router = express.Router();

router.get("/",(req,res)=>{
  res.send({response: "Alive"}).status(200);
});

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(PORT);

// const cp = require("child_process");
// const { spawn } = require("child_process");

// app.use(cors());
// app.use(bodyParser.json());

// var stream   = require('stream');
// function runScript(){
//   return cp.spawn("python", ['-u',`helloworld.py`]);
// }

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

//       spawnChild.stdout.once('data', function(data) { 
//         console.log(String.fromCharCode.apply(null,data))
//         res.send(data.toString());
//       });
//     }
//     else{
//       res.send({process:"false"});
//     }
//   } catch (e) {
//     console.log(e);
//     res.send("Couldnt send it my dude")
//   }
// });

