import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function RoundUpdate (){

  //const CodeWords = ["test1", "test2", "test3"];

  //Stores round value
  const [roundVal, setRoundVal] = useState("");

  useEffect(() => {
    console.log();
  }, [roundVal]);

  //Creates Round Info
  return(
    < >
      <h1> 
        Round Number: 
        <input type="number" value={roundVal} onChange={e => setRoundVal(e.target.value)}></input>
      </h1>
      
      <form>
        <div>Team This Round: GREYSON RULLLLEEZZZZZ THIS TIME FOR REAL</div>

        <label>Red: 
          <input type="radio" ></input>
        </label>

        <label>Blue: 
          <input type="radio" ></input>
        </label>

        <br />
        <br />

        <label>
          Players In This Round: <input type="number"></input>
        </label>

        <br />

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

function KillCode (number){
  console.log("Kill Code " + number);
}

function SaveCode (){
  console.log("Save Code");
}

//Compiles everything for final render
function App() {
  return(
    < >
      <RoundUpdate />
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
