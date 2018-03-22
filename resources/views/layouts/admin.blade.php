<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }} - Administration</title>

    <link rel="stylesheet" href="{{ mix('css/admin.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" integrity="sha256-j+P6EZJVrbXgwSR5Mx+eCS6FvP9Wq27MBRC/ogVriY0=" crossorigin="anonymous" />
    @stack('head')
</head>
<body>
    @stack('body')
    <div id="app">
        {{-- <nav class="navbar navbar-light navbar-static-top navbar-toggleable-lg">
            @auth
                <ul class="dropdown-menu">
                    <li>
                        <a href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                                     document.getElementById('logout-form').submit();">
                            Logout
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </li>
                </ul>
            @endauth
        </nav> --}}
        <div id="content" class="layout-container">
            <main class="layout-content mt-3">
                @yield('content')
            </main>
            @auth
                <nav class="layout-nav">
                    <a class="link" href="/admin">
                        <font-awesome-icon class="fa-2x" :icon="['fal', 'home']"></font-awesome-icon>
                    </a>
                    <a class="link" href="/admin/navigation">
                        <font-awesome-icon class="fa-2x" :icon="['fal', 'anchor']"></font-awesome-icon>
                    </a>
                    <a class="link" href="/admin/pages">
                        <font-awesome-icon class="fa-2x" :icon="['fal', 'file']"></font-awesome-icon>
                    </a>
                    <a class="link" href="/admin/posts">
                        <font-awesome-icon class="fa-2x" :icon="['fal', 'newspaper']"></font-awesome-icon>
                    </a>
                    <a class="link" href="{{ route('logout') }}" onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit();">
                        <font-awesome-icon class="fa-2x" :icon="['fal', 'power-off']"></font-awesome-icon>
                    </a>
                </nav>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    {{ csrf_field() }}
                </form>
                @stack('aside')
            @endauth
            @hasSection('aside')
                <aside class="layout-sidebar">
                    @yield('aside')
                </aside>
            @endif
        </div>
    </div>
    <script src="{{ mix('js/admin.js') }}"></script>
    @stack('script')
</body>
</html>
