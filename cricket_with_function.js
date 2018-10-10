//initializing the readline
const readline = require('readline');
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

//generating random run
const run = function(){
  return Math.floor(Math.random()*25);
}

//total run for first innings
const totalRun = function(){
  return Math.floor(Math.random()*50)+130;
}

//wickets fallen in the first innings
const totalWicket = function(){
  return Math.floor(Math.random()*10);
}

//number of overs left
const overLeft = function(){
  if(isWide||isNo){
    ball+=2;
  }
  if(ball==0){
    overs--;
    ball=6;
  }
  ball--;
  if(ball>=6){
    overs++;
    ball=0;
  }
  leftOver=overs+"."+ball;
  return leftOver;
}


//reset every stats after innnings over
const resetEverything = function(){
  yourRun=0;
  overs=10;
  ball=0;
  wicket=0;
  isWide=false;
  isNo=false;
}



//match winning condition
const win = function(currentRun){
  console.log("it's a",currentRun,"Score:",yourRun+"/"+wicket);
  console.log("you scored",yourRun,"/",wicket,"won the match");
  process.exit();
}

//wickets fallen till the ball
const wicketDown = function(currentOverLeft){
  console.log("Player",(+wicket+1),"is out. Current score:",yourRun-8+"/"+(+wicket+1));
  if(!isInningsOver){
    console.log("Overs left:",currentOverLeft);
  }
  yourRun-=8;
  wicket++;
  if(currentOverLeft=="0.0" || wicket==10){
    if(isInningsOver){
      console.log("you lost the match by",target-yourRun-1,"runs");
      process.exit();
    }
    target=yourRun+1;
    console.log("\n\nSECOND INNINGS IS STARTING.\n\nTARGET:",target);
    console.log("hit enter to start the second innings");
    isInningsOver=true;
    resetEverything();
    return;
    //process.exit();
  }
  if(isInningsOver){
    console.log(target-yourRun+" needed to win from " +currentOverLeft);
  }
  return;
}


//match end by innings over condition
const inningsOver = function(){
  console.log("Your score",yourRun+"/"+wicket);
  if(isInningsOver){
    console.log("you lost the match by",target-yourRun-1,"runs");
    process.exit();
  }
  target=yourRun+1;
  console.log("\n\nSECOND INNINGS IS STARTING.\n\nTARGET:",target);
  console.log("hit enter to start the second innings");
  isInningsOver=true;
  resetEverything();
  return;
  //process.exit();
}

const formatOversLeft=function(oversLeft) {
  return "Overs left: " + oversLeft;
}

const formatRunsNeeded=function(runs,oversLeft) {
  return runs+" needed to win from " + oversLeft);
}
//wide ball condition
const wideBall = function(){
  yourRun-=6;
  isWide=true;
  let currentOverLeft = overLeft();
  console.log("This is a wide ball. Current score:",yourRun+"/"+wicket);
  let message = formatOversLeft(currentOverLeft);
  if(isInningsOver){
    message=formatRunsNeeded(target-yourRun,currentOverLeft);
  }
}

//no ball condition
const noBall = function(){
  yourRun-=4;
  isNo=true;
  let currentOverLeft = overLeft();
  console.log("This is a no ball. Current score:",yourRun+"/"+wicket);
  if(!isInningsOver){
    console.log("Overs left:",currentOverLeft);
  }
  if(isInningsOver){
    console.log(target-yourRun+" needed to win from " +currentOverLeft);
  }
}

//what happened on current ball
const secondInnings = function(){
  if(isInningsOver){
    let currentRun=runChance[run()];
    let currentOverLeft=overLeft();
    yourRun+=currentRun; 
  

    //wide ball condition
    if(currentRun==7){
      wideBall();
      isWide=false;
      return;
    }
  
    //no ball condition
    if(currentRun==5){
      noBall();
      isNo=false;
      return;
    }


    //win condition
    if(yourRun>=target){
      win(currentRun);
      return;
    }

    //wicket fall on the current ball
    if(currentRun==8){
      wicketDown(currentOverLeft);    
      return;
    }

    //printing current run and wicket
    console.log("it's a",currentRun,"score",yourRun+"/"+wicket);

    //if over is finished
    if(currentOverLeft=="0.0"){
      inningsOver();
      return;
    } 

    //how much runs and overs are remaining
    console.log(target-yourRun+" needed to win from " +currentOverLeft);
  }
}

//first innings score
const firstInnings = function(){
  if(!isInningsOver){
    let currentRun=runChance[run()];
    let currentOverLeft=overLeft();
    yourRun+=currentRun; 

    //wide ball condition
    if(currentRun==7){
      wideBall();
      isWide=false;
      return;
    }

    //no ball condition
    if(currentRun==5){
      noBall();
      isNo=false;
      return;
    }


    //wicket fall on the current ball
    if(currentRun==8){
      wicketDown(currentOverLeft);    
      return;
    }

    //printing current run and wicket
    console.log("it's a",currentRun,"score",yourRun+"/"+wicket);
    console.log("Overs left",currentOverLeft);

    //if over is finished
    if(currentOverLeft=="0.0"){
      inningsOver();
      return;
    } 
  }
}

//print opening messages
console.log("MATCH IS GOING TO START\n\nTo begin first innings hit enter");

//initializing variables
let target;
let runChance=[1,2,3,4,6,1,8,2,2,8,4,5,1,2,0,4,6,8,7,0,3,6,0,4,7];
let yourRun=0;
let overs=10;
let ball=0;
let wicket=0;
let isWide=false;
let isNo=false;
let isInningsOver=false;


//taking input for each line
rl.on('line',(input) => {
  if(!isInningsOver){
    firstInnings();
  }else{
    secondInnings();
  }
});

