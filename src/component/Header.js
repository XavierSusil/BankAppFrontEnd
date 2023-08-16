
import { AppBar, Toolbar, Box } from "@mui/material";



const Header = ({ buttons, username }) => {

    const appBarStyle = {
        backgroundColor: 'white',
        color: 'black'
    };

    const toolBarLogin = {
        justifyContent: 'space-between'
    }

    const toolBarLogout = {
        justifyContent: 'flex-end'
    }

    return <>
        <AppBar style={appBarStyle}>
            <Toolbar style={username ? toolBarLogin : toolBarLogout}>
                <Box component='h3' sx={{
                    fontVariant: 'small-caps',
                    '&:hover': {
                        backgroundColor: 'ButtonFace'
                    }

                }} color="primary.dark">
                    {username}
                </Box>
                {buttons}
            </Toolbar>
        </AppBar>
    </>;
}

export default Header;