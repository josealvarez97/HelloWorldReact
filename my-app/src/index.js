import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




// FUNCTIONAL COMPONENTS
//"We’ve removed the constructor, and in fact, 
//React supports a simpler syntax called functional 
//components for component types like Square that only 
//consist of a render method. 
//Rather than define a class extending React.Component, 
//simply write a function that takes props and returns 
//what should be rendered."
function Square(props) {
    return (
        <button className="square"
        onClick={props.onClick}>
        {props.value}
        </button>
    );
}



// //Square no longer keeps its own state; it receives its 
// //value from its parent Board and informs its parent when 
// //it’s clicked. We call components like this 
// //controlled components.
// class Square extends React.Component {

//     // We are not using the state property of Square
//     // Or "it doesn't have a state anymore"
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }


//     render() {
//         return (
//             //Now when the Square is clicked, it will call the onClick function that was passed through by Board.
//             // The onClick prop on the Built-in DOM <button> tells React to set up a click event listener.
//             // When the button is clicked, React will call the onClick event handler defined in Square's render() method.
//                 // "Specified"? Function was defined somewhere else.
//             // This event handler calls this.props.onClick(). Sauare's props were specified by the Board.
//             // Board passed onClick = {() => this.handleClick(i)} tp SqUare, so, 
//                 // when called, it runs this.handleClick(i) on the Board.
//                 // notice *****(i)*****
//             <button className="square" onClick={()=>this.props.onClick()}>
//             {this.props.value}
//             </button>
//         );
//         //Note that DOM <button> element’s onClick attribute has a special meaning to React, 
//         //but we could have named Square’s onClick prop or Board’s handleClick method differently. 
//         //It is, however, conventional in React apps to use on* names for the attributes and handle* 
//         //for the handler methods.
//     }
// }









/*
When you want to aggregate data from multiple children 
or to have two child components communicate with each other,
move the state upwards so that it lives in the parent 
component. The parent can then pass the state back down to 
the children via props, so that the child components are 
always in sync with each other and with the parent.
*/
class Board extends React.Component {

    // constructor(props) {
    //     super(props);

    //     // state was lifted up to Game...
    //     // this.state = {
    //     //     squares: Array(9).fill(null),
    //     //     xIsNext: true,
    //     // };
    // }


    

    renderSquare(i) {
    // Passing two important prompts from Board to Square
    return (
        <Square 
            value={this.props.squares[i]} 
            // Board passed onClick = {() => this.handleClick(i)} tp SqUare, so, 
                // when called, it runs this.handleClick(i) on the Board.
                // notice *****(i)*****
            onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        // let status;
        // const winner = calculateWinner(this.state.squares.slice());
        // if (!winner) { 
        //     status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        // } else {
        //     status = 'WINNER: ' + winner;
        // }

        // var context_text = calculateWinner(this.state.squares) == null?  
        // const status = calculateWinner(this.state.squares) == null? 'Next player:' 

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        }
    }

    handleClick(i) {

        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();// was slick needed?
        // We call .slice() to copy the squares array instead of mutating the existing array.
        
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
        }); // update changes
    }


    render() {
        const history = this.state.history;
        const current = history[history.length - 1];

        const winner = calculateWinner(current.squares);

        let status;
        const winner = calculateWinner(current.squares);
        if (!winner) { 
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        } else {
            status = 'WINNER: ' + winner;
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board
                squares = {current.squares}
                onClick={(i)=>this.handleClick(i)} 
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
}

function calculateWinner(squares) {
    // possible combinations for winning
    const lines = [
        // Horizontals
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Verticals
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagnoals
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  