import React, {useContext, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'



function View({isSel}) {

    function ViewportInitialize(){
        var leftmousedown = false;
        var rightmousedown = false;
        var middlemousedown = false;
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        var oldx = 0;
        var oldy = 0;
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
        var redmaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        var cube = new THREE.Mesh( geometry, material );
        var redcube = new THREE.Mesh( geometry, redmaterial );
        cube.updateMatrixWorld();
        redcube.position.x = 3;
        redcube.updateMatrixWorld();
        cube.name = "Cube";
        redcube.name = "RedCube"
        cube.instancetype = "t2.large";
        scene.add( cube );
        scene.add(redcube);
        scene.add( gridHelper );
        camera.position.y = 5;
        camera.rotateX(-1.8);
        var animate = function () {
            requestAnimationFrame( animate );
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
            mouse.x = ((e.clientX - 70)/renderer.domElement.width) * 2 - 1;
            mouse.y = -((e.clientY - 50)/renderer.domElement.height) * 2 + 1;
            oldx = e.pageX;
            oldy = e.pageY;
            raycaster.setFromCamera( mouse, camera );
            var intersects = raycaster.intersectObjects( scene.children );
	        if(0 < intersects.length && intersects[0].object.name) { // Select obj no dragging
                if (document.contains(document.getElementById("curselect"))) {
                    while (document.getElementById("curselect").firstChild) {
                        document.getElementById("curselect").removeChild(document.getElementById("curselect").firstChild);
                    }                
                    document.getElementById("curselect").remove();
                }
                var sel = document.createElement("selected");
                sel.innerHTML = "<p>Cube</p><p>Instance Type: "+ intersects[0].object.instancetype+"</p><p>Location:</p>";
                //intersects[0].object.name + "\n" +"Color: "+intersects[0].object.material.color
                var close = document.createElement("div");
                close.innerHTML = "";
                close.className = "button";
                close.onclick = function(){
                    if (document.contains(document.getElementById("curselect"))) {
                        while (document.getElementById("curselect").firstChild) {
                            document.getElementById("curselect").removeChild(document.getElementById("curselect").firstChild);
                        }                
                        document.getElementById("curselect").remove();
                    }
                }
                sel.id = "curselect";
                sel.className = "SelectedInView";
                sel.appendChild(close);
                document.getElementById("clickedon").appendChild(sel);
                
                //var xbutton = document.createElement("button");
                //xbutton.className = "icon-right";
                //xbutton.innerHTML = "{<Arrow/>}";
                //xbutton.onclick = removeSelected();
                //sel.appendChild(xbutton);
		        leftmousedown = false;
                rightmousedown = false;
                middlemousedown = false;
	        }
            intersects = [];
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
                    oldy = e.pageY;
                }
                else if(e.pageY < oldy){
                    camera.rotateX((e.pageY - oldy)/180);
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
    function removeSelected(){
        if (document.contains(document.getElementById("curselect"))) {
            while (document.getElementById("curselect").firstChild) {
                document.getElementById("curselect").removeChild(document.getElementById("curselect").firstChild);
            }                
            document.getElementById("curselect").remove();
        }
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
        const view = ViewportInitialize()
        //ImportglHF()
    }, [])
    //<div className="View">{view}</div>
    return(
        <div>
            <div id="clickedon"></div>
            <div className="view" id="here"></div>
        </div>
    )
}

export default View;