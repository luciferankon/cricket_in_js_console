const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
  rl.on('line', (input) => {
    if(input=="a")
    console.log(`Thank you for your valuable feedback ${input}`);
});

