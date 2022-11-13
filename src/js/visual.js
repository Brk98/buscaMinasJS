const bomPosition = [];


function mineClicked(mines, level){
    mines.map(function(mine){
        const sqareMine = document.getElementById(`${mine}`);
        sqareMine.classList.add('sqareBomb');
    });
}

function cleanClicked(x,y, matriz){
    document.getElementById(`${x},${y}`).classList.add('sqareClean');
    for (let i = -1; i <= 1; i++){
        for (let j= -1; j <= 1; j++){
            if(j==0 && i==0){
                continue;
            }
            try {//evitar errores en las esquinas o junto a los limites
                if(!document.getElementById(`${x+i},${y+j}`).classList.contains('descubierto')){
                    if(!document.getElementById(`${x+i},${y+j}`).classList.contains('flag')){
                        document.getElementById(`${x+i},${y+j}`).classList.add('sqareClean','descubierto');
                        if(matriz[x+i][y+j] == 0){
                            cleanClicked(x+i,y+j,matriz);
                        }else{
                            document.getElementById(`${x+i},${y+j}`).innerText = matriz[x+i][y+j];
                        }
                    }
                }
            } catch{}
        }
    }
}


export {mineClicked, cleanClicked};