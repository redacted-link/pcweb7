import React, {useCallback, useEffect, useContext} from "react";
import Key from "./onClicks";
import { AppContext } from "../views/GamePage";


function NumBoard() {
    const nums=["0","1","2","3","4","5","6","7","8","9"]

    const {
        board,currAttempt,gameEnd,onEnter,onDelete, onSelectNum
    }= useContext(AppContext);

    const handleNumboard= useCallback((event) =>
        {if (gameEnd.gameEnd) return;
         if (event.key==="Enter") {
            onEnter();
         } else if (event.key === "Backspace") {
            onDelete();
         } else {
            nums.forEach((key)=> {
                if ((event.key)=== key) {
                    onSelectNum(key)
                }
            })}
        }
    )

    useEffect(()=> {
        document.addEventListener("keydown", handleNumboard);

        return () => {
            document.removeEventListener("keydown", handleNumboard)
        };
    },[handleNumboard]);

    return (
        <div className="numboard">
            <div className="numline">
                {nums.map((key)=> { return <Key Val={key}/>})}
            </div>
            <div className="entdel">
                <Key Val={"ENTER"} />
                <Key val={"DELETE"} />
            </div>
        </div>
    )
}

export default NumBoard;