!function(){"use strict";var a;a=localStorage&&localStorage.rId?localStorage.rId:"batlive-receiver",console.log("Starting Peer connection with",a);var b=new Peer(a,{key:"8c1pbcrq7lihehfr",debug:3});console.log("peer:",b),b.on("open",function(a){console.log("My peer ID is: "+a),b.on("call",function(a){a.answer(null),console.log("batman calling ^^",a),a.on("stream",function(a){console.log("receiving video stream ^^",a);var b=document.querySelector("#video");b.src=window.URL.createObjectURL(a)})})})}();