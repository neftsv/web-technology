function F(){
  var names = ["Bill", "John", "Adolf" , "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  for (let i = 0; i < names.length; i++) {
  
  //console.log(speakword);
    if(names[i] == "Adolf"){
      console.log("Guten tag mein Führer");
    }
    else if(names[i].length < 5){
      var temp = names[i];
      speak_hi(temp);
    }
    else if (names[i][0] == "J" || names[i][0] == "j") {
      var temp = names[i];
      speak_hi(temp);
    } else {
      var temp = names[i];
      speak_bye(temp);
    }
  }
}
F();