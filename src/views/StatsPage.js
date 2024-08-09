import { useEffect, useState, createContext, useContext } from "react";
import {collection, getDoc,updateDoc, doc} from "firebase/firestore";
import {db,auth} from "../firebase";
import { useNavigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import React  from "react";
import SiteNav from "../templates/SiteNav";
import { AppContext } from "./GamePage";

export default function StatsPage() {
    const [user,loading] = useAuthState(auth);
    const navigate= useNavigate();
    const [outstats,setoutStats]= useState({wins: 0, total:0})
    
    // async function getUser(useremail) {
        //     console.log(useremail)
        //     // const query= await getDoc(doc(db,"userstats", useremail));
        //     // const stats = await query.data()
        //     await console.log(stats)
        //     await setStats(stats);
        // }
        
        async function getUser(useremail) {
            console.log(useremail)
            const query= await getDoc(doc(db,"userstats", useremail));
            const stats = await query.data()
            await console.log(stats)
            await console.log(stats.wins)
            await console.log(stats.total)
            await setoutStats({ wins: stats.wins, total: stats.total})
            console.log(outstats)
            return stats;
        }
        
        //for this to work, must comment out all html components until get normal page, then uncomment to show
        
        function StatsDisplay() {
            const winrate= (outstats.wins/outstats.total)*100 
            return (
                <div>
                <p>Your wins:{outstats.wins}</p>
                <p>Total games played:{outstats.total}</p>
                <p>Win rate: {winrate}%</p>
            </div>
        )
    }
    
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        getUser(user.email);
        }, [navigate, user, loading],getUser);

    return (
        <>
            <SiteNav />
            <h1>Your statistics</h1>
            <StatsDisplay /> 
        </>
    )
}
