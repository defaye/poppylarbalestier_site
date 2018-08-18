<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name') }}</title>

        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" integrity="sha256-HtCCUh9Hkh//8U1OwcbD8epVEUdBvuI8wj1KtqMhNkI=" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.carousel.css" integrity="sha256-h7NPLBxMMPcEeO/BDGwCb5MRAZ8CgVcxRxfm3fpMH0s=" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.theme.default.css" integrity="sha256-7eFGZ5XrQEKmIngaS18OjhKpMle23F3q596q9NKzOl4=" crossorigin="anonymous" />
        @stack('head')
    </head>
    <body>
        @stack('body')
        <div id="app">
            <notification></notification>
            <div id="top-wrapper">
                <header id="top" class="my-4">
                    <navigation class="d-block d-lg-none"></navigation>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                                <div id="site-title" role="button" class="text-center" @click.prevent="$store.dispatch('load', '/')">
                                        <img src="{{ url('images/***REMOVED***-LOGO.jpg') }}" alt="***REMOVED*** ***REMOVED***">
                                </div>
                            </div>
                            <div class="col-12 col-lg-2 col-xl-3 d-flex align-items-center" style="font-size: 2rem;">
                                <a class="ml-auto" href="https://www.facebook.com/pages/***REMOVED***-***REMOVED***-***REMOVED***/261844107286000" target="_blank">
                                    <font-awesome-icon class="icon-link" :icon="['fab', 'facebook-square']"></font-awesome-icon>
                                </a>
                                <a class="link ml-1 mr-auto" href="https://twitter.com/poppyplp" target="_blank">
                                    <font-awesome-icon class="icon-link" :icon="['fab', 'twitter-square']"></font-awesome-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                    <navigation class="d-none d-lg-block"></navigation>
                </header>
                <div id="content">
                    @yield('content')
                </div>
            </div>
            <footer id="bottom" class="mt-4">
                <div class="container">
                    <div class="text-uppercase">
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <div class="text-center text-sm-left">&copy; ***REMOVED*** {{ date('Y') }}</div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="text-center text-sm-right">Website by <a href="https://github.com/defaye" target="_blank">Jono de Faye</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        <script src="{{ mix('js/app.js') }}"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.min.js" integrity="sha256-VKITM616rVzV+MI3kZMNUDoY5uTsuSl1ZvEeZhNoJVk=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js" integrity="sha256-L3S3EDEk31HcLA5C6T2ovHvOcD80+fgqaCDt2BAi92o=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.js" integrity="sha256-hPYqnq606IVznFwz1LW0eYgPSxG9O/wyIZT9gK9NvWQ=" crossorigin="anonymous"></script>
        @stack('script')
    </body>
</html>
