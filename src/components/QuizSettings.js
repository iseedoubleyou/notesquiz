// Author: Christian Wilhelmi

import React from "react";
import  { notesOctaveReservoir, notesAccidentalReservoir } from "./NotesCollection";

const octavesDescription = [
  {rangeNum: -1, rangeDescription: "Great (from cello C to cello B)"},
  {rangeNum: 0, rangeDescription: "Small (from viola C to viola B"},
  {rangeNum: 1, rangeDescription: "One-lined (from middle C to middle B)"},
  {rangeNum: 2, rangeDescription: "Two-lined (from treble C to treble B)"},
];

export default function QuizSettings(props) {
    let clefs = [].concat(props.clefs);
    let octaves = [].concat(props.octaves);
    let accidentals = [].concat(props.accidentals);
    let clefCheckboxes = ["bass","violin"].map(c => 
      <tr>
          <td style={{height:'10px', width:'10px'}}>
              <input 
                  type="checkbox"
                  style={{transform: "scale(0.75)"}}
                  data-category="clef"
                  name={c} 
                  checked={clefs.some(clef => clef === c)}
                  onChange={props.settingsChangeHandler} />
          </td>
          <td style={{height:'10px', width:'110px'}}>
              {c}
          </td>
      </tr>
    );
    let octaveCheckboxes = notesOctaveReservoir.map(o =>
      <tr>
          <td style={{height:'10px', width:'10px'}}>
              <input 
                  type="checkbox"
                  style={{transform: "scale(0.75)"}}
                  data-category="octave"
                  name={o}
                  checked={octaves.some(octave => octave === o)}
                  onChange={props.settingsChangeHandler} />
          </td>
          <td style={{height:'10px', width:'110px'}}>
              {octavesDescription.filter(d => o === d.rangeNum)[0].rangeDescription}
          </td>
      </tr>
    );
    let accidentalCheckboxes = notesAccidentalReservoir.map(a =>
        <tr>
            <td style={{height:'10px', width:'10px'}}>
                <input 
                    type="checkbox"
                    style={{transform: "scale(0.75)"}}
                    data-category="accidental"
                    name={a}
                    checked={accidentals.some(accidental => accidental === a)}
                    onChange={props.settingsChangeHandler} />
            </td>
            <td style={{height:'10px', width:'110px'}}>
                {a}
            </td>
        </tr>
    );

    return (
        <div>
            <table style={{textAlign: 'left', paddingTop : '0px', paddingBottom : '0px', fontSize: '6pt', fontWeight: 'normal', verticalAlign: 'middle'}} width = '122px'>
                <thead>
                {props.errorMessage? <tr><th colSpan={2} style={{color: 'red', fontWeight: 'normal',}}>{props.errorMessage}</th></tr> : null}
                    <tr>
                        <th colSpan={2}>Clefs</th>
                    </tr>
                </thead>
                <tbody>
                    {clefCheckboxes}
                </tbody>
            </table>
            <table style={{textAlign: 'left', paddingTop : '0px', paddingBottom : '0px', fontSize: '6pt', fontWeight: 'normal', verticalAlign: 'middle'}} width = '122px'>
                <thead>
                    <tr>
                        <th colSpan={2}>Octaves</th>
                    </tr>
                </thead>
                <tbody>
                    {octaveCheckboxes} 
                </tbody>
            </table>
            <table style={{textAlign: 'left', paddingTop : '0px', paddingBottom : '0px', fontSize: '6pt', fontWeight: 'normal', verticalAlign: 'middle'}} width = '122px'>
                <thead>
                    <tr>
                        <th colSpan={2}>Accidentals</th>
                    </tr>
                </thead>
                <tbody>
                    {accidentalCheckboxes}
                </tbody>
            </table>
        </div>
        );
}
