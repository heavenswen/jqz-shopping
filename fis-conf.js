var name = 'jqz-shopping';

fis.match('::packager', 
    { postpackager: fis.plugin('loader', { allInOne: false })
});
fis.match('**', {
  deploy: [
    fis.plugin('skip-packed'),

    fis.plugin('local-deliver', {
      to: 'lib'
    })
  ]
})
fis.match('**',{
	loaderLang: false,
	release:false
})
//js压缩
fis.match(name+'.js',{
	optimizer: fis.plugin('uglify-js'),
	release:name+'.min.js'
})