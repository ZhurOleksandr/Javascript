# Практична робота 10.2 — GitHub User Explorer

## Використані API
- `GET https://api.github.com/users/{username}`
- `GET https://api.github.com/users/{username}/repos`
- `GET https://api.github.com/repos/{owner}/{repo}`
- `GET https://api.github.com/repos/{owner}/{repo}/readme`
- `GET https://api.github.com/repos/{owner}/{repo}/contributors`

## Реалізовано
- Пошук користувача за username.
- Профіль користувача: avatar, name, bio, followers, following, public repos.
- Список репозиторіїв із сортуванням за stars, forks, updated.
- Деталі репозиторію: README, мова, contributors.
- Паралельне завантаження профілю та репозиторіїв через `Promise.all()`.
- `async/await` для всіх запитів.
- `try/catch/finally` для обробки помилок і UI states.
- Loading spinner.
- Обробка 404 і rate limit 403.

## Як запустити
1. Відкрити `index.html` у браузері.
2. Ввести GitHub username.
3. Натиснути `Search`.