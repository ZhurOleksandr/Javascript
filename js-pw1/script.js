// Завдання №1 з тернарним оператором та обробкою помилок
function checkParity() {
    let userInput = prompt("Завдання 1\nВведіть число:");
    let num = Number.parseInt(userInput);
    
    let result = isNaN(num) 
        ? "Помилка: введіть число!" 
        : (num % 2 === 0 ? `${num} - парне число` : `${num} - непарне число`);
    
    alert(result);
}

// Завдання №2 з while циклом
function calculateSum() {
    console.log("\nЗавдання 2 (while цикл)");
    let sum = 0;
    let i = 1;
    
    while (i <= 100) {
        sum += i;
        console.log(`Число: ${i}, сума: ${sum}`);
        i++;
    }
    
    console.log(`Загальна сума: ${sum} (формула: n*(n+1)/2 = ${100*101/2})`);
}

// Завдання №3 з do-while циклом
function printNumbers() {
    console.log("\nЗавдання 3 (do-while)");
    let i = 1;
    do {
        console.log(i);
        i++;
    } while (i <= 100);
}

// Запуск усіх завдань
checkParity();
calculateSum();
printNumbers();