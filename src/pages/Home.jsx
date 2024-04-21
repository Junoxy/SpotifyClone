import {Box, Button } from "@mui/material"


const Home = () => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            gap: 3
        }}>
            <img src="/TA-logo.png" alt="" style={{maxWidth:'50%', maxHeight:'50%'}}/>
            <Button size="large" variant="contained" href="https://regal-figolla-263060.netlify.app/">
                FlagApp
            </Button>
        </Box>
    )   
}

export default Home;