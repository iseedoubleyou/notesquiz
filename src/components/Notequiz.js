import React from "react";
import Note from "./Note";
import Keyboard from "./Keyboard";
import ces_bass from "./img/ces_bass.gif";

/* Backlog:
// Präsentation von Notensymbolen
// Entgegennahme der Inputs auf Klaviatur
// Rückmeldung, ob gewählte Taste korrekt, 
   - wenn korrekt: Taste grün
   - wenn nicht korrekt: Taste rot, korrekte Taste grün
// Ergänzung um Intervallübung
// Timer (z.B. 1min)
// Speicherung der Werte in Score-Tabelle, Hall of Fame
// Übrprotokoll für Schüler
// Fingersatz-Übungen
// Walhmöglichkeit Bass- / ViolinSchlüssel
// Bilder nicht bei Klick vom Server laden, sondern im Browser cachen
//
*/

export default function Notequiz() {
    
    const [note, setNote] = React.useState(); //{noteImageUrl: ces_bass, noteName: "c_flat", noteClef: "bass", noteKey: "b"});
    const [counter0, setCounter0] = React.useState(0);
    const [counter1, setCounter1] = React.useState(0);

    let showCorrect = "";
    let showWrong  = "";

    function registerNoteLoad(newNote) {
        if (newNote === note) {
            setTimeout(1000);
        } else {
            setNote(newNote);
        }
    }

    function registerKeyPlay(keyPressed) {  
        if (note) {
            showCorrect = note.noteKey;
            if (keyPressed.target.id === note.noteKey) {
                setCounter1(counter1 + 1)    
            } else {
                setCounter0(counter0 + 1)
                showWrong = keyPressed.target.id;
            }
        }
    }
    
    return (
        <>
            <div>
                <Note definedNote={showCorrect? note : {}} onLoadHandler={registerNoteLoad} />
            </div>
            <div>
                <Keyboard correctNote={showCorrect} wrongNote={showWrong} onClickHandler={registerKeyPlay} />
            </div>
            <p>Correct: {counter1}</p>
            <p>Wrong: {counter0}</p> 
        </>
    );
}