// server.js
const jsonServer = require('json-server');
const express = require('express');
const server = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(express.json());

// Получаем объект пользователя из БД по заголовку Authorization = username
function getUser(req) {
  const username = req.headers.authorization;
  if (!username) return null;
  return router.db
    .get('users')
    .find({ username })
    .value();
}

// ПЕРЕПРИЁМКА GET /items — фильтрация по ownerId
server.get('/items', (req, res) => {
  const user = getUser(req);
  if (!user) {
    return res.status(401).jsonp({ error: 'Не авторизован' });
  }

  if (user.role === 'admin') {
    // admin видит всё
    const all = router.db.get('items').value();
    return res.jsonp(all);
  }

  // остальным — только свои (ownerId === user.id)
  const own = router.db
    .get('items')
    .filter(item => item.ownerId === user.id)
    .value();

  return res.jsonp(own);
});

// ПЕРЕПРИЁМКА GET /items/:id — проверяем ownerId или role=admin
server.get('/items/:id', (req, res) => {
  const user = getUser(req);
  if (!user) {
    return res.status(401).jsonp({ error: 'Не авторизован' });
  }

  const item = router.db
    .get('items')
    .find({ id: req.params.id })
    .value();

  if (!item) {
    return res.status(404).jsonp({ error: 'Не найдено' });
  }

  if (user.role === 'admin' || item.ownerId === user.id) {
    return res.jsonp(item);
  }

  return res.status(403).jsonp({ error: 'Доступ запрещён' });
});

// Остальные маршруты (POST, PUT, PATCH, DELETE) — штатно
server.use(router);

server.listen(5000, () => {
  console.log('JSON-Server + ACL запущен на порту 5000');
});
