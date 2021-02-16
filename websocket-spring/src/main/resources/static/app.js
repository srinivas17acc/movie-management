
var ws;
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#MoviesInfo").html("");
}

function connect() {
	ws = new WebSocket('ws://localhost:8000/movie');
	ws.onmessage = function(data){

		showMoviesInfo(data.data);
	}
	ws.onError = function(data){
    		console.log(data);
    	}
	 setConnected(true);
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
	var data = JSON.stringify({'name': $("#name").val(),
	                          'description' : $("#description").val(),
	                          'releaseDate' : $("#releaseDate").val(),
	                          'ticketPrice' : $("#ticketPrice").val(),
	                          'country' : $("#country").val(),
	                          'genre' : $("#genre").val(),
	                          'photo' : $("#photo").val()}
	)


	if (data.command === 'CREATE_MOVIE') {

	    data.message = JSON.stringify({'name': $("#name").val(),
                       	                          'description' : $("#description").val(),
                       	                          'releaseDate' : $("#releaseDate").val(),
                       	                          'ticketPrice' : $("#ticketPrice").val(),
                       	                          'country' : $("#country").val(),
                       	                          'genre' : $("#genre").val(),
                       	                          'photo' : $("#photo").val()} )

	}else if (data.command === 'MOVIE_GET_SLUG') {
	      data.message = JSON.stringify({'slug': $("#slug").val()})

	 }else {
	       // MOVIE_GET_ALL
	      data.message = {};
	 }

	console.log(data);
    ws.send(data);
}

function showMoviesInfo(message) {
    $("#MoviesInfo").append("<tr><td> " + message + "</td></tr>");
}

function createCommand(type) {

//    var data = JSON.stringify({'name': $("#name").val(),
//    	                          'description' : $("#description").val(),
//    	                          'releaseDate' : $("#releaseDate").val(),
//    	                          'ticketPrice' : $("#ticketPrice").val(),
//    	                          'country' : $("#country").val(),
//    	                          'genre' : $("#genre").val(),
//    	                          'photo' : $("#photo").val()}
//    	)

      var data = {command:type};
    	if (data.command === 'CREATE_MOVIE') {

    	    data.message = {'name': $("#name").val(),
                           	                          'description' : $("#description").val(),
                           	                          'releaseDate' : $("#releaseDate").val(),
                           	                          'ticketPrice' : $("#ticketPrice").val(),
                           	                          'country' : $("#country").val(),
                           	                          'genre' : $("#genre").val(),
                           	                          'photo' : $("#photo").val()}

    	}else if (data.command === 'MOVIE_GET_SLUG') {
    	      data.message = {'slug': $("#slug").val()}

    	 }

    	 data.message = JSON.stringify(data.message);

    	console.log(data);
        ws.send(JSON.stringify(data));
        //data.message = {page:0, size:5};
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { createCommand('CREATE_MOVIE'); });
  //  $( "#get_slug" ).click(function() { createCommand('MOVIE_GET_SLUG'); });
  //  $( "#movie_all" ).click(function() { createCommand('MOVIE_GET_ALL'); });
});

