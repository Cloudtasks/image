module.exports = {
  scripts: {
    ng: 'ng',
    default: 'ng serve',
    test: 'ng test',
    lint: 'ng lint',
    e2e: 'ng e2e',
    dev: 'ng serve',

    ci: 'ng test --watch=false && ng e2e',

    build: 'ng build --prod --output-hashing=none',
    package: {
      default: 'nps build && ls -la ./dist/cloudtasks && nps package.pack && nps package.min',
      pack: 'cat ./dist/cloudtasks/{runtime,polyfills,scripts,main}.js > ./public/cloudtasks-image.js',
      min: 'cat ./dist/cloudtasks/{runtime,polyfills,scripts,main}.js | gzip > ./public/cloudtasks-image.js.gz'
    },
    'semantic-release': 'nps package && semantic-release',
    commit: 'git-cz',
    prettier: 'prettier --write "./**/*.{js,ts,json,scss,css}"',

    serve: 'http-server -c-1 -g --gzip'
  }
}
