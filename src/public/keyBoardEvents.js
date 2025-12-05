import { GRID_SIZE } from './types.js';
import { printMatrix } from './utils.js'; // Está bueno para el debug


function filterZeros(arr)
{
    return arr.filter(value => value > 0);
}


function combine(compactRow, updateScore)
{
    let newRow = [];
    
    for (let i = 0; i < compactRow.length; i++)
    {
        if (i + 1 < compactRow.length && compactRow[i] === compactRow[i + 1])
        {
            const mergedValue = compactRow[i] * 2;
            newRow.push(mergedValue);
            updateScore(mergedValue);
            i++;
        }
        else
        {
            newRow.push(compactRow[i]);
        }
    }
    return newRow;
}

function fillZeros(combinedRow)
{
    const missingZeros = GRID_SIZE - combinedRow.length;
    const zeros = Array(missingZeros).fill(0);
    return combinedRow.concat(zeros);
}


function moveRowLeft(row, updateScore)
{
    const compactRow = filterZeros(row);
    const combinedRow = combine(compactRow, updateScore);
    const finalRow = fillZeros(combinedRow);
    return finalRow;
}


// Transponer la matriz 
function transposeMatrix(matrix) {
    const newMatrix = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            newMatrix[c][r] = matrix[r][c];
        }
    }
    return newMatrix;
}

//comprueba si el juego ya deberia acabarse
function checkGameOver(matrix) {
    for (let i = 0; i < GRID_SIZE; i++)
    {
        for (let j = 0; j < GRID_SIZE; j++)
        {
            if (matrix[i][j] === 0) return false;
        }
    }

    //comprobar posibles funciones
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const current = matrix[r][c];

            // fusión horizontal
            if (c < GRID_SIZE - 1 && current === matrix[r][c + 1]) return false;
            
            // fusión vertical 
            if (r < GRID_SIZE - 1 && current === matrix[r + 1][c]) return false;
        }
    }
    return true;
}


// chequeo si el juego debería acabar
function checkAndProcessMove(matrix, boardChanged, generateTiles, drawBoard) {
    if (boardChanged) {
        generateTiles();
        drawBoard();
        
        if (checkGameOver(matrix)) {
            alert("¡GAME OVER!"); // tengo que ponerlo en un texto en el dom, esto es un poco chafa
        }
    }
}


// Movimientos
function moveLeft(matrix, updateScore, generateTiles, drawBoard) {
    let boardChanged = false;
    
    for (let r = 0; r < GRID_SIZE; r++) {
        const originalRowString = JSON.stringify(matrix[r]); 
        
        const newRow = moveRowLeft(matrix[r], updateScore);
        matrix[r] = newRow;
        
        if (originalRowString !== JSON.stringify(newRow)) {
             boardChanged = true;
        }
    }
    
    checkAndProcessMove(matrix, boardChanged, generateTiles, drawBoard);
}


function moveRight(matrix, updateScore, generateTiles, drawBoard) {
    let boardChanged = false;
    
    for (let r = 0; r < GRID_SIZE; r++) {
        const originalRowString = JSON.stringify(matrix[r]);
        
        // 1. Copio y revierto la fila para simular movimiento a la izquierda ESTO ES IMPORTANTISSISMO
        let rowCopy = [...matrix[r]].reverse();
        
        // 2. Aplico la lógica de la funcion de mover a la izquierda
        let newRow = moveRowLeft(rowCopy, updateScore);
        
        // 3. Revertir de nuevo a la derecha
        newRow.reverse();
        
        matrix[r] = newRow;

        if (originalRowString !== JSON.stringify(newRow)) {
             boardChanged = true;
        }
    }
    
    checkAndProcessMove(matrix, boardChanged, generateTiles, drawBoard);
}


function moveUp(matrix, updateScore, generateTiles, drawBoard) {
    // 1. Transpongo la matrix, las columnas se vuelven filas
    let transposedMatrix = transposeMatrix(matrix);
    let boardChanged = false;

    for (let c = 0; c < GRID_SIZE; c++) {
        const originalColString = JSON.stringify(transposedMatrix[c]);
        
        // El movimiento hacia arriba es igual a mover a la izquierda cuando la he transpuestoo
        const newCol = moveRowLeft(transposedMatrix[c], updateScore);
        transposedMatrix[c] = newCol;

        if (originalColString !== JSON.stringify(newCol)) {
             boardChanged = true;
        }
    }
    
    //transpongo otra vez  para dejarlo como estaba antess
    const finalMatrix = transposeMatrix(transposedMatrix);
    for (let r = 0; r < GRID_SIZE; r++) {
        matrix[r] = finalMatrix[r];
    }
    
    checkAndProcessMove(matrix, boardChanged, generateTiles, drawBoard);
}


function moveDown(matrix, updateScore, generateTiles, drawBoard) {
    // 1. Transpongo la matrix, las columnas se vuelven filas
    let transposedMatrix = transposeMatrix(matrix);
    let boardChanged = false;

    for (let c = 0; c < GRID_SIZE; c++) {
        const originalColString = JSON.stringify(transposedMatrix[c]);

        let colCopy = [...transposedMatrix[c]].reverse();
        let newCol = moveRowLeft(colCopy, updateScore);
        newCol.reverse(); // Revertir de nuevo

        transposedMatrix[c] = newCol;

        if (originalColString !== JSON.stringify(newCol)) {
             boardChanged = true;
        }
    }
    
    // 2. Volver a transponer
    const finalMatrix = transposeMatrix(transposedMatrix);
    for (let r = 0; r < GRID_SIZE; r++) {
        matrix[r] = finalMatrix[r];
    }
    
    checkAndProcessMove(matrix, boardChanged, generateTiles, drawBoard);
}


//Key Handler

export function activateKeyboardEvents(matrix, updateScore, generateTiles, drawBoard) {

	//Prefiero evitar duplicados 
	document.removeEventListener("keyup", window.gameKeyHandler);

	// Definimos la función de manejo
	window.gameKeyHandler = (ev) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(ev.code)) {
            ev.preventDefault();
        }
        
		switch (ev.code) {
			case "ArrowLeft":
				moveLeft(matrix, updateScore, generateTiles, drawBoard);
				break;
			case "ArrowRight":
				moveRight(matrix, updateScore, generateTiles, drawBoard);
				break;
			case "ArrowUp":
				moveUp(matrix, updateScore, generateTiles, drawBoard);
				break;
			case "ArrowDown":
				moveDown(matrix, updateScore, generateTiles, drawBoard);
				break;
		}
	};

	// Agregamos el nuevo listener
	document.addEventListener("keyup", window.gameKeyHandler);
}