import { GRID_SIZE } from './types.js';
import { printMatrix } from './utils.js';

function filterZeros(arr)
{
    return (arr.filter(value => value > 0));
}


function calculateMatrixValues(matrix, score)
{
    for (let i = 0; i < GRID_SIZE; i++)
    {
        let temp_arr = filterZeros(matrix[i]);
        for (let j = 0; j < GRID_SIZE - 1; j++)
        {
            let z = j + 1;
            if (temp_arr[j] === temp_arr[z])
            {
                temp_arr[j] = temp_arr[j] * 2;
                temp_arr[z] = 0;
                score += temp_arr[j];
                z++;
            }
        }
        temp_arr = filterZeros(temp_arr);
        matrix[i] = temp_arr;
    }
}

// Crear eventos del teclado:
// Creo que es mejor usay keyup que keydown para optimización de llamadas a la función
export function activateKeyboardEvents(matrix, score) {

	document.addEventListener("keyup", (ev) => {
		console.log("codigo de tecla ", ev.key);
		if (ev.code === "ArrowUp")
			console.log("Flecha de arriba");
		if (ev.code === "ArrowDown")
			console.log("Flecha de Abajo");
		if (ev.code === "ArrowLeft")
			calculateMatrixValues(matrix, score);
		if (ev.code === "ArrowRight")
			console.log("Flecha de derecha");
        printMatrix(matrix);
	});
}