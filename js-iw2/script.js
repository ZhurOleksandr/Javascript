// Завдання 1. Таблиця множення для числа 5
console.log("\n1. Таблиця множення для 5:");
for (let i = 1; i <= 10; i++) {
    console.log(`5 * ${i} = ${5 * i}`);
}

// Завдання 2. Числа, які діляться на 3 або 5 (від 1 до 50)
console.log("\n2. Числа, які діляться на 3 або 5 (1-50):");
for (let i = 1; i <= 50; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
        console.log(i);
    }
}

// Завдання 3. Перевірка паліндрому
function isPalindrome(num) {
    // Перетворюємо число в рядок
    let str = num.toString();
    let reversed = str.split('').reverse().join('');
    return str === reversed;
}

// Інтерактивна перевірка
let userNumber = prompt("3. Введіть число для перевірки паліндрому:");
let testNum = parseInt(userNumber);

console.log("\n3. Перевірка паліндромів:");
console.log("Тестові приклади:");
console.log("12321:", isPalindrome(12321) ? "ПАЛІНДРОМ" : "не паліндром");
console.log("12345:", isPalindrome(12345) ? "ПАЛІНДРОМ" : "не паліндром");
console.log("1221:", isPalindrome(1221) ? "ПАЛІНДРОМ" : "не паліндром");

if (!isNaN(testNum)) {
	let result = "Ваше число " + testNum + ": " + (isPalindrome(testNum) ? "ПАЛІНДРОМ" : "не паліндром");
    console.log(result);
	alert(result);
} else {
    console.log("Введено некоректне число!");
}

// Додаткові приклади паліндромів
console.log("\nДодаткові паліндрами:");
let palindromes = [121, 3443, 12321, 111, 7];
palindromes.forEach(num => {
    console.log(`${num}: ${isPalindrome(num) ? "ПАЛІНДРОМ" : "не паліндром"}`);
});