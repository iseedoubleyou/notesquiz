import React from "react";
import "./styles.css";
import Unterricht from "./components/Unterricht";
import Preise from "./components/Preise";
import Klavierlehrerin from "./components/Klavierlehrerin";
import Notenquiz from "./components/NotesQuiz";
import Unterrichtsort from "./components/Unterrichtsort";
import Header from "./components/Header";
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
          <Route exact from="/Preise" render={props => <Preise {...props} />} />
          <Route exact path="/Unterricht" render={props => <Unterricht {...props} />} />
          <Route exact path="/Unterrichtsort" render={props => <Unterrichtsort {...props} />} />
          <Route exact path="/Klavierlehrerin" render={props => <Klavierlehrerin {...props} />} />
          <Route exact path="/Notenquiz" render={props => <Notenquiz {...props} />} />
          <Route exact path="/" render={props => <Unterricht {...props} />} />
        </Switch>
      </Container>
    </div>
  );
}