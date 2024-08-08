import React, {useContext} from "react";
import { AppContext } from "../views/GamePage";

function Key({ Val}) {
    const { gameEnd,onSelectNum, onDelete, onEnter}= useContext(AppContext);

    const selectNum=() => {
        if (gameEnd.gameEnd) return;
        if (Val==="ENTER") {
            onEnter();
        } else if (Val==="DELETE") {
            onDelete();
        } else{
            onSelectNum(Val);
        }
    };
    return (
        <div className="key" onClick={selectNum}>
            {Val}
        </div>
    )
}

export default Key;