require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/routes');
const limiter = require('./middlewares/limiter');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(requestLogger);
app.use(errorLogger);

app.use(router);

app.use(express.json());

app.use(cors());
app.use(cors(corsOptions));

app.use(helmet());

app.use(limiter);

app.use(cookieParser());

app.use(errors());

module.exports = { PORT, MONGO_URL };

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`Подключен к порту ${PORT}`);
});
