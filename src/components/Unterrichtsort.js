import React from "react";
import {Typography, useMediaQuery} from "@material-ui/core"
import {useTheme} from '@material-ui/core/styles';

const Unterrichtsort = () => {

  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Typography variant="h6">
        Unterrichtsort
      </Typography>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18052.73955922484!2d10.147055525590796!3d53.658696306408785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b220869239c2fd%3A0xf20f3ac890e6aaa2!2sVolksdorfer%20Damm%2060%2C%2022359%20Hamburg%2C%20Deutschland!5e1!3m2!1sde!2sch!4v1628965413957!5m2!1sde!2sch" 
        width={isNarrow? "400" : "800"}
        height={isNarrow? "300" : "600"}
        allowfullscreen="" 
        loading="lazy">
      </iframe>
    </div>);
};

export default Unterrichtsort;


