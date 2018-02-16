@extends('layouts.app')

@section('content')
    <header id="top" class="container mt-4">
        <div class="row">
            <div class="col-12 order-lg-last">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <button class="navbar-toggler mb-1" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item active">
                                <a href="#" class="nav-link text-uppercase">About</a>
                            </li>
                            <li class="nav-item active">
                                <a href="#" class="nav-link text-uppercase">Weddings</a>
                            </li>
                            <li class="nav-item active">
                                <a href="#" class="nav-link text-uppercase">Albums</a>
                            </li>
                            <li class="nav-item active">
                                <a href="#" class="nav-link text-uppercase">Engagements</a>
                            </li>
                            <li class="nav-item active">
                                <a href="#" class="nav-link text-uppercase">Family</a>
                            </li>
                            <li class="nav-item active">
                                <a href="#" class="nav-link text-uppercase">Testimonials</a>
                            </li>
                            <li class="nav-item active">
                                <a href="#" class="nav-link text-uppercase">Blog</a>
                            </li>
                            <li class="nav-item active">
                                <a href="#" class="nav-link text-uppercase">Contact</a>
                            </li>
                        </ul>
                        {{-- <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> --}}
                    </div>
                </nav>
            </div>
            <div class="col-12 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                <div class="text-center">
                        <h1 class="text-uppercase">{{ config('app.name') }}</h1>
                        <div class="lead text-uppercase">***REMOVED***</div>
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
    </header>
@stop
