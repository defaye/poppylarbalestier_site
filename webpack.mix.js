let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .extract([
		'@finpo/vue2-recaptcha-invisible',
		'autosize',
		'axios',
		'bootstrap',
		'jquery',
		'lodash',
		'moment',
		'popper.js',
		'screenfull',
		'vue',
		'vue-mugen-scroll',
		'vue-template-compiler',
		'vuex'
   	])
   .sass('resources/sass/app.scss', 'public/css')
   .version();

mix.js('resources/js/admin.js', 'public/js')
   .sass('resources/sass/admin.scss', 'public/css')
   .version();
