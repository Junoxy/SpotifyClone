import {Box, Button } from "@mui/material"


const Home = () => {
    const contactMe = () => {
        window.open('mailto:junjun.privated@gmail.com', '_blank');
    }
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
            <img src="/swaglordNoBG.png" alt="" style={{maxWidth:'50%', maxHeight:'50%'}}/>
            <Button size="large" variant="contained" onClick={() => contactMe()}>
                Contact Me
            </Button>
        </Box>
    )   
}

export default Home;