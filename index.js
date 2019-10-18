const { exec } = require("child_process");
const { spawn } = require("child_process");

const { onExit } = require("@rauschma/stringio");

// exec("python test.py", (err, stdout, stderr) => {
//   if (err) {
//     //some err occurred
//     console.error(err);
//   } else {
//     // the *entire* stdout and stderr (buffered)
//     console.log(`stdout: \n${stdout}`);
//     console.log(`stderr: \n${stderr}`);
//   }
// });

async function main() {
  try {
    s = spawn("python", ["test.py"], {
      stdio: [process.stdin, process.stdout, process.stderr]
    });
    await onExit(s);
  } catch (e) {
    console.log(e);
  }
}

main();
