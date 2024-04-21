import { Route,Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "../../pages/Home";
import Login from "../../pages/Login";

const Dashboard = ( {spotifyAPI} ) => {
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
                    <Routes>
                        <Route path="/playlist/:id" element={<div>Playlist</div>}/>
                        <Route path="/library" element={<div>Library</div>}/>
                        <Route path='/' element={<Home/>}/>
                    </Routes>
                </Box>
           </Box>
    
}

export default Dashboard;