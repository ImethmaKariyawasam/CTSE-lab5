const express = require('express');
const app = express();
app.use(express.json());

let items = [
  { id: 0, name: 'Book' },
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Phone' },
];
let idCounter = 3;

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const item = { id: idCounter++, name: req.body.name };
  items.push(item);
  res.status(201).json(item);
});

app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

app.listen(8081, () => console.log('Item Service running on port 8081'));
