import styled from "@emotion/styled";
import { Box } from "@mui/material";

const styleBase = ({backgroundColor , color,theme}) => ({
    margin:'auto',
    backgroundColor:backgroundColor || 'white',
    color:color || theme.palette.primary.main,
    maxWidth:'50%',
    borderRadius:'1rem',
    display:'flex',
    flexDirection: 'column',
    alignItems:'center',
    padding:'2rem'
})

const  StyledForm = styled(Box)( styleBase )
const  StyledBox = styled(StyledForm) ({
    
    maxWidth:'80%',
    padding:'1rem' ,
    boxSizing:'border-box',
    '& > * + *' :{
        width:'80%',
        marginTop:'2rem'
    }
})

export {StyledBox};

export default StyledForm;