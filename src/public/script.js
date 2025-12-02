const container_grid = document.querySelector('.grid-container');

function createStructure()
{
    for (let i = 0; i < 16; i++)
    {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.textContent = i + 1;
        container_grid.appendChild(cell);
    }
}

if (!container_grid)
    console.log("error getting the grid-container");
else
    createStructure();
