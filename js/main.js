
let arrTypes = ['card--spade', 'card--heart', 'card--trevol', 'card--diamond'];
let cardArr = [];
let cardHtmlContainer = "cardContainer";


class Card {
    constructor(cardNumber, cardType){
        this.cardNumber = cardNumber;
        this.cardType = cardType;
    }
}


//Generador de numero aleatorio
function genRandomCardNumber(maxCardNumber){
    return Math.floor(Math.random() * maxCardNumber) + 1;
}

//Asignacion para la zota caballo y buchu
function getCardType(cardNumber){
    return (cardNumber === 11)? 'J' :
           (cardNumber === 12)? 'Q' :
           (cardNumber === 13)? 'K' : 
           (cardNumber === 1)? 'A' : cardNumber;
}

//generar el tipo de carta aleatorio
function getRandomCardType() {
    return Math.floor(Math.random() * 4);
}

//Insertar una nueva carta
function drawCard(newCell, card){
    newCell.innerHTML = `<div class="card ` + arrTypes[card.cardType] + `" id="cardNumber" value="` + getCardType(card.cardNumber) + `">
                                <div class="card__inner card__inner--centered">
                                    <div class="card__column">
                                        <div class="card__symbol"></div>
                                        
                                    </div>
                                </div>
                            </div>`;
}

//Pinta la fila con las cartas
function drawRow(newRow){
    for(let i = 0; i < cardArr.length; i++){
        let newCell = newRow.insertCell(-1);
        drawCard(newCell, cardArr[i]);
    }
}

//Generar el numero de la carta y su tipo
function genInitialRandomCards(cardNumbers){    
    for(let i = 0; i < cardNumbers; i++){

        let cardNumber = genRandomCardNumber(13);
        let cardType = getRandomCardType();

        let card = new Card(cardNumber, cardType);
        cardArr.push(card);
    }
}

//Insertar filas con el numero insertado por el usuario
function draw(){
    let cardNumbers = document.querySelector("#nroCartas").value;
    genInitialRandomCards(cardNumbers);
    let newRow = createRow();
    drawRow(newRow);
}


function createRow(){
    let cardContainer = document.getElementById(cardHtmlContainer);
    return cardContainer.insertRow(-1);  //insertRow agrega una fila y devuelve la referencia a esa nueva fila
}

function sort(){
    selectSort(cardArr);
}

/*
const selectSort = (arrCard) => {
    let index = 0;
    while (index < arrCard.length-1){
        for(let i = index+1; i < arrCard.length-1; i++) {
          if (arrCard[index].cardNumber > arrCard[i].cardNumber) {
            let aux = arrCard[index];
            arrCard[index] = arrCard[i];
            arrCard[i] = aux;
          }
        }
        let nuevaFila = createRow();
        drawRow(nuevaFila);
        index++;
    }
    return arrCard;    
};
*/


const selectSort = (arrCard) => {
    let index = 0;


    while (index < arrCard.length-1){

        let isModified = false;

        for(let i = index+1; i < arrCard.length; i++) {
          if (arrCard[index].cardNumber > arrCard[i].cardNumber) {
            let aux = arrCard[index];
            arrCard[index] = arrCard[i];
            arrCard[i] = aux;

            isModified = true;
          }
        }

        if(!isModified)
            break;

        let nuevaFila = createRow();
        drawRow(nuevaFila);
        index++;
    }
    return arrCard;    
};