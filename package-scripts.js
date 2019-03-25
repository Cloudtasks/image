module.exports = {
  scripts: {
    ng: 'ng',
    default: 'ng serve',
    test: 'ng test',
    lint: 'ng lint',
    e2E: 'ng e2e',
    dev: 'ng serve',

    build: {
      default: 'nps build.prod',
      prod: 'ng build --prod --output-hashing=none',
      lib: 'ng build'
    },
    package: {
      default: 'nps build.prod && nps package.pack && nps package.min',
      pack: 'cat dist/cloudtasks/{runtime,polyfills,scripts,main}.js > public/cloudtasks-image.js',
      min: 'cat dist/cloudtasks/{runtime,polyfills,scripts,main}.js | gzip > public/cloudtasks-image.js.gz'
    },
    'semantic-release': 'nps package && nps build.lib && semantic-release',
    commit: 'git-cz',
    prettier: 'prettier --write "./**/*.{js,ts,json,scss,css}"',

    serve: 'http-server -c-1 -g --gzip'
  }
}
