<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name') }}</title>

        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        @stack('head')
    </head>
    <body>
        @stack('body')
        <div id="app">
            @yield('content')
        </div>
        <script src="{{ mix('js/app.js') }}"></script>
        @stack('script')
    </body>
</html>
