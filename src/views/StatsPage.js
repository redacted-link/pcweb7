import { useEffect, useState, createContext } from "react";
import {collection, getDoc,updateDoc, doc} from "firebase/firestore";
import {db,auth} from "../firebase";
import { useNavigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import React  from "react";
import SiteNav from "../templates/SiteNav";


export default function StatsPage() {
    const [user,loading] = useAuthState(auth);
    const navigate= useNavigate();
    const [stats,setStats]= useState();


    async function getUser(useremail) {
        console.log(useremail)
        const query= await getDoc(doc(db,"userstats", useremail));
        console.log(query)
        const stats = query.data()
        console.log(stats)
        setStats(stats);
    }

    
    function StatsDisplay() {
        const winrate= (stats.wins/stats.total)*100 
        return (
            <div>
                <p>Your wins:{stats.wins}</p>
                <p>Total games played:{stats.total}</p>
                <p>Win rate: {winrate}%</p>
            </div>
        )
    }

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/login");
        getUser(user.email);
        }, [navigate, user, loading]);

    return (
        <>
            <SiteNav />
            <h1>Your statistics</h1>
            <StatsDisplay /> 
        </>
    )
}
