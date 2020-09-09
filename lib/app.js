const express = require('express');
const Bird = require('./models/bird');
const app = express();

app.use(express.json());

app.post('/api/v1/birds', async (req, res, next) => {
  try {
    const createdBird = await Bird.insert(req.body);
    res.send(createdBird);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/v1/birds:id', async (req, res, next) => {
  try {
    const deleteBird = await Bird.insert(req.body.id);
    res.send(deleteBird);
  } catch (error) {
    next(error);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
