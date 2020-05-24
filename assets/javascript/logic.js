$(document).ready(function() {
    
    var firebaseConfig = {
        apiKey: "AIzaSyAdyu6pLlB_Vz2RxRaxauaB6kyxRgkOddU",
        authDomain: "train-scheduler-d727a.firebaseapp.com",
        databaseURL: "https://train-scheduler-d727a.firebaseio.com",
        projectId: "train-scheduler-d727a",
        storageBucket: "train-scheduler-d727a.appspot.com",
        messagingSenderId: "1031356229404",
        appId: "1:1031356229404:web:3a34b74fc0a41ff97fbcd9",
        measurementId: "G-NBQ4MBRYWE"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      

      var database = firebase.database();

      $("#add-train").on("click", function (event){
          event.preventDefault();

          var trainname = $("#train-name").val().trim();
          var destinationname = $("#destination-name").val().trim();
          var firsttrain = $("#first-train").val().trim();
          var frequencyinput = $("#frequency-input").val().trim();

          database.ref().push({
              trainname: trainname,
              destinationname: destinationname,
              firsttrain: firsttrain,
              frequencyinput: frequencyinput
          });
      
        });

    database.ref().on("child_added", function(childSnapshot){

        var newTrain = childSnapshot.val().trainname;
        var newDestination = childSnapshot.val().destinationname;
        var newFirstTrain = childSnapshot.val().firsttrain;
        var newFrequency = childSnapshot.val().frequencyinput;

        var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

        var currentTime = moment();

        var diffTime = moment().diff(moment(startTimeConverted), "minutes");

        var tRemainder = diffTime % newFrequency;

        var minutesTill = newFrequency - tRemainder;
        
        var nextTrain = moment().add(minutesTill, "minutes");
        var nextTrainTime = moment(nextTrain).format("HH:mm");

        $("#display-info").append(
            ' <tr><td>' + newTrain +
            ' </td><td>' + newDestination +
            ' </td><td>' + newFrequency +
            ' </td><td>' + nextTrainTime +
            ' </td><td>' + minutesTill + ' </td><tr>');
    

    $("#train-name, #destination-name, #first-train, #frequency-input").val("");
    return false;
},


    function (errorObject){
        console.log("Errors handled: " + errorObject.code);
    });
});