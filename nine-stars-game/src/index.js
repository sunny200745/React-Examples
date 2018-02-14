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
	return(
  	<div className="col-2">
  	  <button className="btn btn-info" disabled={props.selectedNumbers.length === 0}>=</button>
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
    if(props.selectedNumbers.indexOf(num)>= 0){
      return 'selected';
    }
  }
	return(
  	<div className="card text-center">
  	  <div>
        { Numbers.list.map((number,i)=>

            <span key={i} className={computeClass(number)} onClick={()=>props.selectParticularNumber(number)}>
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
    numberOfStars : 1+Math.floor(Math.random()*9)
  };
  
  selectParticularNumber = (clickedNum) => {
    if(this.state.selectedNumbers.indexOf(clickedNum)>= 0){return;}
    this.setState(prevState => ({
      selectedNumbers : prevState.selectedNumbers.concat(clickedNum)
    }))
  };
  unselectedNumber = (clickedNum) => {
    this.setState(prevState => ({
      selectedNumbers : prevState.selectedNumbers.filter(num => num !== clickedNum)
    }))
  };
	render(){
  	return(
    	<div className="container">
    	  <h3>Play Nine Game</h3>
        <hr/>
        <div className="row">
          <Stars numberOfStars={this.state.numberOfStars}/>
          <Button selectedNumbers={this.state.selectedNumbers}/>
          <Answer selectedNumbers={this.state.selectedNumbers} unselectedNumber={this.unselectedNumber}/>
        </div>
        <br/>
        <Numbers selectedNumbers={this.state.selectedNumbers} selectParticularNumber={this.selectParticularNumber}/>
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