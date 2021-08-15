// Author: Christian Wilhelmi

export const notesOctaveReservoir = [2, 1, 0, -1]; // noteOctaves determined by c' belonging to octave 1
export const notesBaseReservoir = ["c", "d", "e", "f", "g", "a", "b"];
export const notesAccidentalReservoir = [["unsigned","ohne Vorzeichen"], ["flat", "Bes"], ["sharp","Kreuze"]];
const notesCollection = [];

for (let octave of notesOctaveReservoir.filter(o => [1,2].includes(o))) {
    for (let base of notesBaseReservoir) {
        for (let accidental of notesAccidentalReservoir) {
            notesCollection.push ({
                noteClef: "violin",
                noteOctave: octave,
                noteBase: base,
                noteAccidental: accidental[0]
            });
        }
    }
}
for (let octave of notesOctaveReservoir.filter(o => o === 0)) {
    for (let base of notesBaseReservoir.filter(n => ["g", "a", "b"].includes(n))) {
        for (let accidental of notesAccidentalReservoir) {
            notesCollection.push ({
                noteClef: "violin",
                noteOctave: octave,
                noteBase: base,
                noteAccidental: accidental[0]
            });
        }
    }
}
for (let octave of notesOctaveReservoir.filter(o => [-1,0].includes(o))) {
    for (let base of notesBaseReservoir) {
        for (let accidental of notesAccidentalReservoir) {
            notesCollection.push ({
                noteClef: "bass",
                noteOctave: octave,
                noteBase: base,
                noteAccidental: accidental[0]
            });
        }
    }
}
for (let octave of notesOctaveReservoir.filter(o => o === 1)) {
    for (let base of notesBaseReservoir.filter(n => ["c", "d", "e", "f", "g", "a"].includes(n))) {
        for (let accidental of notesAccidentalReservoir) {
            notesCollection.push ({
                noteClef: "bass",
                noteOctave: octave,
                noteBase: base,
                noteAccidental: accidental[0]
            });
        }
    }
}

export default notesCollection;