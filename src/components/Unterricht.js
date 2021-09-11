import React from "react";
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery} from "@material-ui/core";
import {useTheme} from '@material-ui/core/styles';
import josefin from '../media/Josefin.jpg';

const Unterricht = () => {
 
  const theme = useTheme();
  const isVeryNarrow = useMediaQuery(theme.breakpoints.down("xs"));
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center" style={{ padding: "1%" }}>
        <Grid item xs={isVeryNarrow? "12" : "6"}>
          <img src={josefin} alt="Unterrichtsraum" width={isMedium? (isVeryNarrow? "280" : "400") : "480"}/>
        </Grid>
        <Grid item xs={isNarrow? "12" : "6"}>
          <Typography variant="h6">
            Unterrichtsraum
          </Typography>
          <Typography variant="body1">
            Der Unterricht findet in einem schönen Musikzimmer statt
          </Typography>
          <p/>
        </Grid>
        <Grid item xs={isVeryNarrow? "12" : "6"}>
          <img src={josefin} alt="Instrumente" width={isMedium? (isVeryNarrow? "280" : "400") : "480"}/>
        </Grid>
        <Grid item xs={isNarrow? "12" : "6"}>
          <Typography variant="h6">
            Instrumente
          </Typography>
          <Typography variant="body1">
            Für den Unterricht stehen verschiedene Instrumente zur Verfügung. Im Mittelpunkt steht ein Flügel, an dem hauptsächlich unterrichtet wird.
          </Typography>
          <p/>
        </Grid>
        <Grid item xs={isVeryNarrow? "12" : "6"}>
          <Typography variant="h6">
            Preise
          </Typography>
          <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width="50%" align="left" style={{padding: "1%"}}>
                          <Typography variant="body1" style={{verticalAlign: "middle"}}>
                            Unterrichtsdauer
                          </Typography>
                        </TableCell>
                        <TableCell width="50%" align="right" style={{padding: "1%"}}>
                          <Typography variant="body1" style={{verticalAlign: "middle"}}>
                            Preis
                          </Typography>    
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell width="50%" align="left" style={{padding: "1%"}}>
                            <Typography variant="body1" style={{verticalAlign: "middle"}}>
                                30min / Schulwoche
                            </Typography>
                        </TableCell>
                        <TableCell width="50%" align="right" style={{padding: "1%"}}>
                            <Typography variant="body1" style={{verticalAlign: "middle"}}>
                                EUR 78,-
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell width="50%" align="left" style={{padding: "1%"}}>
                            <Typography variant="body1" style={{verticalAlign: "middle"}}>
                                45min / Schulwoche
                            </Typography>
                        </TableCell>
                        <TableCell width="50%" align="right" style={{padding: "1%"}}>
                            <Typography variant="body1" style={{verticalAlign: "middle"}}>
                                EUR 95,-
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
          </TableContainer>
            <p/>
          <Typography variant="body1">
            Alle Preise gelten pro Monat und Kind. Preise für Gruppenunterricht in Absprache.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Unterricht;