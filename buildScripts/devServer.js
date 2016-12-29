import chalk from 'chalk';
import express from 'express';
import httpProxy from 'http-proxy';
import open from 'open';
import path from 'path';
import projectConfig from '../config/project';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
/* eslint-disable no-console */

console.log(chalk.green('Starting app in dev mode...'));

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const app = express();
const proxy = httpProxy.createProxyServer();
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: projectConfig.path.source(),
    hot: true,
    noInfo: false,
    stats: {
      colors: true
    },
    lazy: false
  })
);

app.use(webpackHotMiddleware(compiler, {
  path: `${webpackConfig.output.publicPath}__webpack_hmr`
}));

app.use(express.static(projectConfig.path.public()));

app.use(express.static(projectConfig.path.dist()));

app.get('/', (req, res) => {
  res.sendFile(path.join(compiler.outputPath, 'index.html'));
});

// Any requests to localhost:3000/api is proxied
// to ...
app.all('*', function (req, res) {
  proxy.web(req, res, {
    target: 'http://localhost:3001'
  });
});

app.listen(port, host, (err) => {
  if (err) {
    console.error(chalk.red(err));
  } else {
    console.log(chalk.blue('Listening at http://' + host + ':' + port));
    open('http://' + host + ':' + port);
  }
});
