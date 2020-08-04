import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Creates empty varibles to be used in game
const PlayerArray = []
//var playerCreated = 0;


//Functions used for logic of the game:

//Creates buttons to Kill and Save Players
function CodeSend (roundVal){
  return(
    < >
      <p>Player: </p>
      <input type="button" value="Kill" onClick={KillCode}></input> 
      <input type="button" value="Save" onClick={SaveCode}></input>
    </>
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

//Functions used for creating HTML:

//Creates new player and HTML for it
class CreatPlayerHTMl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      team: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Called when new player form submitted
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  //Called when new player form submitted
  handleSubmit(event) {

    //Builds new player object 
    const newPlayer = {
      id: PlayerArray.length,
      name: this.state.name,
      score: 0, 
      currentTeam: this.state.team,
      previousTeams: [],
      codeSendLog: [],
      codeReceiveLog: [],
    };

    //Adds new player to the player array
    PlayerArray.push(newPlayer);

    console.log(PlayerArray);

    event.preventDefault();
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

    //Stores round value
    const [roundVal, setRoundVal] = useState("");

    useEffect(() => {
      console.log();
    }, [roundVal]);

  return (
    < >
        <label> 
          Round Number: 
          <input type="number" value={roundVal} onChange={e => setRoundVal(e.target.value)}></input>
        </label>
        <div> Players In This Round: {PlayerArray.length} </div>

        <br></br>

        <CreatPlayerHTMl />
    </ >
  )
}

//Creates player profile interface
function PlayerHTML (){

    //Stores round value
    const [nameVal, setNameVal] = useState("");

  return (
    < >
      <label> 
        Name: <input type="text" value={nameVal} onChange={e => setNameVal(e.target.value)}></input>
      </label>

      <RoundHTML />
        
      <ResultHTML />
    </ > 
  )
} 


//Creates the results
function ResultHTML (){
  return(
    < >
      <p>Points This Round: </p> 
      <p>Total Points:</p>
    </ >
  )
}

//Creates the each round's control inferface
function RoundHTML (props){

  //Creates Round Info
  return(
    < >
      <p>Code Word:</p>

      <CodeSend />
    </>
  )
}

//Compiles everything for final render
function App(props) {
  return(
    < >
      <h1>Admin Interface:</h1>
      <AdminHTML />

      <br />
      
      <h1>Player Interface:</h1>
      <PlayerHTML />
    </ >
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

/* Logic to be used later in having people create their own info
<div>
        {playerCreated === 0 ? (
            <RoundHTML />
            
          ) : playerCreated === 1 ? (
            <PlayerHTML />
          ) : (
            <h1>Error Please Reload</h1>
        )}
      </div>
*/