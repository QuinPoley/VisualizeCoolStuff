import React, {useContext, useEffect, useState} from "react";



function ControlView({ isOpen, setisOpen }){
    if({isOpen}){
    return (
        <div className="helperpanel">
            <div className="button"></div>
            <b>Controls</b>
            <p>Pan Left/Right:   <b style={{float: 'right'}}>Left Click Drag</b></p>
            <p>Pan Up/Down:      <b style={{float: 'right'}}>Right Click Drag</b></p>
            <p>Rotate on Z:      <b style={{float: 'right'}}>Middle Click Drag</b></p>
            <p>Move up Y:        <b style={{float: 'right'}}>W</b></p>
            <p>Move down Y:      <b style={{float: 'right'}}>S</b></p>
            <p>Move up X:        <b style={{float: 'right'}}>D</b></p>
            <p>Move down X:      <b style={{float: 'right'}}>A</b></p>
            <p>Move up Z:        <b style={{float: 'right'}}>Q</b></p>
            <p>Move down Z:      <b style={{float: 'right'}}>E</b></p>
        </div>
    )
    }
    else{
        return (<></>)
    }
}

export default ControlView