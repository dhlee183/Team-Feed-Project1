// Initialize Firebase
var config = {
  apiKey: "AIzaSyBvOu8NlLiEb9EgVUtf4Q6klm7hYmAihpA",
  authDomain: "team-feed-97f6e.firebaseapp.com",
  databaseURL: "https://team-feed-97f6e.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "923654108494"
};
firebase.initializeApp(config);

var database = firebase.database();

// Sign up logic
$('#signUp').on('click', function() {
  var email = $('#emailInput').val().trim(); 
  var password = $('#passwordInput').val().trim();
  var favTeam = $('#favTeamInput').val().trim();

  if (email.length < 4) {
    $('.errorMessage1').empty();
    $('#signupSection').append('<div class="errorMessage1">' + 'Please enter an email address' + '</div>');
    return false;
  }
  
  if (password.length < 4) {
    $('.errorMessage1').empty();
    $('#signupSection').append('<div class="errorMessage1">' + 'Please enter a password' + '</div>');
    return false;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    var user = firebase.auth().currentUser;
    database.ref(user.uid).set({
      Email: email,
      FavTeam: favTeam
    });
    $(location).attr("href", "main.html");
  }, function(error) {
      if (error.code) {
        var errorCode = error.code;
        var errorMessage = error.message;
        $('.errorMessage1').empty();
        if (errorCode == 'auth/weak-password') {
          $('#signupSection').append('<div class="errorMessage1">Password should be at least 6 characters</div>');
        } else {
          $('#signupSection').append('<div class="errorMessage1">The email address is already in use by another account</div>');
          }  
      } 
      });

  $('#emailInput').val("");
  $('#passwordInput').val("");
  $('#favTeamInput').val("");

  return false;
});
// <----------------------------------------->

// Sign in logic
$('#signIn').on('click', function() {
  var email = $('#exampleInputEmail3').val().trim(); 
  var password = $('#exampleInputPassword3').val().trim();
  
  if (email.length < 4) {
    $('.errorMessage2').empty();
    $('#loginSection').append('<div class="errorMessage2">' + 'Please enter an email address' + '</div>');
    return false;
  }

  if (password.length < 4) {
    $('.errorMessage2').empty();
    $('#loginSection').append('<div class="errorMessage2">' + 'Password too short' + '</div>');
    return false;
  }
          
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
    var user = firebase.auth().currentUser;
    database.ref(user.uid).set
    $(location).attr("href", "main.html");
  }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      $('.errorMessage2').empty();
      if (errorCode === 'auth/wrong-password') {
        $('#loginSection').append('<div class="errorMessage2">' + 'Wrong password' + '</div>');
      } else {
          $('#loginSection').append('<div class="errorMessage2">' + errorMessage + '</div');
        }
      });

  $('#exampleInputEmail3').val("");
  $('#exampleInputPassword3').val("");
          
  return false;
});  
// <----------------------------------------->