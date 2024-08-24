import { useState } from "react";
import Card from "../Card/Card";
import isWinner from "../helpers/CheckWinner";
import './Grid.css'
function Grid({numberOfCards}){

    const [board,setBoard]=useState(Array(numberOfCards).fill(""));
    const [turn,setTurn]=useState(true);//tur => O , false => X
    const [winner,setWinner]=useState(null);
    function play(index){
        if(turn==true){
            board[index]="O";
        }else{
            board[index]="X";
        }
        const win=isWinner(board,turn ? "O" : "X");

        if(win){
            setWinner(win);
        }
        setBoard([...board]);
        setTurn(!turn);
    }


    function Reset(){
        setTurn(true);
        setWinner(null);
        setBoard(Array(numberOfCards).fill(""));
    }
    return(
        <div className="grid-wrapper">
            {
                winner && (
                    <>
                    <h1 className="turn-highlight">Winner is {winner}</h1>
                    <button className="reset" onClick={Reset}>Reset Game</button>
                    </>
                )
            }
            <h1 className="turn-highlight">Current turn is : {(turn) ? ('O') : ('X')}</h1>
            <div className="grid">
            {board.map((el,idx)=><Card gameEnd={winner ? true : false} key={idx} onPlay={play} player={el} index={idx}/>)}
            </div>
        </div>
        
    );
}

export default Grid;