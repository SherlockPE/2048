const container_grid = document.querySelector('.grid-container');

//Crear estructura 
function createStructure() {
	for (let i = 0; i < 16; i++) {
		const cell = document.createElement('div');
		cell.classList.add('grid-cell');
		cell.textContent = i + 1;
		container_grid.appendChild(cell);
	}
}

// Generar tiles inciales
function generateTiles()
{
	let number = Math.floor(Math.random() * 16);
	console.log("Número generado entre el 0 al 15: ", number);
}


function startGame()
{
	generateTiles();
}
// Crear eventos del teclado:
// Creo que es mejor usay keyup que keydown para optimización de llamadas a la función
document.addEventListener("keyup", (ev) => {
	console.log("codigo de tecla ", ev.key);
	if (ev.code === "ArrowUp")
		console.log("Flecha de arriba");
	if (ev.code === "ArrowDown")
		console.log("Flecha de Abajo");
	if (ev.code === "ArrowLeft")
		console.log("Flecha de izquierda");
	if (ev.code === "ArrowRight")
		console.log("Flecha de derecha");
});


function main() {
	if (!container_grid)
	{
		console.log("error getting the grid-container");
		return;
	}
	createStructure();
}

main();