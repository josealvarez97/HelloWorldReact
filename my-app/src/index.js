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
function Square(props)



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

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();// was slick needed?
        // We call .slice() to copy the squares array instead of mutating the existing array.
        squares[i] = 'X';
        this.setState({squares:squares}); // update...
    }

    renderSquare(i) {
    // Passing two important prompts from Board to Square
    return (
        <Square 
            value={this.state.squares[i]} 
            // Board passed onClick = {() => this.handleClick(i)} tp SqUare, so, 
                // when called, it runs this.handleClick(i) on the Board.
                // notice *****(i)*****
            onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="stats">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  