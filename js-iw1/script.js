// 1. Створення та ініціалізація змінних
let name = "Іван";
let age = 20;
let isStudent = true;
let favoriteColor = "синій";

console.log("1. Змінні:");
console.log("name:", name);
console.log("age:", age);
console.log("isStudent:", isStudent);
console.log("favoriteColor:", favoriteColor);
console.log("");

// 2. Операції з змінними
let num1 = 10;
let num2 = 20;
let sum = num1 + num2;
let difference = num1 - num2;
let product = num1 * num2;
let quotient = num1 / num2;

console.log("2. Операції з числами:");
console.log("sum:", sum);
console.log("difference:", difference);
console.log("product:", product);
console.log("quotient:", quotient);
console.log("");

// 3. Конкатенація рядків
let firstName = "Олександр";
let lastName = "Жур";
let fullName = firstName + " " + lastName;

console.log("3. Конкатенація рядків:");
console.log("fullName:", fullName);
console.log("");

// 4. Перетворення типів
let numberAsString = "123";
let number = Number.parseInt(numberAsString);
let stringNumber = String(number);

console.log("4. Перетворення типів:");
console.log("number:", number);
console.log("stringNumber:", stringNumber);
console.log("");

// 5. Логічні операції
let isSunny = true;
let isRaining = false;
let andResult = isSunny && isRaining;
let orResult = isSunny || isRaining;

console.log("5. Логічні операції:");
console.log("isSunny && isRaining:", andResult);
console.log("isSunny || isRaining:", orResult);
console.log("");

// 6. Використання оператора typeof
let x = 42;
let y = "Hello";
let z = [1, 2, 3];

console.log("6. Типи даних:");
console.log("typeof x:", typeof x);
console.log("typeof y:", typeof y);
console.log("typeof z:", typeof z);
console.log("");

// Додаткові перевірки
let userAge = 25;
console.log("Додаткові перевірки:");
console.log("Користувач повнолітній (age >= 18):", userAge >= 18);

let price = 99.99;
console.log("price є числом:", typeof price === "number");

let email = "test@example.com";
let isValidEmail = email.includes("@") && email.includes(".");
console.log("email валідний:", isValidEmail);

let password = "MyPass123!";
let isValidPassword = password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
console.log("password валідний:", isValidPassword);
console.log("");