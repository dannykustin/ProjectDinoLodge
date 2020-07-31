import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Creates empty player array
const PlayerArray = []
var playerCreated = 0;

//Creates the player object
function createPlayer (){

  //Builds new player object
  const newPlayer = {
    name: "Test", //playerInfo.name,
    score: 0,
    currentTeam: "Red", //playerInfo.team,
  };

  //Adds new player to the player array
  PlayerArray.push(newPlayer);

  console.log(PlayerArray);

  //Updates to say that this player was created
  playerCreated = 1;

}

//Creates player profile interface
function PlayerHTML (){
  return (
    < >
      <label> 
        Name: <input type="text" ></input>
      </label>
      <input type="button" value="Submit" onClick={createPlayer}></input>
    </ > 
  )
} 

//Creates the Team selection inferface
function TeamHTML (){

   //Stores team value
   const [teamVal, setTeamVal] = useState("");

   useEffect(() => {
    console.log("Team Updated");
  },);

  return (
    < >
      <div>Team This Round: 

        <label> Red: 
          <input type="text" value={teamVal} onChange={e => setTeamVal(e.target.value)}></input>
        </label>

        <label> Blue: 
          <input type="text" value={teamVal} onChange={e => setTeamVal(e.target.value)}></input>
        </label>

      </div>
    </ >
  )
}

//Creates the each round's control inferface
function RoundHTML (props){

  //Stores round value
  const [roundVal, setRoundVal] = useState("");

  useEffect(() => {
    console.log();
  }, [roundVal]);

  //Creates Round Info
  return(
    < >
      <label> 
        Round Number: 
        <input type="number" value={roundVal} onChange={e => setRoundVal(e.target.value)}></input>
      </label>
      
      <form>

        <label>
          Players In This Round: {PlayerArray.length}
        </label>

        <TeamHTML />

        <input type="button" value="Submit"></input>
      </form> 

      <br />
      
      <p>Code Word:</p>
    </>
  )
}


//Creates buttons to Kill and Save Players
function CodeSend (roundVal){
  return(
    < >
      <p>Player: </p>
      <input type="button" value="Kill" onClick={KillCode( {roundVal} )}></input>
      <br />
      <br />
      <input type="button" value="Save" onClick={SaveCode}></input>
    </>
  )
}

//Creates the results
function Result (){
  return(
    < >
      <p>Points This Round: </p>
      <p>Total Points:</p>
    </ >
  )
}

//Send Kill code to another player
function KillCode (number){
  //console.log("Kill Code " + number);
}

//Sends Save code to another player
function SaveCode (){
  //console.log("Save Code");
}

//Compiles everything for final render
function App(props) {
  return(
    < >

<PlayerHTML />

    <div>
      {playerCreated === 0 ? (
          <RoundHTML />
          
        ) : playerCreated === 1 ? (
          <PlayerHTML />
        ) : (
          <h1>Error Please Reload</h1>
      )}
    </div>
      
      <br />
      <br />
      <CodeSend />
      <br />
      <br />
      <Result />
    </ >
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
