const express = require("express");
const bodyParser = require("body-parser")
const http = require("http");
const socketIo = require("socket.io");
const cp = require("child_process");
const cors = require("cors");

let spawnChild;

const PORT = process.env.PORT||4001;

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(router);

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

function runScript(){
  return cp.spawn("python", ['-u',`helloworld.py`]);
}

function rs(lang, file) {
  console.log(lang);
  console.log(file);
  return cp.spawn(`${lang}`, ['-u',`${file}`]);
}

const server = http.createServer(app);
const io = socketIo(server);

const lang = process.argv[2];
const file = process.argv[3];
// let args = "";
// if (process.argv.length > 4) {
//   args = process.argv.slice(4, process.argv.length).join(" ");
// }

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  spawnChild = rs(lang, file);
  // spawnChild = rs(lang, file, args);
  // spawnChild = rs("python", "helloworld.py", args);
  if (interval) {
    clearInterval(interval);
  }
  spawnChild.stdout.on('data', function(data) {
    socket.emit("FromAPI", data.toString());
  });
  spawnChild.on('end', function(data) {
    console.log("sup")
  });
  //Listener for errors from childprocess
  spawnChild.stderr.setEncoding('utf-8');
  spawnChild.stderr.on('data', function (data) {
    socket.emit('process_data', data);
  });
  //Waits for web app to disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    spawnChild.kill('SIGINT')
  });
});

server.listen(PORT);

module.exports = router;
