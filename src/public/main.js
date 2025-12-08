import { printMatrix } from './utils.js';
import { activateKeyboardEvents/* , activateTouchEvents */} from './keyBoardEvents.js';
import { GRID_SIZE } from './types.js';

const container_grid = document.querySelector('.grid-container');
const scoreDisplay = document.getElementById('score');

// Variables de Estado del Juego (Globales)
let board = [];
let score = 0;


//Dibujar matriz
function drawBoard() {
    const cells = container_grid.querySelectorAll('.grid-cell');
    let cellIndex = 0;

    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = cells[cellIndex];
            const value = board[r][c];
            
            // 1. Limpia y resetea las clases
            cell.textContent = ''; 
            cell.className = 'grid-cell'; 

            if (value > 0) {
                // Añadir clases
                cell.textContent = value;
                cell.classList.add('tile'); 
                cell.classList.add(`value-${value}`);
            }
            cellIndex++;
        }
    }
	//Actualizar puntuación
    if (scoreDisplay) {
        scoreDisplay.textContent = score;
    }
}


// --- UTILITIES (Funciones de Lógica) ---

function generateRandomEmptyCell()
{
	const empty_cells = [];

	//Recorro para encontrar las celdas vacías y las guardo en un array
	for (let i = 0; i < GRID_SIZE; i++) {
		for (let j = 0; j < GRID_SIZE; j++) {
			if (board[i][j] === 0)
				empty_cells.push({ x: j, y: i });
		}
	}

	if (empty_cells.length === 0) {
		console.log("No hay celdas vacías");
		return null;
	}
	
	//Selecciono una celda vacía al azar
	const random_index = Math.floor(Math.random() * empty_cells.length);
	return empty_cells[random_index];
}

//Crear estructura 
function createStructure() {
    if (container_grid.children.length > 0)
		return; 

	for (let i = 0; i < (GRID_SIZE * GRID_SIZE); i++) {
		const cell = document.createElement('div');
		cell.classList.add('grid-cell');
		container_grid.appendChild(cell);
	}
}

// Generar tiles inciales
function generateTiles() {
	const cell = generateRandomEmptyCell();
	if (!cell)
	{
		console.log("No se pudo generar un nuevo tile");
		return false;
	}
	let new_value = Math.random();
	if (new_value < 0.9)
		new_value = 2;
	else
		new_value = 4;
	board[cell.y][cell.x] = new_value;
	console.log("Nuevo tile en ", cell, " con valor ", new_value);
    return true;
}

// Callback para actualizar el score desde keyBoardEvents.js
function updateScore(value)
{
	if (value > score)
	{
		score = value;
		if (scoreDisplay)
		{
			scoreDisplay.textContent = score;
		}
	}
}

//El juego se ejecuta aquí, esta función está linkeada a un botón en el HTML
function startGame() {	
	board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    
    // Genero dos tiles iniciales y dibujo
    if (generateTiles() && generateTiles()) {
        drawBoard();
    } else {
        drawBoard(); 
    }
    
	printMatrix(board);
    
    // Pasamos la matriz (por referencia) y las funciones de callback necesarias.
	activateKeyboardEvents(board, updateScore, generateTiles, drawBoard);
	// activateTouchEvents(board, updateScore, generateTiles, drawBoard);
}

function restartGame()
{
	score = 0;
	startGame();
}

function main() {
	if (!container_grid) {
		console.log("error getting the grid-container");
		return;
	}
	createStructure();

	const start_btn = document.getElementById("start-btn");
	const restart_btn = document.getElementById("restart-btn")
	if (!start_btn || !restart_btn)
	{
		console.log("error getting the restart-btn or start-btn");
		return;
	}
	restart_btn.addEventListener("click", restartGame)
	start_btn.addEventListener("click", startGame); // creo que puedo cambiar el icono de estos para que se ponga en play al inciio y luego en restar al final
}

main();