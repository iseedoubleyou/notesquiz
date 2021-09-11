import React from "react";
import {Grid, Link, Typography, useMediaQuery} from "@material-ui/core";
import {useTheme} from '@material-ui/core/styles';
import josefin from '../media/Josefin.jpg';

const Portrait = () => {

  const theme = useTheme();
  const isVeryNarrow = useMediaQuery(theme.breakpoints.down("xs"));
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center" style={{ padding: "1%" }}>
        <Grid item xs={isVeryNarrow? "12" : "6"}>
          <img src={josefin} alt="Josefin Luisa" width={isMedium? (isVeryNarrow? "280" : "400") : "480"}/>
        </Grid>
        <Grid item xs={isNarrow? "12" : "6"}>
          <Typography variant="body1" style={{fontStyle: "italic"}}>
            <p>
            Mein Name ist Katharina Wilhelmi, und ich unterrichte mit Leidenschaft Klavier. 
            Dies tue ich für Kinder, Jugendliche und Erwachsene aller Leistungsstufen.
            </p>
            <p>
            Ich bin diplomierte Klavierlehrerin und unterrichte seit über zwanzig Jahren. 
            Meine Ausbildung habe ich am 
            <Link href="https://hamburger-konservatorium.de/"> Hamburger Konservatorium </Link>
            bei Prof. Eliza Hansen, Prof. Mathias Weber und Gundel Deckert absolviert und an der 
            <Link href="https://www.hfmt-hamburg.de/start/"> Hochschule für Musik und Theater Hamburg </Link> im Jahr 2004
            mit der Note "sehr gut" abgeschlossen.
            </p>
            <p>
            Ich bin überzeugt, dass Musik jeden Menschen bereichern kann. Dies gilt umso mehr, wenn man selbst aktiv musizieren kann.
            Gerade deshalb bereitet es mir grosse Freude, andere Menschen an die Musik und das Klavierspiel heranzuführen oder ihre Fähigkeiten dafür weiterzuentwickeln.                     
            </p>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Portrait;