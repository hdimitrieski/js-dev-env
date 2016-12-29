import path from 'path';
const pkg = require('../package.json');

const base = path.resolve(__dirname, '..');

const basePath = (...dirNames) => {
  let dirPath = path.join(base, ...dirNames);

  return (fileName = '') => path.join(dirPath, fileName);
}

const config = {
  projectDirectory: base,
  sourceDirirectory: 'src',
  distDirectory: 'dist',
  publicDirectory: 'public',
  publicPath: '/'
};

config.path = {
  project: basePath(),
  source: basePath(config.sourceDirirectory),
  dist: basePath(config.distDirectory),
  public: basePath(config.publicDirectory)
};

config.getNodeModules = () => Object.keys(pkg.dependencies);

export default config;
