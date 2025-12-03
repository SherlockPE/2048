import { printMatrix } from './utils.js';
import { activateKeyboardEvents } from './keyBoardEvents.js';
import { GRID_SIZE } from './types.js';

const container_grid = document.querySelector('.grid-container');

//Variables globales del juego
// const GRID_SIZE = 4;
// let score = 0;

//Utilidades

function generateRandomEmptyCell(matrix)
{
	const empty_cells = [];

	//Recorro para encontrar las celdas vacías y las guardo en un array
	for (let i = 0; i < GRID_SIZE; i++) {
		for (let j = 0; j < GRID_SIZE; j++) {
			if (matrix[i][j] === 0)
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
	for (let i = 0; i < (GRID_SIZE * GRID_SIZE); i++) {
		const cell = document.createElement('div');
		cell.classList.add('grid-cell');
		cell.textContent = i + 1;
		container_grid.appendChild(cell);
	}
}

// Generar tiles inciales
function generateTiles(matrix) {
	const cell = generateRandomEmptyCell(matrix);
	if (!cell)
	{
		console.log("No se pudo generar un nuevo tile");
		return;
	}
	let new_value = Math.random() 
	if (new_value < 0.9)
		new_value = 2;
	else
		new_value = 4;
	matrix[cell.y][cell.x] = new_value;
	console.log("Nuevo tile en ", cell, " con valor ", new_value);
}

// Limpiar matriz
function clear_matrix(board) {
	for (let i = 0; i < board.length; i++) {
		board[i].fill(0);
	}
}

//El juego se ejecuta aquí, esta función está linkeada a un botón en el HTML
function startGame() {	
	let matrix = (Array(GRID_SIZE).fill(0)).map(new_cells => Array(GRID_SIZE).fill(0));
	var score = 0;
	clear_matrix(matrix);
	generateTiles(matrix);
	generateTiles(matrix);
	printMatrix(matrix);
	activateKeyboardEvents(matrix, score);
}



function main() {
	if (!container_grid) {
		console.log("error getting the grid-container");
		return;
	}
	createStructure();

	const restart_btn = document.getElementById("restart-btn");
	const start_btn = document.getElementById("start-btn");
	if (!restart_btn || !start_btn)
	{
		console.log("error getting the restart-btn or start-btn");
		return;
	}
	start_btn.addEventListener("click", startGame);
}

main();