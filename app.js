const express = require('express');
const sequelize = require('./config/database/config');
const router = require('./routes/router');

const app = express();

// Middleware untuk meng-handle JSON body dari request
app.use(express.json());

// Gunakan router sebagai middleware utama
app.use(router);

// Sambungkan ke database dan sinkronkan model-model
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync();
  })
  .then(() => {
    console.log('All models synchronized');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Mulai aplikasi di port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
