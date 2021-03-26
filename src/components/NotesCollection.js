export const notesOctaveReservoir = [-1, 0, 1, 2]; // noteOctaves determined by c' belonging to octave 1
export const notesBaseReservoir = ["c", "d", "e", "f", "g", "a", "b"];
export const notesAccidentalReservoir = ["", "flat", "sharp"];

const notesCollection = [];

for (let octave of notesOctaveReservoir.filter(o => [-1,0].includes(o))) {
    for (let base of notesBaseReservoir) {
        for (let accidental of notesAccidentalReservoir) {
            notesCollection.push ({
                noteClef: "bass",
                noteOctave: octave,
                noteBase: base,
                noteAccidental: accidental
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
                noteAccidental: accidental
            });
        }
    }
}
for (let octave of notesOctaveReservoir.filter(o => [1,2].includes(o))) {
    for (let base of notesBaseReservoir) {
        for (let accidental of notesAccidentalReservoir) {
            notesCollection.push ({
                noteClef: "violin",
                noteOctave: octave,
                noteBase: base,
                noteAccidental: accidental
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
                noteAccidental: accidental
            });
        }
    }
}

export default notesCollection;