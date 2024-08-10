import React, {useContext} from "react";
import { AppContext } from "../views/GamePage.js";
import {Row} from "react-bootstrap";
import Number from "./Number.js";



export const defaultBoard= [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
]

export const outCorrectNum=Math.floor(Math.random()*(89999)+10000);
console.log(outCorrectNum)


function Board() {
    // const {correctc} = useContext(AppContext);
    return (
        <div className="board">
            <div className="row">
                <Number numberPos={0} attemptNum={0}/>
                <Number numberPos={1} attemptNum={0}/>
                <Number numberPos={2} attemptNum={0}/>
                <Number numberPos={3} attemptNum={0}/>
                <Number numberPos={4} attemptNum={0}/>
                {/* <div>{correctc}</div> */}
                {/* <div>{almostc}</div> */}
            </div>
            <div className="row">
                <Number numberPos={0} attemptNum={1}/>
                <Number numberPos={1} attemptNum={1}/>
                <Number numberPos={2} attemptNum={1}/>
                <Number numberPos={3} attemptNum={1}/>
                <Number numberPos={4} attemptNum={1}/>
            </div>
            <div className="row">
                <Number numberPos={0} attemptNum={2}/>
                <Number numberPos={1} attemptNum={2}/>
                <Number numberPos={2} attemptNum={2}/>
                <Number numberPos={3} attemptNum={2}/>
                <Number numberPos={4} attemptNum={2}/>
            </div>
            <div className="row">
                <Number numberPos={0} attemptNum={3}/>
                <Number numberPos={1} attemptNum={3}/>
                <Number numberPos={2} attemptNum={3}/>
                <Number numberPos={3} attemptNum={3}/>
                <Number numberPos={4} attemptNum={3}/>
            </div>
            <div className="row">
                <Number numberPos={0} attemptNum={4}/>
                <Number numberPos={1} attemptNum={4}/>
                <Number numberPos={2} attemptNum={4}/>
                <Number numberPos={3} attemptNum={4}/>
                <Number numberPos={4} attemptNum={4}/>
            </div>
            <div className="row">
                <Number numberPos={0} attemptNum={5}/>
                <Number numberPos={1} attemptNum={5}/>
                <Number numberPos={2} attemptNum={5}/>
                <Number numberPos={3} attemptNum={5}/>
                <Number numberPos={4} attemptNum={5}/>
            </div>
            <div className="row">
                <Number numberPos={0} attemptNum={6}/>
                <Number numberPos={1} attemptNum={6}/>
                <Number numberPos={2} attemptNum={6}/>
                <Number numberPos={3} attemptNum={6}/>
                <Number numberPos={4} attemptNum={6}/>
            </div>
            <div className="row">
                <Number numberPos={0} attemptNum={7}/>
                <Number numberPos={1} attemptNum={7}/>
                <Number numberPos={2} attemptNum={7}/>
                <Number numberPos={3} attemptNum={7}/>
                <Number numberPos={4} attemptNum={7}/>
            </div>
        </div>
    )
}
export default Board