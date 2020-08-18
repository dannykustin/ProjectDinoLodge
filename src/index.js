import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Creates empty varibles to be used in game
const playerArray = [
  {
    id: 0,
    name: "Player 1",
    score: 0, 
    currentTeam: "Red",
    previousTeams: [],
    codeSendLog: [],
    codeReceiveLog: [],
  },
  {
    id: 1,
    name: "Player 2",
    score: 0, 
    currentTeam: "Blue",
    previousTeams: [],
    codeSendLog: [],
    codeReceiveLog: [],
  },

];

//Creates code words
const RedCodeWordsArray = ["red1", "red2", "red3"];
const BlueCodeWordsArray = ["blue1", "blue2", "blue3"];

//Creates new player and HTML for it
class CreatePlayerHTMl extends React.Component {
  
  //builds the tempary varables to be filled later
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      team: '',
      arraylength: 0,
    };

    //Reacts way of cnnecting actions to functions I want
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Called when form is changed
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const arraylength = playerArray.length;

    this.setState({
      [name]: value
    });

  }

 

  //Called when teh form is submitted
  handleSubmit(event) {

    //Stops the typical way this would be handled
    event.preventDefault();

    if(this.state.team === "" || this.state.team === "Random" ){
      var teamChoose = Math.floor(Math.random() * 2);
      if(teamChoose === 0){
        this.state.team = "Red";
      }
      else{ 
        if(teamChoose === 1){
        this.state.team = "Blue";
        }
        else{
          this.state.team = "Error";
        }
      }
        
    }

    //Builds new player object 
    const newPlayer = {
    id: playerArray.length,
    name: this.state.name,
    score: 0, 
    currentTeam: this.state.team,
    previousTeams: [],
    codeSendLog: [],
    codeReceiveLog: [],
    };


    //Adds new player to the player array
    playerArray.push(newPlayer);

    console.log(playerArray);
    
  }

  render() {
    return (

      < >

        <h3>Create New Player:</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
          </label>

          <div>Team:

            <select name="team" value={this.state.team} onChange={this.handleInputChange}>
            <option value="Random">Random</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
            </select>

          </div>

          <input type="submit" value="Submit" />
        </form>

      </ >
      
    );
  }
}


//Creates Admin Interface
function AdminHTML (props){


  return (
    < >
        <p> Round Number: {RedCodeWordsArray[0].score} </p>
        <div> Players In This Round: {playerArray.length} </div>

        <br></br>

        <CreatePlayerHTMl />
    </ >
  )
}


//Send Kill code to another player
function KillCode (){
  console.log("Kill Code");
}

//Sends Save code to another player
function SaveCode (){
  console.log("Save Code");
}

//Creates buttons to Kill and Save Players
function CodeSend (props){

  const numberID = props.id;

  /*
  if(numberID === 0 ){
    numberID = 1;
  }else{
    numberID = 0;
  }
  
  */

  return(
    < >
      <p>Player: {playerArray[numberID].name} </p>
      <input type="button" value="Kill" onClick={KillCode}></input> 
      <input type="button" value="Save" onClick={SaveCode}></input>
    </>
  )
}

//Creates the each round's control inferface
const RoundHTML = ({currentTeam, id}) => {

  const newCodeWord = RedCodeWordsArray[0];

  /* Will need to determine what team player is on

  const [newCodeWord, setCodeWord] = useState("");

  if({currentTeam} === "Red"){
    setCodeWord(RedCodeWordsArray[0]);
  }else{
    if({currentTeam} === "Blue"){
      setCodeWord(BlueCodeWordsArray[0]);
    }
  }
  */

  //Creates Round Info
  return(
    < >
      <p>Current Team: {currentTeam}</p>

      <p>Code Word: {newCodeWord}</p>

      <CodeSend id={id}/>
    </>
  )
}

//Creates the results
const ResultHTML = ({score}) => {
  return(
    < >
      <p>Points This Round: {score}</p> 
      <p>Total Points: {score}</p>
    </ >
  )
}

//Creates player profile interface
const PlayerHTML = ({name, id, currentTeam, score}) => {
  return (

    < >      
        <p>Name: {name}, id: {id}</p> 

        <RoundHTML currentTeam={currentTeam} id={id}/>
          
        <ResultHTML score={score}/>

        <p>----------------------------------------</p>

    </ >
    
  );
  
} 


const PlayerOverview = ({players}) => {

  return (
    < >
      <div>
        {players.map(
          (player, i) => 
            <PlayerHTML 
              key={i}
              name={player.name} 
              id={player.id}
              currentTeam={player.currentTeam}
              score={player.score} />
        )}
      </div>
    </ >
	)

}

//Compiles everything for final render
function App() {
  return(

    < >
      <h1>Admin Interface:</h1>
      <AdminHTML />

      <br />

      <h1>Player Interface:</h1>

      <PlayerOverview players= {playerArray}/>
     
    </ >
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
