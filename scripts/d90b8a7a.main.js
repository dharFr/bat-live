!function(){"use strict";function a(){navigator.getMedia({video:!0,audio:!0},function(a){var c=document.querySelector("#sender-video");c.src=window.URL.createObjectURL(a),b(a)},function(a){console.log("The following error occured:",a)})}function b(a){console.log("Starting Peer connection with",c);var b=new Peer(c,{key:"8c1pbcrq7lihehfr",debug:3});console.log("peer:",b),b.on("open",function(c){console.log("My peer ID is: "+c);b.call(d,a)})}var c,d;localStorage&&localStorage.sId&&localStorage.rId?(c=localStorage.sId,d=localStorage.rId):(c=UUIDjs.create(),d=UUIDjs.create(),localStorage.setItem("sId",c),localStorage.setItem("rId",d)),document.querySelector("a#receiverLink").href+="?rid="+d,navigator.getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;var e=document.getElementById("preview-btn");e.addEventListener("click",a,!1)}();