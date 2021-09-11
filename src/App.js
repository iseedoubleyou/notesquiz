import React from "react";
import "./styles.css";
import Header from "./components/Header";
import KontaktUndAnfahrt from "./components/KontaktUndAnfahrt";
import Notenquiz from "./components/NotenQuiz";
import Portrait from "./components/Portrait";
import Unterricht from "./components/Unterricht";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Container maxWidth="lg">
        <Header />
        <Switch>
          <Route exact path="/Portrait" render={props => <Portrait {...props} />} />
          <Route exact path="/Unterricht" render={props => <Unterricht {...props} />} />
          <Route exact path="/KontaktUndAnfahrt" render={props => <KontaktUndAnfahrt {...props} />} />
          <Route exact path="/Notenquiz" render={props => <Notenquiz {...props} />} />
          <Route exact path="/" render={props => <Portrait {...props} />} />
        </Switch>
      </Container>
    </div>
  );
}