const radians_to_degrees = rad => (rad * 180.0) / Math.PI;
const degrees_to_radians = deg => (deg * Math.PI) / 180.0;

console.log("func: triangle(dat1, str1, dat2, str2); \ndat - number, str - key (leg, hypotenuse, opposite angle, adjacent angle, angle); \nexample: triangle(5, \"hypotenuse\", 3, \"leg\");");

function triangle(dat1, str1, dat2, str2){
  var triA = new Object();

  if(str1 == "leg" && str2 == "leg"){
    triA[str1] = dat1;
    triA.b = dat2;
  }
  else{
    triA[str1] = dat1;
    triA[str2] = dat2;
  }
  //Some checks
  if(triA["opposite angle"] <= 0.0 || triA["opposite angle"] >= 90.0) {
     console.log("(」°ロ°)」  Error! invalid number: opposite angle");
     return;
  }
  
  if(triA["adjacent angle"] <= 0.0 || triA["adjacent angle"] >= 90.0) {
    console.log("(」°ロ°)」  Error! invalid number: adjacent angle");
    return;
  }
  
  if(triA["angle"] <= 0.0 || triA["angle"] >= 90.0) {
    console.log("(」°ロ°)」  Error! invalid number: angle");
    return;
  }
  
  if(triA["leg"] <= 0.0 || triA["leg"] >= triA["hypotenuse"]){
    console.log("(」°ロ°)」  Error! invalid number: leg");
    return;
  }
  
  if(triA["hypotenuse"] <= 0.0){
    console.log("(」°ロ°)」  Error! invalid number: hypotenuse");
    return;
  }
  
  if(triA.b <= 0.0){
    console.log("(」°ロ°)」  Error! invalid number: leg");
    return;
  }
  
  //Convert from degrees to radians
  triA["opposite angle"] = degrees_to_radians(triA["opposite angle"]);
  triA["adjacent angle"] = degrees_to_radians(triA["adjacent angle"]);
  triA["angle"]          = degrees_to_radians(triA["angle"]);
  
  //Mathematics
  //a
  triA["leg"] =            triA["leg"] ||
                           triA["hypotenuse"] * Math.sin(triA["angle"]);        //Hypotenuse and angle
    
  //c
  triA["hypotenuse"] =     triA["hypotenuse"] ||
                           triA["leg"] / Math.cos(triA["adjacent angle"]) ||    //Leg and adjacent angle
                           triA["leg"] / Math.sin(triA["opposite angle"]) ||    //Leg and opposite angle
                           Math.sqrt(Math.pow(triA["leg"], 2) + Math.pow(triA.b, 2));

  //Alpha
  triA["opposite angle"] = triA["opposite angle"] || 
                           triA["angle"] || 
                           Math.asin(triA["leg"] / triA["hypotenuse"]) ||       //Leg and hypotenuse
                           degrees_to_radians(90.0) - triA["adjacent angle"];   //Second angle
    
  //Beta
  triA["adjacent angle"] = triA["adjacent angle"] ||
                           degrees_to_radians(90.0) - triA["opposite angle"];   //Second angle
    
  //Alpha 
  triA["angle"] =          triA["angle"] ||
                           triA["opposite angle"];                              //Angle always is equal opposite angle

  //b
  triA.b =                 triA.b ||
                           Math.sqrt(Math.pow(triA["hypotenuse"], 2) - Math.pow(triA["leg"], 2));
  
  console.log("a: " + triA["leg"]);
  console.log("b: " + triA.b);
  console.log("c: " + triA["hypotenuse"]);
  console.log("Alpha: " + radians_to_degrees(triA["opposite angle"]));
  console.log("Beta: " + radians_to_degrees(triA["adjacent angle"]));
//console.log("angle: " + radians_to_degrees(triA["angle"]));
  console.log("--------------＼(٥⁀▽⁀ )／--------------");
}
//Examples for Pifagor triangle
//triangle(36.86989764584402, "opposite angle", 3, "leg");
//triangle(53.13010235415598, "adjacent angle", 3, "leg");
//triangle(5, "hypotenuse", 3, "leg");
//triangle(5, "hypotenuse", 36.86989764584402, "angle");
//triangle(4, "leg", 3, "leg");
