// Author: Christian Wilhelmi

import React from "react";
import NotesScore from "./NotesScore";
import Keyboard from "./Keyboard";
import QuizSettings from "./QuizSettings";
import notesCollection, {notesOctaveReservoir, notesAccidentalReservoir} from "./NotesCollection";
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery} from "@material-ui/core";
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SettingsIcon from '@material-ui/icons/Settings';
import {useTheme} from '@material-ui/core/styles';

/* Backlog:
// Ergänzung um Intervallübung
// Timer / Countdown (z.B. 1min)
// Speicherung der Werte in Score-Tabelle, Hall of Fame
// Übeprotokoll für Schüler
// Fingersatz-Übungen
// Walhmöglichkeit Bass- / ViolinSchlüssel
// Möglichkeit zur Rückabwicklung des Quiz, damit sich Schüler nochmals seine Eingaben und die Fehler anschauen kann
// Variante "Flötenquiz"
// Fehlerbehandlungen mit aussagekräftigen Fehlermeldungen einfügen
// Layoutgesstaltung via CSS
// Backlogübersicht
// Option zur Notennamenanzeige (auf Tasten und/oder einfach als Kacheln)
*/

export default function NotesQuiz() {

    const mapKeyNotes = [
        {keyboardKey: 1, notes: [{noteBase: "b", noteAccidental: "sharp"}, {noteBase: "c", noteAccidental: "unsigned"}]},
        {keyboardKey: 2, notes: [{noteBase: "c", noteAccidental: "sharp"}, {noteBase: "d", noteAccidental: "flat"}]},
        {keyboardKey: 3, notes: [{noteBase: "d", noteAccidental: "unsigned"}]},
        {keyboardKey: 4, notes: [{noteBase: "d", noteAccidental: "sharp"}, {noteBase: "e", noteAccidental: "flat"}]},
        {keyboardKey: 5, notes: [{noteBase: "e", noteAccidental: "unsigned"}, {noteBase: "f", noteAccidental: "flat"}]},
        {keyboardKey: 6, notes: [{noteBase: "e", noteAccidental: "sharp"}, {noteBase: "f", noteAccidental: "unsigned"}]},
        {keyboardKey: 7, notes: [{noteBase: "f", noteAccidental: "sharp"}, {noteBase: "g", noteAccidental: "flat"}]},
        {keyboardKey: 8, notes: [{noteBase: "g", noteAccidental: "unsigned"}]},
        {keyboardKey: 9, notes: [{noteBase: "g", noteAccidental: "sharp"}, {noteBase: "a", noteAccidental: "flat"}]},        
        {keyboardKey: 10, notes: [{noteBase: "a", noteAccidental: "unsigned"}]},
        {keyboardKey: 11, notes: [{noteBase: "a", noteAccidental: "sharp"}, {noteBase: "b", noteAccidental: "flat"}]},
        {keyboardKey: 12, notes: [{noteBase: "b", noteAccidental: "unsigned"}, {noteBase: "c", noteAccidental: "flat"}]}
    ]

    let initialNoteState = notesCollection[Math.floor(Math.random() * notesCollection.length)];
    let initialKeyState = mapKeyNotes.filter(m => m.notes.some(n => n.noteBase === initialNoteState.noteBase && n.noteAccidental === initialNoteState.noteAccidental))[0].keyboardKey;

    const [noteAndKey, setNoteAndKey] = React.useState([initialNoteState, initialKeyState]);
    const [counter0, setCounter0] = React.useState(0);
    const [counter1, setCounter1] = React.useState(0);
    const [evaluate, setEvaluate] = React.useState(true);
    const [instructionText, setInstructionText] = React.useState(<br />);
    const [wrongKey, setWrongKey] = React.useState(0);
    const [showSettings, setShowSettings] = React.useState(false);
    const [clefsSelected, setClefsSelected] = React.useState(["bass", "violin"]);
    const [accidentalsSelected, setAccidentalsSelected] = React.useState(notesAccidentalReservoir.map(a => a[0]));
    const [octavesSelected, setOctavesSelected] = React.useState(notesOctaveReservoir);
    const [errorMessage, setErrorMessage] = React.useState("");

    const theme = useTheme();
    const isVeryNarrow = useMediaQuery(theme.breakpoints.down("xs"));
    const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));

    function registerSettingsClick() {
        setShowSettings(!showSettings)
    }
        
    function registerSettingsChange(setting) {
        setErrorMessage("");
        switch(setting.target.getAttribute('data-category')) {
            case "clef" : {
                if(setting.target.checked) {
                    let newClefSelection = [].concat(clefsSelected).concat(setting.target.name);
                    setClefsSelected(newClefSelection);
                } else {
                    let newClefSelection = clefsSelected.filter(c => c !==  setting.target.name);
                    if (checkNotesCollectionCompatibility({clefs: newClefSelection})) {    
                        setClefsSelected(newClefSelection);
                        if (!checkCurrentNoteCompatibility({clefs: newClefSelection})) {   
                            selectNewNote({clefs: newClefSelection});
                        }                 
                    } else {
                        setErrorMessage("Die Auswahl konnte nicht angepasst werden. Bitte sicherstellen, dass die Kombination von Notenschlüsseln und Oktavbereichen sinnvoll ist.");
                    }
                }
                break;
            }
            case "octave" : {
                if(setting.target.checked) {
                    let newOctaveSelection = [].concat(octavesSelected).concat(parseInt(setting.target.name));
                    setOctavesSelected(newOctaveSelection);
                } else {
                    let newOctaveSelection = octavesSelected.filter(o => o != setting.target.name);
                    if (checkNotesCollectionCompatibility({octaves: newOctaveSelection})) {
                        setOctavesSelected(newOctaveSelection);
                        if(!checkCurrentNoteCompatibility({octaves: newOctaveSelection})) {
                            selectNewNote({octaves: newOctaveSelection});
                        }
                    } else {
                        setErrorMessage("Die Auswahl konnte nicht angepasst werden. Bitte sicherstellen, dass die Kombination von Notenschlüsseln und Oktavbereichen sinnvoll ist.");
                    }
                }
                break;
            }
            case "accidental" : {
                if(setting.target.checked) {
                    let newAccidentalSelection = [].concat(accidentalsSelected).concat(setting.target.name);
                    setAccidentalsSelected(newAccidentalSelection);
                } else {
                    let newAccidentalSelection = accidentalsSelected.filter(a => a !==  setting.target.name);
                    if (checkNotesCollectionCompatibility({accidentals: newAccidentalSelection})) {
                        setAccidentalsSelected(newAccidentalSelection);
                        if(!checkCurrentNoteCompatibility({accidentals: newAccidentalSelection})) {
                            selectNewNote({accidentals: newAccidentalSelection});
                        }
                        
                    } else {
                        setErrorMessage("Die Auswahl konnte nicht angepasst werden. Bitte mindestens einen Vorzeichentypen auswählen.");
                    }
                }
            }      
        }
    }

    function checkNotesCollectionCompatibility({clefs = clefsSelected, octaves = octavesSelected, accidentals = accidentalsSelected} = {}) {
        return (
            notesCollection.some(n => (
                clefs.indexOf(n.noteClef) !== -1 && 
                octaves.indexOf(n.noteOctave) !== -1 && 
                accidentals.indexOf(n.noteAccidental) !== -1 
            ))
        );
    }

    function checkCurrentNoteCompatibility({clefs = clefsSelected, octaves = octavesSelected, accidentals = accidentalsSelected} = {}) {
        return([].concat(clefs).some(c => c === noteAndKey[0].noteClef) && [].concat(octaves).some(o => o === noteAndKey[0].noteOctave) && [].concat(accidentals).some(a => a === noteAndKey[0].noteAccidental));
    }

    function selectNewNote({clefs = clefsSelected, octaves = octavesSelected, accidentals = accidentalsSelected} = {}) {
        let validNotesCollection = notesCollection.filter(n => [].concat(clefs).some(c => c === n.noteClef) && [].concat(octaves).some(o => o === n.noteOctave) && [].concat(accidentals).some(a => a === n.noteAccidental));
        let nextNoteState = validNotesCollection[Math.floor(Math.random() * validNotesCollection.length)];
        let nextKeyState = mapKeyNotes.filter(m => m.notes.some(n => n.noteBase === nextNoteState.noteBase && n.noteAccidental === nextNoteState.noteAccidental))[0].keyboardKey;
        setNoteAndKey([nextNoteState, nextKeyState]);           
        setWrongKey(() => 0);
        setInstructionText(<br />);
    }

    function registerKeyPlay(keyPressed) {  
        if (evaluate) {          
            if (keyPressed.target.id == noteAndKey[1]) {
                setCounter1(counter1 + 1); 
                setWrongKey(() => 0);   
            } else {
                setCounter0(counter0 + 1);
                setWrongKey(() => keyPressed.target.id);
            }
            setInstructionText('Für nächste Note bitte eine Taste drücken');
        } else {
            selectNewNote();
        }
        setEvaluate(e => !e);
    }

    let percentage = (counter0 || counter1)? Math.round(100*counter1 / (counter0 + counter1)) : 'N/A';

    let quizContent = 
        <>
            <Grid item xs={isVeryNarrow? "0" : "2"}/>
            <Grid item xs={isVeryNarrow? "12" : "8"}>
                <Grid container>
                    <Grid item xs="12">
                        <NotesScore definedNote={noteAndKey[0]} />
                    </Grid>
                    <Grid item xs="12">
                        <Keyboard correctKey={evaluate ? 0 : noteAndKey[1]} wrongKey={evaluate ? 0: wrongKey} onClickHandler={registerKeyPlay} />
                    </Grid>
                    <Grid item xs="12" align="center">
                        <Typography variant="body2">
                            {instructionText}
                        </Typography>
                    </Grid>
                    <Grid item xs="12" align="center">
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="33%" align="center" style={{backgroundColor: "#E2F0D9", padding: "1%"}}>
                                            <SentimentSatisfiedAltIcon style={{verticalAlign: "middle"}}/> 
                                        </TableCell>
                                        <TableCell width="33%" align="center" style={{backgroundColor: "#FFC3C3", padding: "1%"}}>
                                            <SentimentVeryDissatisfiedIcon style={{verticalAlign: "middle"}}/>
                                        </TableCell>
                                        <TableCell width="34%" align="center" style={{backgroundColor: "#F2F4F4", padding: "1%"}}> 
                                            <Typography variant="h6">
                                                %
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width="33%" align="center" style={{padding: "0%"}}>
                                            <Typography variant="subtitle2" style={{verticalAlign: "middle"}}>
                                                {counter1}
                                            </Typography>
                                        </TableCell>
                                        <TableCell width="33%" align="center" style={{padding: "0%"}}>
                                            <Typography variant="subtitle2" style={{verticalAlign: "middle"}}>
                                                {counter0}
                                            </Typography>
                                        </TableCell>
                                        <TableCell width="34%" align="center" stype={{padding: "0%"}}>
                                            <Typography variant="subtitle2" style={{verticalAlign: "middle"}}>
                                                {percentage}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs="12" align="right">
                        <p/>
                        <SettingsIcon onClick={registerSettingsClick}/>
                    </Grid>
                    <Grid item xs="12" align="left">
                        {showSettings ? <QuizSettings errorMessage={errorMessage} clefs={clefsSelected} octaves={octavesSelected} accidentals={accidentalsSelected} settingsChangeHandler={registerSettingsChange} /> : ""}
                    </Grid>                      
                </Grid>
            </Grid>
            <Grid item xs={isVeryNarrow? "0" : "2"}/>
        </>;

    return (   
        <>
            {isNarrow ? (
                <Grid container spacing={0} justifyContent="space-between" alignItems="center" style={{ padding: "1%" }}>
                    {quizContent}
                </Grid>) : (
                <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                    <Grid item xs="3" />
                    <Grid item xs="6">
                        <Grid container>
                            {quizContent}
                        </Grid>
                    </Grid>
                    <Grid item xs="3" />
                </Grid>
            )}
        </>
    )
}