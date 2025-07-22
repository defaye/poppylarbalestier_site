<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }} - Administration</title>

    <link rel="stylesheet" href="{{ mix('/css/admin.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" integrity="sha256-j+P6EZJVrbXgwSR5Mx+eCS6FvP9Wq27MBRC/ogVriY0=" crossorigin="anonymous" />
    @stack('head')
</head>
<body>
    <div id="app">
        @stack('body')
        <notifications></notifications>
        <div id="content" class="layout-container">
            <main class="layout-content mt-3">
                @yield('content')
            </main>
            @auth
                <side-navigation></side-navigation>
                @stack('aside')
            @endauth
            @hasSection('aside')
                <aside class="layout-sidebar">
                    @yield('aside')
                </aside>
            @endif
        </div>
    </div>
    @stack('script')
    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/admin.js') }}"></script>
</body>
</html>
