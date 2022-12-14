import Grid from "@mui/material/Grid";
import { gridWrapperStyles } from "./styles/gridWrapperStyles";

const GridWrapper = ({ children }) => {
  return (
    <Grid item xs={12} sx={gridWrapperStyles}>
      {children}
    </Grid>
  );
};
export default GridWrapper;
