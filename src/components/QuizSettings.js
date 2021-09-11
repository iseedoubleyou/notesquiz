// Author: Christian Wilhelmi

import React from "react";
import { notesOctaveReservoir, notesAccidentalReservoir } from "./NotesCollection";
import {Grid, Typography} from "@material-ui/core";

const octavesDescription = [
  {rangeNum: -1, rangeDescription: ["Great (from cello C to cello B)", "Große Oktave (von C bis H)"]},
  {rangeNum: 0, rangeDescription: ["Small (from viola C to viola B", "Kleine Oktave (von c bis h)"]},
  {rangeNum: 1, rangeDescription: ["One-lined (from middle C to middle B)","Eingestrichene Oktave (von c' bis h')"]},
  {rangeNum: 2, rangeDescription: ["Two-lined (from treble C to treble B)","Zweigestrichene Oktave (von c'' bis h'')"]},
];

export default function QuizSettings(props) {
    let clefs = [].concat(props.clefs);
    let octaves = [].concat(props.octaves);
    let accidentals = [].concat(props.accidentals);
    let clefCheckboxes = [["bass","Bassschlüssel"],["violin","Violinschlüssel"]].map(c => 
        <>

            <Grid item xs="1">
                <input 
                    type="checkbox"
                    data-category="clef"
                    name={c[0]} 
                    checked={clefs.some(clef => clef === c[0])}
                    onChange={props.settingsChangeHandler} />            
            </Grid>
            <Grid item xs="11">
                <Typography variant="body2">
                    {c[1]}           
                </Typography>
            </Grid>
        </>
    );
    let octaveCheckboxes = notesOctaveReservoir.map(o =>
        <>
            <Grid item xs="1">
                <input 
                    type="checkbox"
                    data-category="octave"
                    name={o}
                    checked={octaves.some(octave => octave === o)}
                    onChange={props.settingsChangeHandler} />
            </Grid>
            <Grid item xs="11">
                <Typography variant="body2">
                    {octavesDescription.filter(d => o === d.rangeNum)[0].rangeDescription[1]}
                </Typography>
            </Grid>
        </>
    );
    let accidentalCheckboxes = notesAccidentalReservoir.map(a =>
        <>
            <Grid item xs="1">
                <input 
                    type="checkbox"
                    data-category="accidental"
                    name={a[0]}
                    checked={accidentals.some(accidental => accidental === a[0])}
                    onChange={props.settingsChangeHandler} />
            </Grid>
            <Grid item xs="11">
                <Typography variant="body2">
                    {a[1]}
                </Typography>
            </Grid>
        </>
    );

    return (
        <>
            <Grid container>
                <Grid item xs="12">
                    <Typography variant="body2" color="secondary">
                        {props.errorMessage? props.errorMessage : null}
                    </Typography> 
                </Grid>
                <Grid item xs="12">
                    <Typography variant="overline">
                        Notenschlüssel
                    </Typography>               
                </Grid>
                        {clefCheckboxes}
        
                <Grid item xs="12">
                    <Typography variant="overline">
                        Oktavbereiche
                    </Typography>               
                </Grid>
                        {octaveCheckboxes}
           
                <Grid item xs="12">
                    <Typography variant="overline">
                        Vorzeichen
                    </Typography>               
                </Grid>
                        {accidentalCheckboxes}
            
            </Grid>
        </>
    );
}
