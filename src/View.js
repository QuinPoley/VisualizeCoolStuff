import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'


function View({name}) {
    const [count, setCount] = useState(0)

    function StateCount(num){
        setCount(num)
    }

    function ViewportInitialize(){
        var leftmousedown = false;
        var rightmousedown = false;
        var middlemousedown = false;
        var oldx = 0;
        var oldy = 0;
        var oldz = 0;
        const gridHelper = new THREE.GridHelper( 100, 100 );
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/(window.innerHeight - 76), 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, (window.innerHeight-76) );
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        //this.mount.appendChild( renderer.domElement );
        document.getElementById("here").appendChild(renderer.domElement);
        document.onkeydown = keypress;
        document.onmousedown = mouseisDown;
        document.onmouseup = mouseisUp;
        document.onmousemove = checkdrag;
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        scene.add( gridHelper );
        camera.position.z = 5;
        var animate = function () {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        };
        animate();
        function mouseisDown(e){
            switch (e.which) {
                case 1:
                    leftmousedown = true;
                    break;
                case 2:
                    middlemousedown = true;
                    break;
                case 3:
                    rightmousedown = true;
                    break;
                default:
                    alert('You have a strange Mouse!');
            }
        }
        function mouseisUp(e){
            leftmousedown = false;
            rightmousedown = false;
            middlemousedown = false;
        }
        function checkdrag(e){
            if(leftmousedown){
                if(e.pageX < oldx){
                    camera.rotateY((e.pageX - oldx)/180);
                    oldx = e.pageX;
                }
                else if(e.pageX > oldx){
                    camera.rotateY((e.pageX - oldx)/180);
                    oldx = e.pageX;
                }
            }
            if(middlemousedown){
                if(e.pageX < oldx){
                    camera.rotateZ((e.pageX - oldx)/180);
                    oldx = e.pageX;
                }
                else if(e.pageX > oldx){
                    camera.rotateZ((e.pageX - oldx)/180);
                    oldx = e.pageX;
                }
            }
            if(rightmousedown){
                if(e.pageY > oldy){
                    camera.rotateX((e.pageY - oldy)/180);
                    console.log("This third");
                    oldy = e.pageY;
                }
                else if(e.pageY < oldy){
                    camera.rotateX((e.pageY - oldy)/180);
                    console.log("This fourth");
                    oldy = e.pageY;
                }
            }

        }
        function keypress(e){
            e = e || window.event;

            if (e.keyCode == '87') {  //W
                camera.position.y += 1;
            }
            else if (e.keyCode == '65') { // A
                camera.position.x -= 1;
            }
            else if (e.keyCode == '68') { // D
                camera.position.x += 1;
            }
            else if (e.keyCode == '83') { //S
                camera.position.y -= 1; 
            }
            else if (e.keyCode == '81') { // Q
                camera.position.z += 1;
            }
            else if (e.keyCode == '69') { //E
                camera.position.z -= 1; 
            }
            else if (e.keyCode == '90') { // Z
                camera.rotateX(10/180);
            }
            else if (e.keyCode == '88') { // X
                camera.rotateX(-10/180) 
            }
            //camera.updateProjectionMatrix();
        }
        //return (renderer.domElement);
           
    }

    function ImportglHF(){
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        var loader = new GLTFLoader();
        //var ExportToglTF = this
        loader.load(
            "Objects/ExportToglTF.glb",
            function ( gltf ) {
                scene.add( gltf.frame )
                
                /*var scale = 5.6;
                ExportToglTF.body = gltf.scene.children[0];
                ExportToglTF.body.name = "body";
                ExportToglTF.body.rotation.set ( 0, -1.5708, 0 );
                ExportToglTF.body.scale.set (scale,scale,scale);
                ExportToglTF.body.position.set ( 0, 3.6, 0 );
                ExportToglTF.body.castShadow = true;
                ExportToglTF.frame = ExportToglTF.body;*/
            }, undefined, function ( error ) {

                console.error( error );
            
            }
            );
        document.getElementById("here").appendChild(renderer.domElement);
    }

    useEffect(() => {
        StateCount(10)
        const view = ViewportInitialize()
        //ImportglHF()
    }, [])
    //<div className="View">{view}</div>
    return(
        <div className="view" id="here">

        </div>
    )
}

export default View;