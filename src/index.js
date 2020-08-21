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
  {
    id: 2,
    name: "Player 3",
    score: 0, 
    currentTeam: "Red",
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
    };

    //Reacts way of connecting actions to functions I want
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Called when form is changed
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  //Called when teh form is submitted
  handleSubmit(event) {

    //Stops the typical way this would be handled
    event.preventDefault();

    //Set team using useState Hook
    const [team, setTeam] = useState("");

    //If user did not put a team or seleted random, user is randomly sorted
    if(this.state.team === "" || this.state.team === "Random" ){

      var teamChoose = Math.floor(Math.random() * 2);
      if(teamChoose === 0){
        setTeam("Red");
      }
      else{ 
        if(teamChoose === 1){
        setTeam("Blue");
        }
        else{
          setTeam("Error");
        }
      }
        
    }

    //Builds new player object 
    const newPlayer = {
    id: playerArray.length,
    name: this.state.name,
    score: 0, 
    currentTeam: team,
    previousTeams: [],
    codeSendLog: [],
    codeReceiveLog: [],
    };

    //Adds new player to the player array
    playerArray.push(newPlayer);

    //log to determine this function works 
    console.log(playerArray);
    
  }

  //Generates the atcual interface
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

  //Generates the atcual interface
  return (
    < >
        <p> Round Number: </p>
        <div> Players In This Round: {playerArray.length} </div>

        <br></br>

        <CreatePlayerHTMl />
    </ >
  )
}


//Send Kill code to another player
function KillCode (props){

  //Fills the variables to be used in function
  const idArray = props.idArray;
  const senderId = idArray[0];
  const recieverId = idArray[1]; 

  //log to determine this function works 
  console.log("Sent From " + playerArray[senderId].name + " to " + playerArray[recieverId].name );
}

//Sends Save code to another player
function SaveCode (props){
  //Fills the variables to be used in function
  const idArray = props.idArray;
  const senderId = idArray[0];
  const recieverId = idArray[1]; 

  //log to determine this function works 
  console.log("Sent From " + playerArray[senderId].name + " to " + playerArray[recieverId].name );
}

//Send Kill code to another player
function CodeSendButtons (props){

  //Fills the variables to be used in function
  const name = props.name;
  const idArray = [props.senderId, props.recieverId];

  //Generates the atcual interface
  return(
    < >
      <p> {name} </p>
      <input type="button" value="Kill" onClick={() => KillCode( {idArray} )}></input>
      <input type="button" value="Save" onClick={() => SaveCode( {idArray} )}></input>
    </ >
  );
  
}


//Creates buttons to Kill and Save Players
function CodeSend (props){

  //Gets the players ID
  const numberID = props.id;

  //creates empty array to be filled with codesend info
  const codeSendPlayer = [];
  
  //Goes through the player array and isolates each player
  for(const player of playerArray){

    //Avoids adding player if it the same as the player sending code
    if( !(player.id === numberID) ){
      
      //Adds the player info to the kill save place
      codeSendPlayer.push( 
        <CodeSendButtons 
          key={player.id} 
          name={player.name} 
          recieverId={player.id}
          senderId={props.id} 
        /> 
      );  
    }

  }

  //Generates the atcual interface
  return(
    < >
      {codeSendPlayer}
    </>
  )
}

//Creates the each round's control inferface
class RoundHTML extends React.Component {
  render(){
    
    //The variables needed fore the interface creation
    const { currentTeam } = this.props;
    const { id } = this.props;

    //Pulls the codeword from the correct code word array
    const newCodeWord = currentTeam === "Red" ? RedCodeWordsArray[0] : BlueCodeWordsArray[0];

    //Generates the atcual interface
    return(
      < >
        <p>Current Team: {currentTeam}</p>

        <p>Code Word: {newCodeWord}</p>

        <CodeSend id={id}/>
      </>
    )
  } 
}

//Creates the results
class ResultHTML extends React.Component {
  render (){

    //The variables needed fore the interface creation
    const { score } = this.props;

    //Generates the atcual interface
    return(
      < >
        <p>Points This Round: {score}</p> 
        <p>Total Points: {score}</p>
      </ >
    )
  }
  
}

//Creates player profile interface
class PlayerHTML extends React.Component {
  render (){

    //The variables needed fore the interface creation
    const { name } = this.props;
    const { id } = this.props;
    const { currentTeam } = this.props;
    const { score } = this.props;

    //Generates the atcual interface
    return (
      < >      
        <p>Name: {name}, id: {id}</p> 

        <RoundHTML currentTeam={currentTeam} id={id}/>
          
        <ResultHTML score={score}/>

        <p>----------------------------------------</p>
      </ >
    );
  }
  
} 

//The class that creates the other player elements
class PlayerOverview extends React.Component {
  render (){

    //The variables needed fore the interface creation
    const { players } = this.props;

    //Generates the atcual interface
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
