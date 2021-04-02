// Author: Christian Wilhelmi

import React from "react";

export default function Keyboard(props) {
    
    const keyCollection = [
        {keyId: 1, keyName: "c", keyColour: "white", keyPath: "M10 10 v90 h20 v-40 h-10 v-50z"},
        {keyId: 2, keyName: "c_sharp", keyColour: "black", keyPath: "M20 10 v50 h15 v-50z"},
        {keyId: 3, keyName: "d", keyColour: "white", keyPath: "M35 10 v50 h-5 v40 h20 v-40 h-5 v-50z"},
        {keyId: 4, keyName: "d_sharp", keyColour: "black", keyPath: "M45 10 v50 h15 v-50z"},
        {keyId: 5, keyName: "e", keyColour: "white", keyPath: "M60 10 v50 h-10 v40 h20 v-90z"},
        {keyId: 6, keyName: "f", keyColour: "white", keyPath: "M70 10 v90 h20 v-40 h-10 v-50z"},
        {keyId: 7, keyName: "f_sharp", keyColour: "black", keyPath: "M80 10 v50 h15 v-50z"},
        {keyId: 8, keyName: "g", keyColour: "white", keyPath: "M95 10 v50 h-5 v40 h20 v-40 h-5 v-50z"},
        {keyId: 9, keyName: "g_sharp", keyColour: "black", keyPath: "M102.5 10 v50 h15 v-50z"},
        {keyId: 10, keyName: "a", keyColour: "white", keyPath: "M117.5 10 v50 h-7.5 v40 h20 v-40 h-5 v-50z"},
        {keyId: 11, keyName: "a_sharp", keyColour: "black", keyPath: "M125 10 v50 h15 v-50z"},
        {keyId: 12, keyName: "b", keyColour: "white", keyPath: "M140 10 v50 h-10 v40 h20 v-90z"}
    ];

    const keyboardJSX = keyCollection.map(k => (
        <path 
            id={k.keyId} 
            key={k.keyName}
            fill={k.keyId == props.correctKey ? "#E2F0D9" : k.keyId == props.wrongKey ? "#FFC3C3" : k.keyColour} 
            stroke="grey"
            strokeWidth="0.5px"
            d={k.keyPath} 
            onClick={props.onClickHandler}>
        </path>
    ));
    
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="160" height="100" version="1">
                {keyboardJSX}                
            </svg>
        </div>
    );
};