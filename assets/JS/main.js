$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCWs50cHs-rKgqwG_9xsr_0jZRM7Ny5j0I",
        authDomain: "traintimes-fd14f.firebaseapp.com",
        databaseURL: "https://traintimes-fd14f.firebaseio.com",
        projectId: "traintimes-fd14f",
        storageBucket: "traintimes-fd14f.appspot.com",
        messagingSenderId: "933698783161"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";
    var trainDestination = "";
    var trainStart = "";
    var trainFrequency = "";

    $('#submit-btn').on('click', function () {
        event.preventDefault();

        trainName = $('#nameInput').val().trim()
        trainDestination = $('#destinationInput').val().trim()
        trainStart = $('#starttimeInput').val().trim()
        trainFrequency = $('#frequencyInput').val().trim()

        database.ref().push({
            name: trainName,
            destination: trainDestination,
            start: trainStart,
            frequency: trainFrequency
        });

        $('#nameInput').val("")
        $('#destinationInput').val("")
        $('#starttimeInput').val("")
        $('#frequencyInput').val("")

    })
    database.ref().on('child_added', function (snapshot) {
        const snapvalue = snapshot.val()
        var currentTime = moment();
        var timestart = moment(snapvalue.start, 'HH:mm')
        // const nexttrain = moment.duration(currenttime.diff(timestart))
        var duration = currentTime.diff(timestart, "minutes")
        const durationint = parseInt(duration)
        var timeleft = Math.abs(durationint % snapvalue.frequency)
        var nexttime = moment().add(timeleft, "m")
        console.log(snapvalue.frequency)
        console.log(timestart)
        console.log(duration)
        console.log(timeleft)
        console.log(nexttime.format('HH:mm'))



        // console.log(duration)
        var tablerow = $('<tr>')
        tablerow.append('<td class="data">' + snapvalue.name + '</td>')
        tablerow.append('<td class="data">' + snapvalue.destination + '</td>')
        tablerow.append('<td class="data">' + timestart.format('HH:mm') + '</td>')
        tablerow.append('<td class="datasmaller">' + snapvalue.frequency + ' Minutes </td>')
        if (currentTime.isBefore(timestart)) {

            tablerow.append('<td class="datasmaller">' + timestart.format('hh:mm a') + '</td>')
        }
        else {
        tablerow.append('<td class="datasmaller">' + nexttime.format('hh:mm a') + '</td>')
    }
    $('#inputdisplay').append(tablerow)
    })

});