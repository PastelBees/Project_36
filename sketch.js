//Create variables here
var dogImg1, dogImg2
var dog, happyDog, database, foodS, foodStock
var  fedTime, lastFed
var foodObj
var notPress, buttonPress
function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")

}

function setup() {
  database = firebase.database();

  createCanvas(900, 500);
  
  foodObj = new Food()

  dog = createSprite(800, 275)
  dog.addImage(dogImg1)
  dog.scale = .17

  foodStock = database.ref('Food')
  foodStock.on("value", readStock)

}
function draw() {  
background(46, 139, 87)


foodObj.display()



  drawSprites();

  
fedTime = database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val();
})

  fill(255,255,254);
  textSize(15);
  
  if(lastFed>=12){
    text("Last Fed : "+lastFed%12 + " PM", 375, 30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM", 375, 30);
  }else if(lastFed<12){
    text("Last Fed : " + lastFed + " AM", 375,30)
  }


  
 

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(dogImg2);

  foodS = foodS-1
  database.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })
}



function addFoods(){
  foodS = foodS+1;
  database.ref('/').update({
    Food:foodS
  })
}
