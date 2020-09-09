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

app.delete('/api/v1/birds/:id', async (req, res, next) => {
  try {
    const deleteBird = await Bird.delete(req.params.id);
    res.send(deleteBird);
  } catch (error) {
    next(error);
  }
});

app.put('/api/v1/birds/:id', async (req, res, next) => {
  try {
    const updateBird = await Bird.update(req.params.id);
    res.send(updateBird);
  } catch (error) {
    next(error);
  }
});

app.get('/api/v1/birds/:id', async (req, res, next) => {
  try {
    const getBirdById = await Bird.findById(req.params.id);
    res.send(getBirdById);
  } catch (error) {
    next(error);
  }
});

app.get('/api/v1/birds', async (req, res, next) => {
  try {
    const getBird = await Bird.find(req.body);
    res.send(getBird);
  } catch (error) {
    next(error);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
