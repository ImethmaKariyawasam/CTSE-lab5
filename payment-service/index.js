const express = require('express');
const app = express();
app.use(express.json());

let payments = [];
let idCounter = 1;

app.get('/payments', (req, res) => {
  res.json(payments);
});

app.post('/payments/process', (req, res) => {
  const payment = { ...req.body, id: idCounter++, status: 'SUCCESS' };
  payments.push(payment);
  res.status(201).json(payment);
});

app.get('/payments/:id', (req, res) => {
  const payment = payments.find(p => p.id === parseInt(req.params.id));
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  res.json(payment);
});

app.listen(8083, () => console.log('Payment Service running on port 8083'));
