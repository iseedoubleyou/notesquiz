import React from "react";
import NotesScore from "./NotesScore";
import Keyboard from "./Keyboard";
import notesCollection from "./NotesCollection";

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
// Option zur Notenanzeige (auf Tasten und/oder einfach als Kacheln)
*/

export default function NotesQuiz() {

    const mapKeyNotes = [
        {keyboardKey: 1, notes: [{noteBase: "b", noteAccidental: "sharp"}, {noteBase: "c", noteAccidental: ""}]},
        {keyboardKey: 2, notes: [{noteBase: "c", noteAccidental: "sharp"}, {noteBase: "d", noteAccidental: "flat"}]},
        {keyboardKey: 3, notes: [{noteBase: "d", noteAccidental: ""}]},
        {keyboardKey: 4, notes: [{noteBase: "d", noteAccidental: "sharp"}, {noteBase: "e", noteAccidental: "flat"}]},
        {keyboardKey: 5, notes: [{noteBase: "e", noteAccidental: ""}, {noteBase: "f", noteAccidental: "flat"}]},
        {keyboardKey: 6, notes: [{noteBase: "e", noteAccidental: "sharp"}, {noteBase: "f", noteAccidental: ""}]},
        {keyboardKey: 7, notes: [{noteBase: "f", noteAccidental: "sharp"}, {noteBase: "g", noteAccidental: "flat"}]},
        {keyboardKey: 8, notes: [{noteBase: "g", noteAccidental: ""}]},
        {keyboardKey: 9, notes: [{noteBase: "g", noteAccidental: "sharp"}, {noteBase: "a", noteAccidental: "flat"}]},        
        {keyboardKey: 10, notes: [{noteBase: "a", noteAccidental: ""}]},
        {keyboardKey: 11, notes: [{noteBase: "a", noteAccidental: "sharp"}, {noteBase: "b", noteAccidental: "flat"}]},
        {keyboardKey: 12, notes: [{noteBase: "b", noteAccidental: ""}, {noteBase: "c", noteAccidental: "flat"}]}
    ]

    let initialNoteState = notesCollection[Math.floor(Math.random() * notesCollection.length)];
    let initialKeyState = mapKeyNotes.filter(m => m.notes.some(n => n.noteBase === initialNoteState.noteBase && n.noteAccidental === initialNoteState.noteAccidental))[0].keyboardKey;

    const [noteAndKey, setNoteAndKey] = React.useState([initialNoteState, initialKeyState]);
    const [counter0, setCounter0] = React.useState(0);
    const [counter1, setCounter1] = React.useState(0);
    const [evaluate, setEvaluate] = React.useState(true);
    const [instructionText, setInstructionText] = React.useState("");
    const [wrongKey, setWrongKey] = React.useState(0);

    function registerKeyPlay(keyPressed) {  
        if (evaluate) {          
            if (keyPressed.target.id == noteAndKey[1]) {
                setCounter1(counter1 + 1); 
                setWrongKey(() => 0);   
            } else {
                setCounter0(counter0 + 1);
                setWrongKey(() => keyPressed.target.id);
            }
            setInstructionText('For next note press any key');
        } else {
            let nextNoteState = notesCollection[Math.floor(Math.random() * notesCollection.length)];
            let nextKeyState = mapKeyNotes.filter(m => m.notes.some(n => n.noteBase === nextNoteState.noteBase && n.noteAccidental === nextNoteState.noteAccidental))[0].keyboardKey;
            setNoteAndKey([nextNoteState, nextKeyState]);           
            setWrongKey(() => 0);
            setInstructionText(' ');
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
        </>
    );
}