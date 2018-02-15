import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const Stars = (props) =>{
  
	return(
  	<div className="col-5">
  	  {_.range(props.numberOfStars).map(i => 
          <i key={i} className="fa fa-star"></i>
        )}
  	</div>
  );
};


const Button = (props) =>{
  let button;

  switch(props.answerIsCorrect){
    case true :
      button = <button className="btn btn-success" onClick={props.acceptAnswer}>
        <i className="fa fa-check"></i>
      </button>
    break;
    case false:
      button = <button className="btn btn-danger" >
        <i className="fa fa-times"></i>
      </button>
    break;

    default:
      button = <button className="btn btn-info" onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}>=</button>
    break;
  }

	return(
  	<div className="col-2 text-center">
  	  {button}
      <br/><br/>
      <button className="btn btn-warning btn-sm" disabled={props.noOfRedraws === 0} onClick={props.redraw}>
        <i className="fa fa-refresh">&nbsp;{props.noOfRedraws}</i>
      </button>
  	</div>
  );
};

const Answer = (props) =>{
	return(
  	<div className="col-5">
      {
        props.selectedNumbers.map((val,i) => 
        <span key={i} onClick={()=>props.unselectedNumber(val)}>{val}</span>
        )
      }
  	</div>
  );
};


const Numbers = (props) =>{
  const computeClass = (num) => {
    if(props.usedNumbers.indexOf(num)>= 0){
      return 'used';
    }
    if(props.selectedNumbers.indexOf(num)>= 0){
      return 'selected';
    }
  }
	return(
  	<div className="card text-center">
  	  <div>
        { Numbers.list.map((number,i)=>

            <span 
              key={i} 
              className={computeClass(number)} 
              onClick={()=>props.selectParticularNumber(number)}>
              {number}
            </span>
        )}
        
  	  </div>
  	</div>
  );
};

Numbers.list = _.range(1,10);

class Game extends React.Component{
  state = {
    selectedNumbers : [],
    numberOfStars : 1+Math.floor(Math.random()*9),
    answerIsCorrect : null,
    usedNumbers : [],
    noOfRedraws :5,
  };
  
  selectParticularNumber = (clickedNum) => {
    if(this.state.selectedNumbers.indexOf(clickedNum)>= 0){return;}
    if(this.state.usedNumbers.indexOf(clickedNum)>= 0){return;}
    this.setState(prevState => ({
      answerIsCorrect : null,
      selectedNumbers : prevState.selectedNumbers.concat(clickedNum)
    }))
  };
  unselectedNumber = (clickedNum) => {
    this.setState(prevState => ({
      answerIsCorrect : null,
      selectedNumbers : prevState.selectedNumbers.filter(num => num !== clickedNum)
    }))
  };

  checkAnswer = () => {

    this.setState(prevState => ({
      answerIsCorrect : prevState.numberOfStars === prevState.selectedNumbers.reduce((acc,n) => acc+n,0)
    }));
  };

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers : prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers : [],
      answerIsCorrect : null,
      numberOfStars : 1+Math.floor(Math.random()*9),
    }));
  };

  redraw = () =>{
    if(this.state.noOfRedraws === 0){return;}
    this.setState(prevState=>({
      numberOfStars : 1+Math.floor(Math.random()*9),
      selectedNumbers : [],
      answerIsCorrect : null,
      noOfRedraws : prevState.noOfRedraws - 1

    }))
  };

	render(){
  	return(
    	<div className="container">
    	  <h3>Play Nine Game</h3>
        <hr/>
        <div className="row">
          <Stars 
                numberOfStars={this.state.numberOfStars}/>
          <Button 
                selectedNumbers={this.state.selectedNumbers} 
                checkAnswer={this.checkAnswer} 
                answerIsCorrect={this.state.answerIsCorrect}
                acceptAnswer={this.acceptAnswer}
                redraw={this.redraw}
                noOfRedraws= {this.state.noOfRedraws}/>
          <Answer 
                selectedNumbers={this.state.selectedNumbers} 
                unselectedNumber={this.unselectedNumber}/>
        </div>
        <br/>
        <Numbers 
                selectedNumbers={this.state.selectedNumbers} 
                selectParticularNumber={this.selectParticularNumber}
                usedNumbers={this.state.usedNumbers}/>
    	</div>
    );
  }
};

class App extends React.Component{
	render(){
  	return(
    	<div>
    	  <Game />
    	</div>
    );
  }
};

ReactDOM.render(<App/>,document.getElementById('root'));