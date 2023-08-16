
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const StyledGrid = styled(Grid)( ({theme}) => ({

    backgroundColor:theme.palette.primary.main||'white',
    padding:'1rem',
    margin:'1rem',
    width:'95%' ,
}) )

export default StyledGrid;