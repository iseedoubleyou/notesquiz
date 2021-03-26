// Author: Christian Wilhelmi

import React from "react";

export default function Keyboard(props) {
    
    const keyCollection = [
        {keyId: 1, keyName: "c", keyColour: "white", keyPath: "M10 10L10 100 30 100 30 60 20 60 20 10z"},
        {keyId: 2, keyName: "c_sharp", keyColour: "black", keyPath: "M20 10L20 60 35 60 35 10z"},
        {keyId: 3, keyName: "d", keyColour: "white", keyPath: "M35 10L35 60 30 60 30 100 50 100 50 60 45 60 45 10z"},
        {keyId: 4, keyName: "d_sharp", keyColour: "black", keyPath: "M45 10L45 60 60 60 60 10z"},
        {keyId: 5, keyName: "e", keyColour: "white", keyPath: "M60 10L60 60 50 60 50 100 70 100 70 10z"},
        {keyId: 6, keyName: "f", keyColour: "white", keyPath: "M70 10L70 100 90 100 90 60 80 60 80 10z"},
        {keyId: 7, keyName: "f_sharp", keyColour: "black", keyPath: "M80 10L80 60 95 60 95 10z"},
        {keyId: 8, keyName: "g", keyColour: "white", keyPath: "M95 10L95 60 90 60 90 100 110 100 110 60 102.5 60 102.5 10z"},
        {keyId: 9, keyName: "g_sharp", keyColour: "black", keyPath: "M102.5 10L102.5 60 117.5 60 117.5 10z"},
        {keyId: 10, keyName: "a", keyColour: "white", keyPath: "M117.5 10L117.5 60 110 60 110 100 130 100 130 60 125 60 125 10z"},
        {keyId: 11, keyName: "a_sharp", keyColour: "black", keyPath: "M125 10L125 60 140 60 140 10z"},
        {keyId: 12, keyName: "b", keyColour: "white", keyPath: "M140 10L140 60 130 60 130 100 150 100 150 10z"}
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