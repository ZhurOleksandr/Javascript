# Практична робота 11 — Класи та ООП

## Класи
### Vehicle
Поля:
- `brand`
- `model`
- `year`
- `mileage`
- `fuelLevel` (через приватне поле `#fuelLevel`)

Методи:
- `drive(distance)`
- `refuel(amount)`
- `getMaintenance()`
- `getInfo()`

Статичні методи:
- `sortByMileage(items, desc)`
- `filterByYear(items, minYear)`
- `filterByMileage(items, maxMileage)`

### Car extends Vehicle
Додаткові поля:
- `doors`
- `transmission`

### Truck extends Vehicle
Додаткові поля:
- `loadCapacity`
- `isLoaded` (через приватне поле `#isLoaded`)

### Motorcycle extends Vehicle
Додаткове поле:
- `motoType`

### Fleet
Функції:
- додавання транспорту
- видалення транспорту
- отримання елемента за ID
- статистика по автопарку

## UI
У браузері можна:
- додавати транспортні засоби;
- переглядати список автопарку;
- фільтрувати за типом, роком і пробігом;
- дивитися статистику;
- виконувати drive/refuel/maintenance.

## Як запустити
1. Відкрити `index.html` у браузері.
2. Для тестів відкрити `tests.html`.