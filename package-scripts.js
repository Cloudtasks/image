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
      default: 'nps build && nps package.pack && nps package.min',
      pack: 'node build-elements.js',
      min: {
        default: 'nps package.min.modern && nps package.min.legacy',
        modern:
          'cat public/cloudtasks-image.js | gzip > public/cloudtasks-image.js.gz && cp public/cloudtasks-image.js.gz dist/cloudtasks-image.js.gz',
        legacy:
          'cat public/cloudtasks-image.legacy.js | gzip > public/cloudtasks-image.legacy.js.gz && cp public/cloudtasks-image.legacy.js.gz dist/cloudtasks-image.legacy.js.gz'
      }
    },
    'semantic-release': 'nps package && semantic-release',
    commit: 'git-cz',
    prettier: 'prettier --write "./**/*.{js,ts,json,scss,css}"',

    serve: 'http-server -c-1 -g --gzip'
  }
}
