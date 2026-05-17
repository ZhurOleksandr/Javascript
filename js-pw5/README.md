# Практична робота 5 — Об'єкти

## Структура даних
### User
Властивості:
- `id`
- `name`
- `email`
- `role`
- `createdAt`

Методи:
- `getInfo()`
- `updateProfile()`
- `isAdmin()`

### UserManager
Методи:
- `createUser(data)`
- `getUser(id)`
- `updateUser(id, data)`
- `deleteUser(id)`
- `getAllUsers()`
- `getUsersByRole(role)`

## Валідація
- Email перевіряється регулярним виразом.
- Ім'я має бути непорожнім рядком.
- Роль може бути лише `user` або `admin`.
- При помилках кидaються винятки `Error`.

## Як запустити
1. Відкрити `index.html` у браузері.
2. Для тестів відкрити `tests.html` у браузері.

## Технології
- ES6+
- Object methods
- `this`
- Destructuring
- Closures
- JSDoc

## Тести
У `tests.html` реалізовано браузерні unit-тести для всіх основних методів і перевірок.