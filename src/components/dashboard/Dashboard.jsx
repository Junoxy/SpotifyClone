import { Route,Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "../../pages/Home";
import SideNav from "../sideNav/SideNav";
import Playlist from "../../pages/Playlist";
import { getAccessTokenFromStorage } from "../../utils/getAccessTokenFromStorage";
import { useEffect, useState } from "react";
import Player from "../Player/Player";

const Dashboard = ( {spotifyAPI } ) => {
    const [token, setToken] = useState(getAccessTokenFromStorage())

    useEffect(() => {
        const onMount = async () => {
            await spotifyAPI.setAccessToken(token)
        }
        if(token) {
            onMount()
        }
    }, [])

    return <Box sx={{
        display:'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column'
    }}>
                <Box sx={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex'
                }}>
                    <SideNav spotifyAPI={spotifyAPI} token={token}/>
                    <Routes>
                        <Route path="/playlist/:id" element={<Playlist spotifyAPI={spotifyAPI} token={token}/>}/>
                        <Route path="/library" element={<div>Library</div>}/>
                        <Route path='/' element={<Home/>}/>
                    </Routes>
                </Box>
                {token && <Player spotifyAPI={spotifyAPI} token={token} />}
           </Box>
    
}

export default Dashboard;