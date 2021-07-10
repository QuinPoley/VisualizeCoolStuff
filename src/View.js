import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';


function View({name}) {
    const [count, setCount] = useState(0)

    function ViewportInitialize(){
        setCount(7)
    }

    function badFeelingabtThis(){
        
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        //this.mount.appendChild( renderer.domElement );
        document.getElementById("here").appendChild(renderer.domElement);
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 5;
        var animate = function () {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        };
        animate();
        return (renderer.domElement);
           
    }

    useEffect(() => {
        ViewportInitialize()
        const view = badFeelingabtThis()
    }, [])
    //<div className="View">{view}</div>
    return(
        <div className="view" id="here">

        </div>
    )
}

export default View;