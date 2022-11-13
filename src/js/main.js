import { crearMatriz} from "./logic.js";
import { mineClicked, cleanClicked } from "./visual.js";
/*Variables Logicas*/
const difficultyLevel = ['grid8','grid16'];
const sqareFont = ['sqareNumber8','sqareNumber16'];
let matriz = [];
let mines = [];
/*Variables Visuales*/
const btnStart = document.querySelector('.start');
const difficultySelect = document.querySelector('.difficulty-select');
const board = document.querySelector('.board');
/*First Start*/
createBoard();

difficultySelect.addEventListener('change',()=>{
    createBoard();
})
/*Disable right click*/
window.oncontextmenu = (e) => {
    e.preventDefault();
  }
/*Create board*/
function createBoard(){
    let variables =crearMatriz(difficultySelect.value);
    matriz = variables.matrix;
    mines = variables.minesPosition;
    console.log(variables);
    board.classList.remove(difficultyLevel[1],difficultyLevel[0]);
    board.classList.remove(sqareFont[1],sqareFont[0]);
    board.classList.toggle(`grid${difficultySelect.value}`);
    board.classList.toggle(`sqareNumber${difficultySelect.value}`);
    fillBoard(difficultySelect.value);
}

/*Creates sqares*/ 
function addSqare(positionX, positionY){
    const sqare = document.createElement('div');
    sqare.classList.add('sqare','sqarenoTouch', 'cubierto');

    sqare.setAttribute('id',`${positionX},${positionY}`);
    sqare.addEventListener('click',()=>{
        sqare.classList.remove('cubierto');
        sqare.classList.add('descubierto');
        if(matriz[positionX][positionY] > 0){
            sqare.innerText = matriz[positionX][positionY];
            sqare.classList.add('sqareNumber','sqareClean');
            sqare.classList.add('opened');
        }else if(matriz[positionX][positionY] == -1){
            mineClicked(mines, difficultySelect.value);
        }
        else if(matriz[positionX][positionY] == 0){

            cleanClicked(positionX, positionY, matriz);
        }
        
    })
    sqare.addEventListener('contextmenu', function(ev) {
        sqare.classList.toggle('flag');
        return false;
    }, false);
    return {sqare};
}
/*Funciones visuales*/
function fillBoard(difficulty){
    board.innerHTML = '';
    for (let i = 0; i < difficultySelect.value; i++) {
        for(let j=0; j< difficultySelect.value; j++){
            board.appendChild(addSqare(i,j).sqare);
        }
    }
}
