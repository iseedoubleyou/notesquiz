import React from "react";
import ces_bass from "./img/ces_bass.gif";
import cis1_violin from "./img/cis1_violin.gif";
import c1_violin from "./img/c1_violin.gif";

const notesCollection = [
    {noteImageUrl: ces_bass,
     noteName: "c_flat",
     noteClef: "bass",
     noteKey: "b"
    },
    {noteImageUrl: cis1_violin,
     noteName: "C_sharp1",
     noteClef: "violin",
     noteKey: "c_sharp"
    },
    {noteImageUrl: c1_violin,
     noteName: "C1",
     noteClef: "violin",
     noteKey: "c"
    }
];

export default function Note({definedNote, onLoadHandler}) {  
    let nextNote = {};
    if (Object.keys(definedNote).length === 0) {
        nextNote = notesCollection[Math.floor(Math.random() * notesCollection.length)];
    } else {
        nextNote = notesCollection.filter(n => n.noteName === definedNote.noteName);
    }
    return (
        <div>
            <img src={nextNote.noteImageUrl} id={JSON.stringify(nextNote)} alt={JSON.stringify(nextNote)} title={nextNote.noteName} onLoad={onLoadHandler} />
        </div>
    );
}