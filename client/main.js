import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';



  /*****************************************************************
   LUCES
  ******************************************************************/

Template.sala.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
	
	var config = {
    apiKey: "AIzaSyCxrhGF98kKGDwVvdTi3Q6Ns7bo3MmOwoA",
    authDomain: "pruebaiot-eeb9a.firebaseapp.com",
    databaseURL: "https://pruebaiot-eeb9a.firebaseio.com",
    projectId: "pruebaiot-eeb9a",
    storageBucket: "pruebaiot-eeb9a.appspot.com",
    messagingSenderId: "1007820131851"
  };
  firebase.initializeApp(config);
  
  var ref = firebase.database().ref();

  /*****************************************************************
   Obtenemos el valor del último estado SALA
  ******************************************************************/
  ref.once("value", function(res) {

    var luzSala = res.child("sala").val();
    $('#switch').attr('checked', luzSala); // 
    console.log("Estado actual 1: " +luzSala)

  });

ref.on("child_changed", function(res) {

    var luz_sala = res.val();
    $('#switch').prop('checked');
	luz_sala = $('#switch').prop('checked');
    console.log("Cambio de estado: " +luz_sala)

  });        

  /*****************************************************************
   Obtenemos el valor del último estado CUARTO
  ******************************************************************/
 ref.once("value", function(res) {

    var luzcuarto = res.child("cuarto").val();
    $('#switch2').attr('checked', luzcuarto); // 
    console.log("Estado actual 1: " +luzcuarto)

  });

ref.on("child_changed", function(res) {

    var luz_cuarto = res.val();
    $('#switch2').prop('checked');
	luz_cuarto = $('#switch2').prop('checked');
    console.log("Cambio de estado: " +luz_cuarto)

  }); 




});

Template.sala.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.sala.events({
  'click #switch'(event, instance) {//EVENTO CON LALUZ DE LA SALA
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);

	 if(document.querySelector('#switch').checked) 
      {
          console.log("On")
          firebase.database().ref().update({ sala: true });
      }
      else{
          console.log("Off")
          firebase.database().ref().update({ sala: false });
      }
	
  },
});

Template.sala.events({
  'click #switch2'(event, instance) {//EVENTO CON LALUZ DEL CUARTO
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);

	 if(document.querySelector('#switch2').checked) 
      {
          console.log("On")
          firebase.database().ref().update({ cuarto: true });
      }
      else{
          console.log("Off")
          firebase.database().ref().update({ cuarto: false });
      }
	
  },
});
