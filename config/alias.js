const path = require('path');

module.exports = {
  '@constants': path.resolve(__dirname, '../src/constants'),
  '@api': path.resolve(__dirname, '../src/api'),
  '@assets': path.resolve(__dirname, '../src/assets'),
  '@components': path.resolve(__dirname, '../src/components'),
  '@constants': path.resolve(__dirname, '../src/constants'),
  '@modules': path.resolve(__dirname, '../src/modules'),
  '@app': path.resolve(__dirname, '../src/modules/App'),
  '@store': path.resolve(__dirname, '../src/store'),
  '@reducers': path.resolve(__dirname, '../src/store/reducers'),
  '@actions': path.resolve(__dirname, '../src/store/actions'),
  '@utils': path.resolve(__dirname, '../src/utils'),
  '@styles': path.resolve(__dirname, '../src/styles')
};
