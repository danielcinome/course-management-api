const express = require('express');
const app = express();
const { db } = require('./models');

app.use((req, res, ) => {
  res.status(404).json({
    message: 'Route not found'
  })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: 'Internal server error',
    error: String(err)
  })
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at: ${PORT}`);
});