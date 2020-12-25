class Food{
    constructor(){
        this.image = loadImage("images/Milk.png")
        
        this.foodStock = 20
       this.lastFed = hour()

       this.button= createButton("Feed the Dog");
       this.button2= createButton("Add Food");
       
    }


    getFoodStock(){
        var foodStockRef = database.ref('Food');
        foodStockRef.on("value",(data)=>{
          foodStock = data.val();
        })
    }

    updateFoodStock(foodStock){
        database.ref('/').update({
            Food: foodStock
          });

    }


  
display(){

    this.button.position(700,95);
    this.button.mousePressed(()=>{
    this.foodStock = this.foodStock-1
    
    feedDog()
})



    var x = 80, y = 100;

    
    imageMode(CENTER);
    image(this.image,720,300,70,70);

 

    if(this.foodStock!=0){
        for(var i=0; i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50;
            }
           image(this.image,x,y,50,50);
            x=x+30
        }
    }
    
this.button2.position(800,95);
this.button2.mousePressed(()=>{
    this.foodStock = this.foodStock+1
    addFoods()

})
}
}