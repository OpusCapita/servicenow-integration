// set node evn
process.env.NODE_ENV = 'test';

// register babel presets
require('babel-register')({
  presets: ['es2015', 'babel-preset-react', 'stage-0'],
  plugins: ['istanbul', 'transform-decorators-legacy']
});
