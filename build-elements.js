const fs = require('fs-extra')
const concat = require('concat')
;(async function build() {
  const files = [
    './dist/cloudtasks/runtime.js',
    './dist/cloudtasks/polyfills.js',
    './dist/cloudtasks/scripts.js',
    './dist/cloudtasks/main.js'
  ]
  await fs.ensureDir('public')
  await concat(files, 'public/cloudtasks-image.js')
  await fs.copyFile('./public/cloudtasks-image.js', 'dist/cloudtasks-image.js')
})()
