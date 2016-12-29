import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';

/* eslint-disable no-console */

process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production...'));

const compiler = webpack(webpackConfig);

compiler
  .run(
    (err, stats) => {
      if (err) {
        console.log(chalk.red(err));
        return 1;
      }

      const jsonStats = stats.toJson();

      if (jsonStats.hasErrors) {
        return jsonStats.errors.map(
          error => console.log(chalk.red(error))
        );
      }

      if (jsonStats.hasWarnings) {
        console.log(chalk.yellow('Webpack warnings'));

        return jsonStats.warnings.map(
          warning => console.log(chalk.yellow(warning))
        );
      }

      console.log(`Webpack stats: ${stats}`);

      console.log(chalk.green('Your application has been built for production and written to /dist'));

      return 0;
    }
  );
