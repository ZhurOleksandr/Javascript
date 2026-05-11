// Завдання 1. Квадрати чисел
function squaresArray(numbers) {
    return numbers.map(num => num * num);
}

// Завдання 2. Максимальне число
function findMax(numbers) {
    if (numbers.length === 0) return null;
    return Math.max(...numbers);
}

// Завдання 3. Унікальні рядки
function uniqueStrings(strings) {
    return [...new Set(strings)];
}

// Тестування функцій
console.log("\n1. Квадрати чисел:");
let nums1 = [1, 2, 3, 4];
console.log("Вхід:", nums1);
console.log("Результат:", squaresArray(nums1));
console.log("Очікувано: [1, 4, 9, 16]");

console.log("\n2. Максимальне число:");
let nums2 = [3, 5, 1, 8, 4];
console.log("Вхід:", nums2);
console.log("Максимум:", findMax(nums2));
console.log("Очікувано: 8");

console.log("\n3. Унікальні рядки:");
let strings = ["a", "b", "a", "c", "b"];
console.log("Вхід:", strings);
console.log("Унікальні:", uniqueStrings(strings));
console.log("Очікувано: ['a', 'b', 'c']");

// Додаткові тести
console.log("\nДОДАТКОВІ ТЕСТИ:");
console.log("Порожній масив (квадрати):", squaresArray([]));
console.log("Порожній масив (максимум):", findMax([]));
console.log("Унікальні числа:", uniqueStrings([1, 2, 1, 3, 2, 4]));