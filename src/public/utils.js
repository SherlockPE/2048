export function printMatrix(matrix)
{
	console.log("=========Matriz Actual=========");
	console.log(matrix.map(row => row.join('\t')).join('\n'));
	console.log("================================");
}