const readline = require('readline');
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});
const run = function(){
  return Math.floor(Math.random()*20);
}
const totalRun = function(){
  return Math.floor(Math.random()*50)+130;
}
const totalWicket = function(){
  return Math.floor(Math.random()*10);
}
const overLeft = function(){
  if(ball==0){
    overs--;
    ball=6;
  }
  ball--;
  leftOver=overs+"."+ball;
  return leftOver;
}
const runOnCurrentBall = function(){
    let currentRun=runChance[run()];
    let currentOverLeft=overLeft();
    yourRun+=currentRun;
    if(yourRun>=target){
      console.log("you scored",yourRun,"/",wicket,"won the match");
      process.exit();
    }
    if(currentRun==8){
      console.log("You are out. Current score:",yourRun-8+"/"+(+wicket+1));
      yourRun-=8;
      if(currentOverLeft=="0.0"){
        process.exit();
      }
      console.log(target-yourRun+" needed to win from " +currentOverLeft);
      wicket++;
      if(wicket==10){
        process.exit();
      }
      return;
    }
    console.log("it's a",currentRun,"score",yourRun+"/"+wicket);
    if(currentOverLeft=="0.0" && yourRun<target){
      console.log("Your score",yourRun+"/"+wicket);
      console.log("you lost the match by",target-yourRun-1,"runs");
      process.exit();
    } 
    console.log(target-yourRun+" needed to win from " +currentOverLeft);
}
target=totalRun();
console.log("Their score is",target-1+"/"+totalWicket());
console.log("Target is",target);
let runChance=[1,2,3,4,6,1,2,8,4,1,2,0,4,6,8,0,3,6,0,4];
let yourRun=0;
let overs=10;
let ball=0;
let wicket=0;
rl.question('enter your team name: ',(answer) => {
});
rl.on('line',(input) => {
  runOnCurrentBall();
});
