// get input from the user through the terminal
const prompt = require('prompt-sync')({ sigint: true });
//Clear the terminal screen
const clear = require('clear-screen');
const c = console.log;

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;
const maxHole = (row * col) / 2 //I decided to set the number of hole to half the field so that there is a path to the carrot and easier to test
const field = [[]];

const specCharPattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const numberPattern = /\d/;
const justWordsPAttern = /\b[A-Za-z]+\b/g

const testInput = (input, pattern) => pattern.test(input);
const matchInput = (input, pattern) => input.match(pattern);
const testforSpace = (input) => input.search(" ") > 0 ? true : false;


let startDate;
let endDate;
let timeDiff;

let curRow = 0;
let curCol = 0;

const generateField = () => {
    for (let i = 0; i < row; i++) {
        field[i] = [];

        for (let j = 0; j < col; j++) {
            field[i][j] = fieldCharacter;
        }
    }
    //c(field);
}

const print = () => {
    clear();
    let displayField = field.map(row => row.join("")).join("\n");
    c(displayField);


}

const randomiseHoles = () => {

    let noOfHoles = Math.floor(Math.random() * maxHole);

    for (let i = 0; i < noOfHoles; i++) {

        let isDone = false;
        do {
            let holeRow = Math.floor(Math.random() * 10);
            let holeCol = Math.floor(Math.random() * 10);

            if ((field[holeRow][holeCol] != hole) && (field[holeRow][holeCol] != hat)) {
                field[holeRow][holeCol] = hole;
                isDone = true;
            }
        } while (isDone == false);

    }

}


const randomiseCarrot = () => {

    let isDone = false;
    do {
        let carrotRow = Math.floor(Math.random() * 10);
        let carrotCol = Math.floor(Math.random() * 10);

        if (field[carrotRow][carrotCol] != hole) {
            field[carrotRow][carrotCol] = hat;
            isDone = true;
        }
    } while (isDone == false);



}


const removeCurPos = (row, col) => {
    field[row][col] = fieldCharacter;

}

const printCurPos = () => {

    field[curRow][curCol] = pathCharacter;
    print();

}

const setupDisplayField = () => {
    generateField();
    randomiseHoles();
    randomiseCarrot();
    printCurPos();
    print();

}

const promptDirection = () => {

    let userInput = prompt(`Which Way? `);

    if (matchInput(userInput, justWordsPAttern) && !testInput(userInput, specCharPattern) && !testforSpace(userInput)) {

        removeCurPos(curRow, curCol);

        if (userInput.toUpperCase() == "U") {

            curRow--;

            if (curRow < 0) {
                c(`Out of bounds - Game End!`);
                return true;

            } else if (field[curRow][curCol] == hat) {
                printCurPos();
                c(`Congrats, you found your hat!`);

                endDate = new Date();
                timeDiff = endDate - startDate;
                let diffMinutes = Math.floor(timeDiff / (1000 * 60));
                let diffSeconds = Math.floor((timeDiff / 1000)%60);
                c(`You took ${diffMinutes} minutes and ${diffSeconds} seconds`)                
               
                return true;

            } else if (field[curRow][curCol] == hole) {
                printCurPos();
                c(`Sorry, you fell down a hole!`);
                return true;

            } else {
                printCurPos();

                return false;
            }
        } else if (userInput.toUpperCase() == "D") {

            curRow++;
            //c(`field[curRow, curCol] : ${field[curRow][curCol]}`);
            //c(`field[curRow, curCol] : ${hole}`);

            if (curRow >= row) {
                c(`Out of bounds - Game End!`);
                return true;

            } else if (field[curRow][curCol] == hat) {
                printCurPos();
                c(`Congrats, you found your hat!`);

                endDate = new Date();
                timeDiff = endDate - startDate;
                let diffMinutes = Math.floor(timeDiff / (1000 * 60));
                let diffSeconds = Math.floor((timeDiff / 1000)%60);
                
                c(`You took ${diffMinutes} minutes and ${diffSeconds} seconds`)


                return true;

            } else if (field[curRow][curCol] == hole) {
                printCurPos();

                c(`Sorry, you fell down a hole!`);
                return true;

            } else {
                printCurPos();
                return false;
            }
        
        } else if (userInput.toUpperCase() == "L") {

            curCol--;

            if (curCol < 0) {
                c(`Out of bounds - Game End!`);
                return true;

            } else if (field[curRow][curCol] == hat) {
                printCurPos();
                c(`Congrats, you found your hat!`);
                
                endDate = new Date();
                timeDiff = endDate - startDate;
                let diffMinutes = Math.floor(timeDiff / (1000 * 60));
                let diffSeconds = Math.floor((timeDiff / 1000)%60);
                
                c(`You took ${diffMinutes} minutes and ${diffSeconds} seconds`)                
                
                return true;

            } else if (field[curRow][curCol] == hole) {
                printCurPos();
                c(`Sorry, you fell down a hole!`);
                return true;

            } else {
                printCurPos();
                return false;
            }
        
        } else if (userInput.toUpperCase() == "R") {

            curCol++;

            if (curCol >= col) {
                c(`Out of bounds - Game End!`);
                return true;

            } else if (field[curRow][curCol] == hat) {
                printCurPos();
                c(`Congrats, you found your hat!`);
                endDate = new Date();
                timeDiff = endDate - startDate;
                let diffMinutes = Math.floor(timeDiff / (1000 * 60));
                let diffSeconds = Math.floor((timeDiff / 1000)%60);
                
                c(`You took ${diffMinutes} minutes and ${diffSeconds} seconds`)

                return true;

            } else if (field[curRow][curCol] == hole) {
                printCurPos();
                c(`Sorry, you fell down a hole!`);
                return true;

            } else {
                printCurPos();
                return false;
            }
               
        
        } else if (userInput.toUpperCase() == "D") {

            curRow++;
            //c(`field[curRow, curCol] : ${field[curRow][curCol]}`);
            //c(`field[curRow, curCol] : ${hole}`);

            if (curRow >= row) {
                c(`Out of bounds - Game End!`);
                return true;

            } else if (field[curRow][curCol] == hat) {
                c(`Congrats, you found your hat!`);
                endDate = new Date();
                timeDiff = endDate - startDate;
                let diffMinutes = Math.floor(timeDiff / (1000 * 60));
                let diffSeconds = Math.floor((timeDiff / 1000)%60);
                
                c(`You took ${diffMinutes} minutes and ${diffSeconds} seconds`)

                return true;

            } else if (field[curRow][curCol] == hole) {

                c(`Sorry, you fell down a hole!`);
                return true;

            } else {
                printCurPos();
                return false;
            }



        } else {
            c(`Enter (u, d, l or r) `);
            return false;
        }

    } else{

        c(`Enter (u, d, l or r) `);
        return false;

    }   

}

const playGame = () => {
    let isDone = false;
    startDate = new Date();

    while (isDone == false) {

        isDone = promptDirection();

    }
}

setupDisplayField();
playGame();



