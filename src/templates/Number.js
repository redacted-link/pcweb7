import React, {useContext,useEffect, useState} from "react";
import {AppContext} from "../views/GamePage";



function Number({numberPos, attemptNum}) {
    const {board, currAttempt, correctNum,correctc,setCorrectc}= useContext(AppContext);
    const num= board[attemptNum][numberPos];
    const strcnum= String(correctNum).split("")
    const correct= strcnum[numberPos] ===num;
    //close as in in number but wrong order - boolean that checks num not empty not correct and in correctNum
    const almost= !correct && num!=="" && strcnum.includes(num)

    const numState= currAttempt.attempt > attemptNum && (correct ? "correct" : almost ? "almost" : "error" )


    useEffect(() => {
        if (correct) {
        const newc= correctc+1
        setCorrectc(newc)}
    },[correctc,correct,setCorrectc])

    return (
        <div id={numState} className="char">{num}</div>
    )
};

export default Number;