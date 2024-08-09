import { useEffect, useState, createContext, useCallback } from "react";
import SiteNav from '../templates/SiteNav';
import {collection, getDoc,setDoc, doc} from "firebase/firestore";
import {db,auth} from "../firebase";
import Board, {defaultBoard} from "../templates/BoardLayout"
import NumBoard from "../templates/NumBoard";
import { outCorrectNum } from "../templates/BoardLayout";
import { useNavigate } from "react-router-dom";
import "../App";
import "../App.css";
import {useAuthState} from "react-firebase-hooks/auth";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext= createContext();

export default function GamePage() {
   const [board, setBoard] = useState(defaultBoard);
   const [currAttempt, setCurrAttempt] = useState({attempt:0, char:0});
   const [correctNum, setCorrectNum]= useState("");
   const [gameEnd, setGameEnd] = useState({is_win: false, gameEnd: false});
   const [correctc,setCorrectc]= useState(0);
   const [user,loading]= useAuthState(auth);
   const [outuserstats,setOutUserStats]= useState({wins: 0, total: 0})

   const navigate = useNavigate();

    // async function getUser(useremail) {
    //     // console.log(useremail)
    //     const query= await getDoc(doc(db,"userstats", useremail));
    //     const stats = await query.data()
    //     // await console.log(stats)
    //     // await console.log(stats.wins)
    //     // await console.log(stats.total)
    //     await setOutUserStats({wins: stats.wins, total: stats.total});
    //     // console.log(outuserstats)
    //     return stats;
    // }

    // const handlegetUser = useCallback(()=>{
    //   if (loading) return;
    //   if (!user) return navigate("/login");
    //   getUser(user.email)
    // }, [getUser, user, loading,navigate])


  useEffect(() => {
    async function getUser(useremail) {
      // console.log(useremail)
      const query= await getDoc(doc(db,"userstats", useremail));
      const stats = await query.data()
      await console.log(stats)
      // await console.log(stats.wins)
      // await console.log(stats.total)
      await setOutUserStats({wins: stats.wins, total: stats.total});
      // console.log(outuserstats)
      return stats;
  }
    if (loading) return;
    if (!user) return navigate("/login");
    getUser(user.email)
    setCorrectNum(outCorrectNum);
    // console.log(correctNum);
  }, [correctNum,user,loading, navigate]);

  async function updateStats() {      
    const query= await getDoc(doc(db, "userstats", user));
    await setDoc(query.ref,{
      wins: outuserstats.wins,
      total: outuserstats.total
    })
    navigate("/stats");
  }
  
  async function winGame() {
    await setGameEnd({is_win:true, gameEnd:true});
    toast.success("You won !", {
      position: "top-center"
    });
    console.log(gameEnd);
    await setOutUserStats({ wins: outuserstats.wins +1, total: outuserstats.total +1});
    await console.log(outuserstats)
    await updateStats();
  }

  const onEnter=() => {
    if (currAttempt.char !== 5) return;
    if (gameEnd.gameEnd == true) return;

    let currNum = "";
    for (let i=0; i<5; i++) {
        currNum += board[currAttempt.attempt][i]
    };
    console.log("currNum",{currNum})
    console.log("correctNum",{correctNum})
    if (currNum== correctNum) {
        winGame()
        return ;
        
    };
    if (currAttempt.attempt === 7) {
        setGameEnd({is_win:false, gameEnd:true})
        setOutUserStats({ wins: outuserstats.wins, total: outuserstats.total +1})
        updateStats()
        return;
    }
    setCurrAttempt({attempt: currAttempt.attempt +1, char:0})
  }

  const onDelete=()=>{
    if (currAttempt.char ===0) return;
    const updatedBoard= [...board];
    updatedBoard[currAttempt.attempt][currAttempt.char -1]="";
    setBoard(updatedBoard);
    setCurrAttempt({...currAttempt, char: currAttempt.char -1});
  }

  const onSelectNum=(key)=> {
    if (currAttempt.char>4) return;
    const updatedBoard = [...board];
    updatedBoard[currAttempt.attempt][currAttempt.char]=key;
    setBoard(updatedBoard);
    setCurrAttempt({
        attempt:currAttempt.attempt,
        char: currAttempt.char +1,
    });
  }

   return (
    <>
      <SiteNav />
      <ToastContainer />
      <div className="App">
      <AppContext.Provider value={{board,setBoard,currAttempt,setCurrAttempt,correctNum,onEnter,onDelete, gameEnd, onSelectNum, correctc, setCorrectc}}>
        <div>
            <Board />
            <NumBoard />
        </div>
      </AppContext.Provider>
      </div>
    </>
  );
}




