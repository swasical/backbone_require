require.config({
	baseUrl: '',
	//urlArgs: "v=@Html.CorIpVersion()", // prevent caching
	paths: {
		/* Libraries */
		'compile': 'lib/tmpl',
		'views': 'js/views',
		'models': 'js/models'
	}
});

define('main', [
        'views/mainView'
    ], function (mainView) {
	new mainView();
});