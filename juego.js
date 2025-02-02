


var myGame = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 720;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 30);

        //this.interval = setInterval(updatePointTable,20);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    end: function(){
        alert ("GAME OVER");
    }
};
var obstaculo = [];
var character;
//variable de vidas
var vidas = 3;
var cantVidas = vidas;
//puntaje auxiliar
var puntajeaux = 0;


function startGame() {
    myGame.start();
    añadirobstaculo();
    actualizarVidas();
    character = new component(30, 30, "red", 10, 120); // Creamos el personaje
    
}


function actualizarVidas(){
    for(var i = 0; i < cantVidas.length ; i++){
        cantVidas[i] = new vida(10, 10, "yellow", 20, 20);
    }
}

var ids = 0;
function añadirobstaculo(){
    
    tamaño = randomCube()+ 15;
    obs = new obstacle(tamaño, tamaño, "blue", 720, randomPosY());
    obstaculo.push(obs);
    obstaculo[ids].id = ids;
    ids++;
}

function randomPosY(){
    return Math.floor(Math.random() * 480);
}

function randomCube(){
    return Math.floor(Math.random() * 25);
}

// se han añadido varios componentes
function component(width, height, color, posicionX, posicionY) {
    this.width = width;
    this.height = height;
    this.posicionX = posicionX;
    this.posicionY = posicionY;
    this.speedX = 0;
    this.speedY = 0;

    this.update = function() {
        let context = myGame.context;
        context.fillStyle = color;
        context.fillRect(this.posicionX, this.posicionY, this.width, this.height);
    };

    this.newPos = function() {

        this.speedY += 10;

        if(this.speedY <= -200){
            this.speedY = -200;
        }

        if(this.speedY >= 2){
            this.speedY = 2;
        }

        if (this.speedY < 2){
        this.posicionY += -4 ;
        }

        if (this.speedY >= 2){
            this.posicionY += 4 ;
        }   
        
        if (this.posicionY>= 450){
            this.speedY=0;
            this.posicionY = 450;
        }
        if (this.posicionY<= 0){
            this.speedY=0;
            this.posicionY = 15;
        }
        if (this.posicionX > 690){
            this.speedX=0;
            this.posicionX = 690;
        }
        if (this.posicionX< 0){
            this.speedX=0;
            this.posicionX = 0;
        }
        

        this.posicionX += this.speedX ;

        

    };

    
}


function obstacle(width, height, color, posicionX, posicionY) {
    this.id;
    this.width = width;
    this.height = height;
    this.posicionX = posicionX;
    this.posicionY = posicionY;
    this.speedX = 0;
    this.speedY = 0;
    this.static = false;
    this.update = function() {
        let context = myGame.context;
        context.fillStyle = color;
        context.fillRect(this.posicionX, this.posicionY, this.width, this.height);
    };

    this.newPos = function() {

        if (this.static == false){
        this.speedX -= 2;

        if(this.speedY <= -200){
            this.speedY = -200;
        }


        if (this.speedX < 2){
            this.speedX = -4 ;
        }

        if (this.speedY >= 2){
            this.posicionY += 4 ;
        }   
        
        
        

        this.posicionX += this.speedX ;

        if (this.posicionX< 0){
            this.speedX=0;
            this.posicionX = 0;
            this.static = true;
        }
        }else{
            this.posicionY += this.speedY;
        }
    };

    this.choque = function(){

        if(vidas <= 0){
            alert("has perdido");
        }else{
        if((this.posicionX) < (character.posicionX + character.width) && (this.posicionX ) > (character.posicionX - character.width)  && (this.posicionY) < (character.posicionY + character.height) && (this.posicionY ) > (character.posicionY - character.width)){
            alert("obstculo pasado");
            --vidas;
            puntajeaux = valor + 100;
        }
        }
    }

    this.acumular = function(){
        for(var i = 0; i < obstaculo.length ; i++){
            if(this.id != obstaculo[i].id){
                if((this.posicionX) < (obstaculo[i].posicionX + obstaculo[i].width) && (this.posicionX ) > (obstaculo[i].posicionX - obstaculo[i].width)  && (this.posicionY) < (obstaculo[i].posicionY + obstaculo[i].height) && (this.posicionY ) > (obstaculo[i].posicionY - obstaculo[i].width)){
                    this.static = true;
                    this.speedX = 0;
                }else{

                }
            }
        }
    }

}

function vida(width, height, color, posicionX, posicionY){
    this.width = width;
    this.height = height;
    this.posicionX = posicionX;
    this.posicionY = posicionY;
    this.update = function() {
        let context = myGame.context;
        context.fillStyle = color;
        context.fillRect(this.posicionX, this.posicionY, this.width, this.height);
    };
}

// actualization of the game 
function updateGameArea() {
    myGame.clear();
    updateobstacles();
    character.newPos();
    character.update();
    
    if (character.speedX != 0 || character.speedY!=0){
        updatePointTable();
    }else{
        maxPoints();
    }
}


//actualization of the array of obstacles
function updateobstacles(){
    for(var i =0; i < obstaculo.length ; i++){
        if(obstaculo[i].static == false){
            obstaculo[i].newPos();
            obstaculo[i].update();
            obstaculo[i].acumular();
        if(puntajeaux - valor <= 0){
            obstaculo[i].choque();
        }
        }else{
            obstaculo[i].update();
            obstaculo[i].choque();
        }
    }
}



var valor = 0;
function maxPoints(){
    var puntos = document.getElementById("puntaje");
    var aux = "<p>"+"puntaje maximo: "+valor+"</p>";
    puntos.innerHTML = aux;
}


function updatePointTable(){
    var puntos = document.getElementById("puntaje");
    aumentarValor();
    var aux = "<p>"+valor+ "</p>";
    puntos.innerHTML = aux;

}


//increase value of score and add an obstacle when reaching a specified number
function aumentarValor(){
    
    this.valor +=1;
    this.contador = 0;

    if (valor % 10 == 0){

        añadirobstaculo();
    }
}

function moveUp(value) {
    character.speedY -= value;
}

window.addEventListener(
    "keydown",
    (event) => {
        if (event.defaultPrevented) {
            return; // Do nothing if event already handled
          }

         switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        // Handle "back"
        moveDown(2);
        break;
      case "KeyW":
      case "ArrowUp":
        // Handle "forward"
        moveUp(300);
        break;
      case "KeyA":
      case "ArrowLeft":
        moveLeft(2);
        break;
      case "KeyD":
      case "ArrowRight":
        moveRight(2)
        break;
    }

    },
    true,
  );

function moveDown(value) {
    character.speedY += value;
}

function moveRight(value) {
    character.speedX += value;
}

function moveLeft(value) {
    character.speedX -= value;
}
