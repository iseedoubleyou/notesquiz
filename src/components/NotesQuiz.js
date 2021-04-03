// Author: Christian Wilhelmi

import React from "react";
import NotesScore from "./NotesScore";
import Keyboard from "./Keyboard";
import QuizSettings from "./QuizSettings";
import notesCollection, {notesOctaveReservoir, notesAccidentalReservoir} from "./NotesCollection";

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
    const [accidentalsSelected, setAccidentalsSelected] = React.useState(notesAccidentalReservoir);
    const [octavesSelected, setOctavesSelected] = React.useState(notesOctaveReservoir);
    const [errorMessage, setErrorMessage] = React.useState("");

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
                        setErrorMessage("Your selection could not be updated. Please ensure that the combination of selected clefs and octaves is reasonable.");
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
                        setErrorMessage("Your selection could not be updated. Please ensure that the combination of selected clefs and octaves is reasonable.");
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
                        setErrorMessage("Your selection could not be updated. You must select at least one accidental type.");
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
            setInstructionText('For next note press any key.');
        } else {
            selectNewNote();
        }
        setEvaluate(e => !e);
    }

    return (
        <>
            <div align = "center">
                <NotesScore definedNote={noteAndKey[0]} />
            </div>
            <div align = "center">
                <Keyboard correctKey={evaluate ? 0 : noteAndKey[1]} wrongKey={evaluate ? 0: wrongKey} onClickHandler={registerKeyPlay} />
                <div style={{fontSize: '6pt', fontWeight: 'normal'}}>{instructionText}</div>
            </div>
            <div align = "center">
                <p></p>
                <table width = '140px'>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center', 'fontSize': '8pt'}} width = '47px'>Correct</th>
                            <th style={{textAlign: 'center', 'fontSize': '8pt'}} width = '47px'>Wrong</th>
                            <th style={{textAlign: 'center', 'fontSize': '8pt'}} width = '46px'>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{textAlign: 'center', fontSize: '8pt', backgroundColor: '#E2F0D9'}}>{counter1}</td>
                            <td style={{textAlign: 'center', fontSize: '8pt', backgroundColor:'#FFC3C3'}}>{counter0}</td>
                            <td style={{textAlign: 'center', fontSize: '8pt', backgroundColor:'#F2F4F4'}}>{counter1 - counter0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p />
            <div align="center" style={{fontSize: '6pt', fontWeight: 'normal'}}>
                <table width = '140px' style={{fontSize: '6pt', fontWeight:'bold', backgroundColor:'white', paddingLeft:'0pt'}}>
                    <thead>
                        <tr onClick={registerSettingsClick} style={{backgroundColor:'#F2F4F4'}}>
                            <th style={{textAlign: 'center'}} width='5px'>                                
                                <label>{showSettings ? "– " : "+ "}</label>                                
                            </th>
                            <th style={{textAlign: 'left'}}>
                               <label>Settings</label>
                            </th>
                        </tr>
                        <tr>
                            <td />
                            <td>
                                {showSettings ? <QuizSettings errorMessage={errorMessage} clefs={clefsSelected} octaves={octavesSelected} accidentals={accidentalsSelected} settingsChangeHandler={registerSettingsChange} /> : ""}
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    );
}