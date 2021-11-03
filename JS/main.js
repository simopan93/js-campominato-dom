const btn = document.querySelector(".btn");

btn.addEventListener("click", function(){
  play();
})


function play() {
  const difficult = document.getElementById('menù-tendina').value;
  const difficultCell = [100,81,49];
  const cellNumbers = difficultCell[difficult - 1];
  const cellPerRow = Math.sqrt(cellNumbers);


  console.log ("array con i 3 livelli" ,difficultCell);
  console.log ("numero celle livello selezionato" ,cellNumbers);
  console.log ("celle per riga" ,cellPerRow);

  document.querySelector('.main-wrapper').innerHTML = '';

  createGrid();
  








function createGrid(){
  const grid = document.createElement("div");
  grid.className = "container";
  console.log(grid)
  
  for (let i = 1; i <= cellNumbers; i++){
    const sq = document.createElement ("div");
    sq.className = "square";
    const cellSize = `calc(100% / ${cellPerRow})`;
    sq.style.width = cellSize;
    sq.style.height = cellSize;
    sq.innerHTML = `${i}`;
    grid.append(sq);
    }
    document.querySelector('.main-wrapper').append (grid);
}

}