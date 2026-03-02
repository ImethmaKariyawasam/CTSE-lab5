const express = require('express');
const app = express();
app.use(express.json());

let orders = [];
let idCounter = 1;

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.post('/orders', (req, res) => {
  const order = { ...req.body, id: idCounter++, status: 'PENDING' };
  orders.push(order);
  res.status(201).json(order);
});

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.listen(8082, () => console.log('Order Service running on port 8082'));
