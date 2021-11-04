const btn = document.querySelector(".btn");


//Avvio il gioco appena clicco il bottone.
btn.addEventListener("click", function(){
  play();
})



//La funzione play è quella globale.
//Determino il numero di celle a seconda del livello selezionato dall'utente. Serve il .value. 
//Ho dato i numeri 1-2-3 al value in HTML per indicare il rispettivo livello. Mi è utile per i calcoli.
//Nell'array difficultCell scrivo il numero totale di celle a seconda del value scelto.
//Mi serve ricavare un singolo valore dall'array. Creo cellNumbers che mi seleziona il valore corretto. Mi aiuto con difficult (è un numero dato nell'HTML)
//Calcolo le celle per riga. E' una radice quadrata. E' utile successivamente per quando dovrò aggiungere lo stile.

//Dichiaro l'array per le bombe ed il numero di bombe.
//Alla fine, creo la griglia richiamando la funzione.

function play() {
  const difficult = document.getElementById('menù-tendina').value;
  const difficultCell = [100,81,49];
  const cellNumbers = difficultCell[difficult - 1];
  const cellPerRow = Math.sqrt(cellNumbers);

  console.log ("array con i 3 livelli" ,difficultCell);
  console.log ("numero celle livello selezionato" ,cellNumbers);
  console.log ("celle per riga" ,cellPerRow);

  const NUM_BOMBS = 16;
  const bombs = generateBombs();
  const cellClicked = [];
  const MAX_TENTATIVI = cellNumbers - NUM_BOMBS;
  let tentativi = 0;
  const tentativiList = [];
  console.log ("Array del posizionamento delle bombe" ,bombs);
  

  document.querySelector('.main-wrapper').innerHTML = '';

  createGrid();
  




//Creo l'elemento e assegno la classe giusta per la griglia.
//Ciclo for: creo celle(sq) quante sono le cellNumbers(numero celle calcolato inizialmente).
//Dentro al ciclo utilizzo .style. Serve per aggiungere una specifica classe. In questo caso style e width con il calc, che cambiano a seconda del livello selezionato.
//L'innerHTML serve per inserire il numero(i) all'interno della cella.
//Successivamente, rimando alla funzione che mi gestisce il click della singola cella.
//Appendo la griglia al container.
//Appendo le celle alla griglia.

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

    sq.addEventListener("click" , handleClick);
    document.querySelector('.main-wrapper').append (grid);

    grid.append(sq);
    }


    
  }



  // E' la funzione che gestisce il click, aggiunge la classe "clicked"
  function handleClick(event){
    const cellValue = parseInt(event.target.innerText);

    if(bombs.includes(cellValue)){
      // FINE GIOCO
      endGame();
    }else{
      // verifico se il tentativo non è già stato fatto
      // se non è presente:
      if(!tentativiList.includes(cellValue)){
        // incremento il numero dei tentativi
        tentativi++;
        // aggiungo il tentativo dentro l'elenco
        tentativiList.push(cellValue);
        // aggiungo la classe clicked alla cella cliccata
        this.classList.add('clicked');

        // verifico se ho completato le celle
        if(tentativi === MAX_TENTATIVI) {
          // se sì 
          endGame();
        }
      }
      
    }
    
    
  }



  function endGame(){
    console.log('END GAME');
    
    
    const cells = document.getElementsByClassName('square');
    for (let i = 0; i < cells.length; i++) {
      
      if(bombs.includes(i + 1)){
        cells[i].classList.add('clickedError');
      }

      // elimino la possiblità di cliccare ancora
      cells[i].removeEventListener('click', handleClick);
      // posso rimuovere il click anche così: 
    }

    // messaggio di output
    let msg = '';
    // se ho vinto
    if(tentativi === MAX_TENTATIVI) {
      msg = "Complimenti! Hai vinto!!"
    }else{
      // se ho perso
      msg = `Hai perso! Hai fatto ${tentativi} tentativi`;
    }
    
    const output = document.createElement('div');
    output.innerHTML = `<br><h5 class="text-center">${msg}</h5>`;
    document.querySelector('.container').append(output);
  }





  //Funzione per generare l'array di Bombe Casuali
  function generateBombs(){
    const bombs = [];

    //Ciclo funziona fino a quando l'array di bombe diviene uguale al numero di bombe
    while (bombs.length < NUM_BOMBS){
      //Bomba, numero casuale. Da 1 al numero finale delle celle
      const bomb = RandomNum(1, cellNumbers);
      

      //Se il numero casuale NON è già incluso nell'array di bombe
      if (!bombs.includes(bomb)){

        //Pusho la bomba nell'array
        bombs.push(bomb);
        
        //Altrimenti rigenero un altro numero.
      }      
    }
    
    return bombs;
  }
  
  






  //Funzione per generare un numero casuale
  function RandomNum(min,max){
    let num = Math.floor(Math.random() * (max - min +1) + min);
    return num;
  }
}