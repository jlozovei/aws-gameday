const config = {
  src: {
    root: './_src',

    css: './_src/css',
    html: './_src'
  },

  public: {
    root: './assets',

    css: './assets',
    html: './'
  },

  connect: {
    livereload: true,
    root: ['.'],
    host: 'localhost',
    port: 9999,
    name: 'Unicorn.Rentals'
  }
};

export default config;
