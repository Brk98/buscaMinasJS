//Clean and create a new matrix
function crearMatriz(valor, matriz){
    matriz = [];
    for (let i = 0; i < valor; i++) {
        matriz.push([]);
    }
    return fillMines(valor, matriz)
}
//Fill the mines
function fillMines(difficultySelect, matrix){
    //The total of sqares we have 10% of mines
    let mines = difficultySelect * difficultySelect * 0.2; 
    let minesPosition =[];
    for (let i = 0; i < mines; i++){
        let x;
        let y;
        do{
            x = Math.floor(Math.random() * difficultySelect);
            y = Math.floor(Math.random() * difficultySelect);
        }while(matrix[x][y])
        matrix[x][y] = -1;
        minesPosition.push(`${x},${y}`);
    }
    return numberSquare(matrix, difficultySelect, minesPosition);
}

//Numbers the squares
function numberSquare(matrix, difficultySelect, minesPosition){
    for(let x=0; x < difficultySelect; x++){
        for(let y=0; y < difficultySelect; y++){
            //Recorre posiciones al rededor
            if(!matrix[x][y]){
                let contador = 0;
                for (let i = -1; i <= 1; i++){
                    for (let j= -1; j <= 1; j++){
                        if(j==0 && i==0){
                            continue;
                        }
                        try {//evitar errores en las esquinas o junto a los limites
                            if(matrix[x + i][y + j] == -1){
                                contador++;
                            }
                        } catch{}
                    }
                }
                matrix[x][y] = contador;
            }
        }
    }
    return {matrix, minesPosition};
}

export {crearMatriz}