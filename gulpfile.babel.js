'use strict';

import config from './gulp.config';

import gulp from 'gulp';
import plumber from 'gulp-plumber';

import connect from 'gulp-connect';

import htmlmin from 'gulp-htmlmin';

import postcss from 'gulp-postcss';
import precss from 'precss';
import cssnano from 'cssnano';
import rucksack from 'rucksack-css';
import postcssPresetEnv from 'postcss-preset-env';
import postcssCustomSelectors from 'postcss-custom-selectors';
import postcssCustomProperties from 'postcss-custom-properties';

const processors = [precss(), postcssPresetEnv(), rucksack(), postcssCustomSelectors(), postcssCustomProperties(), cssnano()];

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// task css
gulp.task('css', () => {
  return gulp
    .src(`${config.src.css}/*.css`)
    .pipe(plumber())
    .pipe(postcss(processors))
    .on('error', handleError)
    .pipe(gulp.dest(config.public.css))
    .pipe(connect.reload());
});

// task htmlmin
gulp.task('htmlmin', () => {
  return gulp
    .src(`${config.src.html}/*.html`)
    .pipe(plumber())
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .on('error', handleError)
    .pipe(gulp.dest(config.public.html));
});

// default task
gulp.task('default', () => {
  // create local server
  connect.server(config.connect);

  // watch all css files
  gulp.watch(`${config.src.css}/**/*.css`, gulp.series('css'));

  // watch all css files
  gulp.watch(`${config.src.html}/**/*.html`, gulp.series('htmlmin'));
});
