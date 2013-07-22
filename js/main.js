require.config({
	baseUrl: '',
	//urlArgs: "v=@Html.CorIpVersion()", // prevent caching
	paths: {
		/* Libraries */
		'compile': 'lib/tmpl'
	}
});

define('main', [
        'views/mainView'
    ], function (mainView) {
	new mainView();
});