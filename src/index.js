import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    // prevents further clicks from being done if a winning combination has been found.
    if (determineWinner(squares) || squares[i]) {
      return;
    }


    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      isXNext: !this.state.isXNext,
    });
  }

  renderSquare(i) {
    return(
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // const status = 'Next player: ' + (this.state.isXNext ? ' Xs turn' : 'Os turn');
    const winner = determineWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'The winner is: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.isXNext ? ' Xs turn' : 'Os turn');
    }

    return (
      <div>
        <div className="status">{status}</div>
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
      isXNext = true,
    };
  }


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

/**
* Determines a winner based on a straight-line configuration between all three of the squares.
*/
function determineWinner(squares) {
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// iterates through each of the lines, and determines if
for(var i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
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
