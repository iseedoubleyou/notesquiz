import React from "react";
import {Grid, Link, Typography, useMediaQuery} from "@material-ui/core"
import {useTheme} from '@material-ui/core/styles';

/* Offene Punkte
- Anbindung HVV und Hinweis au Haltestelle Frankring
--> https://www.hvv.de/de/fahrplaene/abruf-fahrplaninfos/fahrplanauskunft-webseite/webservice-schnittstelle
*/

const KontaktUndAnfahrt = () => {

  const theme = useTheme();
  const isVeryNarrow = useMediaQuery(theme.breakpoints.down("xs"));
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  const part1 = "katharina";
  const dot1 = ".";
  const part2 = "wilhelmi";
  const at1 = "@";
  const part3 = "gmx";
  const dot2 = ".";
  const part4 = "de";
  const href1 = "mailto:"+part1+dot1+part2+at1+part3+dot2+part4;

  return (
    <>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center" style={{ padding: "1%" }}>
        <Grid item xs="12">
          <Typography variant="h6">
            Anschrift
          </Typography>
          <Typography variant="body1">
            Klavierschule Volksdorf<br/>
            Katharina Wilhelmi<br/>
            Volksdorfer Damm 62<br/>
            22359 Hamburg<br/>
            <Link href={href1}>{part1+dot1+part2+at1+part3+dot2+part4}</Link><br/>
            +49 40 6453 98 62
          </Typography>
          <p/>
        </Grid>
        <Grid item xs="12">
          <Typography variant="h6">
            Anfahrt
          </Typography>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18052.73955922484!2d10.147055525590796!3d53.658696306408785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b220869239c2fd%3A0xf20f3ac890e6aaa2!2sVolksdorfer%20Damm%2060%2C%2022359%20Hamburg%2C%20Deutschland!5e1!3m2!1sde!2sch!4v1628965413957!5m2!1sde!2sch" 
            width={isMedium? (isNarrow? (isVeryNarrow? "280" : "400") : "600") : "800"}
            height={isMedium? (isNarrow? (isVeryNarrow? "210" : "300") : "450") : "600"}
            allowfullscreen="" 
            loading="lazy">
          </iframe>
        </Grid>
      </Grid>
    </>
  );
};

export default KontaktUndAnfahrt;

