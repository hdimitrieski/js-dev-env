import chalk from 'chalk';
import express from 'express';
import open from 'open';
import path from 'path';
import compression from 'compression';

/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const host = process.env.HOST ||'localhost';
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/users', (req, res) => {
  // This should call the prod db
  res.json([
    {
      id: 1,
      firstName: 'Hristijan',
      lastName: 'Dimitrieski',
      email: 'k@gmail.com'
    }
  ]);
});

app.listen(port, host, (err) => {
  if (err) {
    console.error(chalk.red(err));
  } else {
    console.log(chalk.blue('Listening at http://' + host + ':' + port));
    open('http://' + host + ':' + port);
  }
});
