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
            <notifications></notifications>
            <div id="top-wrapper">
                <header id="top" class="my-4">
                    <navigation class="d-block d-lg-none"></navigation>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 col-lg-8 col-xl-6 ml-auto">
                                <div id="site-title" role="button" class="text-center" @click.prevent="$store.dispatch('load', '/')">
                                    <img src="/images/logo.jpg" alt="Logo">
                                </div>
                            </div>
                            <div class="d-none d-lg-flex col-lg-2 col-xl-3 align-items-center" style="font-size: 2rem;">
                                <a class="ml-auto" href="{{ config('social.instagram_url') }}" target="_blank">
                                    <font-awesome-layers class="icon-link fa-2x">
                                        <font-awesome-icon icon="square"></font-awesome-icon>
                                        <font-awesome-icon
                                            :icon="[
                                                'fab',
                                                'instagram',
                                            ]"
                                            :style="{ color: 'white' }"
                                            transform="shrink-6"
                                        ></font-awesome-icon>
                                    </font-awesome-layers>
                                </a>
                                <a class="ml-3" href="{{ config('social.facebook_url') }}" target="_blank">
                                    <font-awesome-layers class="icon-link fa-2x">
                                        <font-awesome-icon icon="square"></font-awesome-icon>
                                        <font-awesome-icon
                                            :icon="[
                                                'fab',
                                                'facebook-f',
                                            ]"
                                            :style="{ color: 'white' }"
                                            transform="shrink-6"
                                        ></font-awesome-icon>
                                    </font-awesome-layers>
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
                                <div class="text-center text-sm-left">&copy; {{ config('app.name') }} {{ date('Y') }}</div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="text-center text-sm-right">Website by <a href="https://github.com/defaye" target="_blank">Jono de Faye</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        @stack('script')
        <script src="{{ mix('js/manifest.js') }}"></script>
        <script src="{{ mix('js/vendor.js') }}"></script>
        <script src="{{ mix('js/app.js') }}"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.js" integrity="sha256-hPYqnq606IVznFwz1LW0eYgPSxG9O/wyIZT9gK9NvWQ=" crossorigin="anonymous"></script>
    </body>
</html>
