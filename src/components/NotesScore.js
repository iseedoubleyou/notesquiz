import React from "react";
import { notesBaseReservoir } from "./NotesCollection";

// const notesBaseReservoir = ["c", "d", "e", "f", "g", "a", "b"];

export default function NotesScore(props) {  

    const noteVerticalPosition = 
        props.definedNote.noteClef === "violin" ? 
        (props.definedNote.noteOctave - 1) * 7 + notesBaseReservoir.indexOf(props.definedNote.noteBase) - notesBaseReservoir.indexOf("b") :
        (props.definedNote.noteOctave) * 7 + notesBaseReservoir.indexOf(props.definedNote.noteBase) - notesBaseReservoir.indexOf("d");
    
    const stavesDrawing =
        <path 
            stroke = "black" 
            strokeWidth = "0.5px"
            d = "M10 50 h140 m0 10 h-140 m0 10 h140 m0 10 h-140 m0 10 h140" />;
    
    const barLineDrawing =
    <path 
        stroke = "black" 
        strokeWidth = "0.5px"
        d = "M150 50 v 40" />;

    function ledgerLinesDrawing() {
        let lineHorizontalPosition = props.definedNote.noteAccidental ? 98 : 88;
        let linePositions = [];
        if (noteVerticalPosition >= 6) {
            for (let i=6; i <= noteVerticalPosition; i = i+2) {
                linePositions.push('M' + lineHorizontalPosition + ' ' + (40 - 5 * (i-6)) + ' h22');
            }
        } else if (noteVerticalPosition <= -6) {
            for (let i=-6; i >= noteVerticalPosition; i = i-2) {
                linePositions.push('M' + lineHorizontalPosition + ' ' + (100 - 5 * (i+6)) + ' h22');
            }
        } 
        return (linePositions.map(line => (<path stroke="black" strokeWidth="0.5px" d={line} />)));
    };

    const clefDrawing =
        props.definedNote.noteClef === "violin" ?
        <g> 
            <path transform="scale(0.15)" d="m250,500c-7.02361,1.4404-13.5327,5.29428-19.7454,11.4333-6.22047,6.25176-9.55028,13.3824-10.0946,21.2714-0.34215,4.95881,0.96366,10.7107,3.82777,16.9099,2.85633,6.31187,7.52393,11.0502,13.769,14.312,2.11541,0.59891,3.05441,1.79607,2.94554,3.37387-0.0389,0.5635-0.86858,1.07244-2.82025,1.39073-10.1018-3.30146-18.1938-9.4084-24.1786-18.0876-5.97707-8.79193-8.71309-18.4926-8.19252-29.3274,1.13987-11.5847,5.38858-22.1623,12.7384-31.62,7.47053-9.5626,16.6594-16.0625,27.5667-19.4997l-5.03467-40.5464c-18.3934,13.2252-33.5494,27.2399-45.5965,42.2618-12.0394,14.9092-18.8623,31.5372-20.5817,49.8761-0.341716,8.24271,0.800787,16.3613,3.43528,24.2432,2.62672,7.99458,6.8895,15.3094,12.7728,22.1698,11.8874,13.616,28.0358,21.4112,48.2115,23.4827,6.92252,0.0247,14.3514-0.70832,22.3995-2.19126l-11.4222-89.4525zm8.21189-0.56575,11.6441,87.8825c17.8802-5.78696,27.6289-20.4013,29.2308-43.6175-0.48021-7.84646-2.25757-14.9898-5.671-21.4533-3.29268-6.56844-7.92139-11.8702-13.9991-15.9132-6.07771-4.04294-13.0707-6.33723-21.2048-6.89847zm-15.0724-118.806c3.88367-1.99676,8.44885-5.64505,13.4618-10.8478,5.00519-5.09002,9.9674-11.2021,14.7581-18.1187,4.91144-7.0215,8.92687-14.2181,12.0463-21.5897,3.11163-7.25892,4.84425-14.2733,5.29526-20.8099,0.19441-2.81751,0.16287-5.6506-0.23092-8.16898-0.17196-4.08839-1.19695-7.32973-3.1957-9.61915-2.00654-2.17671-4.64016-3.49079-8.02938-3.72465-6.77845-0.4677-13.1668,3.28127-19.165,11.2469-4.67772,6.9244-8.77091,15.248-11.9251,24.7687-3.27493,9.62562-5.41235,19.2165-6.31482,29.0058-0.20497,11.1963,0.97274,20.4497,3.29941,27.8574zm-7.56839,6.04552c-3.82409-18.6082-5.36537-37.3986-4.62385-56.3712,0.95281-12.1638,2.98093-23.4608,6.08435-33.8909,2.99044-10.4379,6.89657-19.3406,11.7339-26.9334,4.72438-7.60059,9.9944-13.2385,15.6971-16.9216,5.10672-3.27122,8.74112-4.94547,10.6617-4.81296,1.46866,0.10134,2.6725,0.75059,3.73226,1.84285,1.05975,1.09225,2.41177,2.88408,4.06384,5.26281,12.1297,19.974,17.3218,43.4325,15.4711,70.2551-0.87871,12.7351-3.4287,25.0152-7.67331,37.1784-4.12385,12.0583-9.79047,23.4439-16.9843,33.9315-7.31456,10.5925-15.6578,19.642-25.1504,27.2533l6.08708,45.0353c5.00974-0.22052,8.43007-0.43746,10.3506-0.30495,8.58604,0.59243,16.1439,2.9257,23.0124,7.0232,6.86854,4.0975,12.6348,9.36454,17.1779,15.906,4.55094,6.4288,7.90994,13.6812,10.077,21.7573,2.05407,8.06829,2.95507,16.3968,2.36408,24.962-0.91759,13.2986-5.25962,25.2286-13.0183,35.6772s-18.8174,17.7254-33.2969,21.9352c0.52276,5.58467,1.55228,13.6955,3.21711,24.1149,1.54406,10.5243,2.67102,18.8684,3.38085,25.0321,0.70982,6.16376,0.75736,12.0554,0.36077,17.8031-0.61432,8.90337-3.30516,16.6442-8.08031,23.3354-4.88811,6.6834-11.136,11.6877-18.8567,15.005-7.60772,3.32512-15.874,4.67976-24.686,4.07171-12.4272-0.85741-23.0316-5.09944-31.8211-12.6134-8.78175-7.62658-13.1072-17.3237-12.7348-29.3012,0.704405-5.27346,2.28927-10.1465,4.87536-14.724,2.58609-4.57751,5.90077-8.19884,10.0571-10.8562,4.05108-2.77789,8.79189-4.03609,14.125-4.0078,4.40599,0.30401,8.50049,1.83212,12.2913,4.47167,3.67005,2.74443,6.60782,6.23098,8.69256,10.5646,1.97176,4.32581,2.89565,9.03228,2.5535,13.9911-0.4588,6.64932-3.10709,12.1284-7.94488,16.4373s-10.7628,6.2781-17.6542,5.80255l-2.59841-0.17927c3.93942,7.06603,10.9287,11.0586,20.9834,11.7524,5.08384,0.35076,10.3584-0.41765,15.6952-2.08767,5.45753-1.77495,10.0579-4.28847,14.0349-7.63763,3.977-3.34921,6.72681-7.0095,8.02352-10.9965,2.23939-4.48819,3.58643-10.8497,4.13853-18.8514,0.37326-5.4096,0.18165-10.8582-0.46186-16.338-0.65129-5.36706-1.74303-12.5763-3.28299-21.515-1.54774-8.82601-2.66281-15.6972-3.24777-20.3802-6.8951,1.2228-13.9617,1.64111-21.305,1.13443-12.3142-0.84966-23.7794-4.13197-34.388-9.9596s-19.7292-13.4776-27.4672-23.0705c-7.62502-9.58506-13.3647-20.1724-17.2035-31.9874-3.73357-11.6945-5.28175-23.8044-4.53934-36.2092,1.24507-11.4642,4.15364-22.3608,8.93613-32.4486,4.79025-10.2005,10.6714-19.7595,17.7485-28.5566,7.07718-8.79709,14.3259-16.7897,21.7383-23.8651,7.51763-6.95493,17.3295-15.903,29.6538-26.7161z" fillRule="evenodd" stroke="#131516" strokeWidth="0.33931607" fill="#131516"/>
        </g> :
        <g> 
            <circle cx="45" cy="55" r="1.5" />
            <circle cx="45" cy="65" r="1.5" />
            <circle cx="25.58" cy="60" r="3.5" />
            <path fill="black" stroke ="black" strokeWidth="1px" d="M22.6 61 c -2 -26 35 2 -2 22 c 31 -20 .5 -42 2.5 -23" />
        </g>;    
    
    function noteDrawing () {
        let noteHorizontalPositionPX = props.definedNote.noteAccidental ? 105 : 95;
        let notePath = 'm ' + noteHorizontalPositionPX + ',' + (74 - noteVerticalPosition * 5) + ' c -2.2,-0.68 -3.93,-2.52 -3.93,-4.17 0,-4.68 10.06,-6.53 14.21,-2.62 4.49,4.24 -2.84,9.08 -10.28,6.79 z m 6.71,-1.18 c 1.22,-1.87 0.05,-5.57 -2.07,-6.53 -3.11,-1.42 -5.02,1 -3.72,4.72 0.9,2.57 4.54,3.72 5.79,1.82 z';
        return(<path stroke = "black" strokeWidth="0.5px" d={notePath} />);
    }
            
    function accidentalDrawing () {
        switch(props.definedNote.noteAccidental) {
            case "flat" : {
                let accidentalPath = 'M88 ' + (75 - noteVerticalPosition * 5) + 'c 5 0, 15 -15, 0 -8 c 12 -7, 3 8, 0 8 v -25';       
                return(<path stroke = "black" strokeWidth="1px" d={accidentalPath} />);
            }
            case "sharp" : {
                let accidentalPath = 'M88 ' + (84.1 - noteVerticalPosition * 5) + 'l -1 -27 m 6 -1 l 1 27 m 1 -9 l -8 3 v -1 l 8 -3 v 1 m -0.7 -10 l -8 3 v -1 l 8 -3 v 1';       
                return(<path stroke = "black" strokeWidth="1px" d={accidentalPath} />);
            }
            default : return null;
        }
    }

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="160" height="140" version="1">
                <g>
                    {stavesDrawing}
                    {ledgerLinesDrawing()}
                    {barLineDrawing}
                    {clefDrawing}                   
                    {noteDrawing()}
                    {accidentalDrawing()}    
                </g>
            </svg>
        </div>
    );
}