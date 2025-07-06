<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="">

    <title>{{ $title }}</title>

    <link rel="stylesheet" href="{{ $baseUrl }}css/app.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" integrity="sha256-HtCCUh9Hkh//8U1OwcbD8epVEUdBvuI8wj1KtqMhNkI=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.carousel.css" integrity="sha256-h7NPLBxMMPcEeO/BDGwCb5MRAZ8CgVcxRxfm3fpMH0s=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.theme.default.css" integrity="sha256-7eFGZ5XrQEKmIngaS18OjhKpMle23F3q596q9NKzOl4=" crossorigin="anonymous" />
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Load jQuery from CDN first to ensure it's available globally -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    
    <style>
        /* Static site specific styles */
        .static-content {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        .static-content.loaded {
            opacity: 1;
        }
        
        /* Ensure images are responsive */
        .static-content img {
            max-width: 100%;
            height: auto;
        }
        
        /* Gallery styles */
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .gallery-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .gallery-item:hover img {
            transform: scale(1.05);
        }
        
        .gallery-item .overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            color: white;
            padding: 15px;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        
        .gallery-item:hover .overlay {
            transform: translateY(0);
        }
        
        /* Fallback carousel styles */
        .fallback-gallery {
            display: block;
        }
        
        .carousel-placeholder:not(.vue-initialized) .fallback-gallery {
            display: block;
        }
        
        .carousel-placeholder.vue-initialized .fallback-gallery {
            display: none;
        }
        
        /* Carousel styles - matching the Vue component design */
        .carousel-primary {
            position: relative;
        }
        
        .carousel-primary:hover .fullscreen-icon {
            opacity: 1;
        }
        
        .fullscreen-icon {
            position: absolute;
            top: 1rem;
            right: 1rem;
            display: block;
            z-index: 2;
            cursor: pointer;
            color: white;
            opacity: 0;
            font-size: 2rem;
            transition: opacity .1s ease-in-out;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .carousel-primary .owl-carousel {
            cursor: pointer;
        }
        
        .carousel-primary .owl-carousel img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .carousel-paginator {
            margin-top: 2rem;
        }
        
        .carousel-paginator .owl-item {
            cursor: pointer;
            transition: opacity 0.3s ease;
        }
        
        .carousel-paginator .owl-item:not(.center) {
            opacity: 0.6;
        }
        
        .carousel-paginator .owl-item.center {
            opacity: 1;
        }
        
        .carousel-paginator .owl-item img {
            width: 100%;
            height: 80px;
            object-fit: cover;
            border-radius: 4px;
        }
        
        .carousel-paginator .owl-stage-outer {
            padding-top: 1rem;
        }
        
        .carousel-paginator .owl-stage-outer::before,
        .carousel-paginator .owl-stage-outer::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            width: .8rem;
            height: auto;
            z-index: 10;
            pointer-events: none;
            background-repeat: no-repeat;
            background-size: 1px 100%, .5rem 100%;
        }
        
        .carousel-paginator .owl-stage-outer::before {
            left: 0;
            background-image: linear-gradient(transparent, rgba(0, 0, 0, .2) 25%, rgba(0, 0, 0, .3) 75%, transparent), radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, .4), transparent);
            background-position: 0 0, 0 0;
        }
        
        .carousel-paginator .owl-stage-outer::after {
            right: 0;
            background-image: linear-gradient(transparent, rgba(0, 0, 0, .2) 25%, rgba(0, 0, 0, .3) 75%, transparent), radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, .4), transparent);
            background-position: 100% 0, 100% 0;
        }
        
        /* Hide default owl controls */
        .carousel-primary .owl-nav,
        .carousel-primary .owl-dots {
            display: none !important;
        }
        
        /* Navigation active state */
        .nav-link.active {
            color: #007bff !important;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="app">
        <div id="notifications"></div>
        <div id="top-wrapper">
            <header id="top" class="my-4">
                <!-- Mobile Navigation -->
                <nav class="navbar navbar-expand-lg navbar-light d-block d-lg-none">
                    <button 
                        aria-controls="headerNavigation"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        class="navbar-toggler mb-1"
                        data-target="#headerNavigation"
                        data-toggle="collapse"
                        type="button"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="headerNavigation">
                        <ul class="navbar-nav mx-auto">
                            @foreach($allData['navigation']->where('position', '>', 0) as $item)
                            <li class="nav-item">
                                <a
                                    href="{{ rtrim($baseUrl, '/') }}/{{ $item->page->slug }}"
                                    title="{{ $item->page->name }}"
                                    class="nav-link text-uppercase {{ $path === '/' . $item->page->slug ? 'active' : '' }}"
                                >
                                    {!! $item->page->title !!}
                                </a>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                </nav>
                
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 col-lg-8 col-xl-6 ml-auto">
                            <div id="site-title" class="text-center">
                                <a href="{{ $baseUrl }}">
                                    <img src="{{ $baseUrl }}images/logo.jpg" alt="Poppy Larbalestier Photography">
                                </a>
                            </div>
                        </div>
                        <div class="d-none d-lg-flex col-lg-2 col-xl-3 align-items-center" style="font-size: 2rem;">
                            <a class="ml-auto" href="https://www.instagram.com/poppylarbalestier/" target="_blank">
                                <div class="icon-link fa-2x" style="position: relative; display: inline-block; width: 1em; height: 1em;">
                                    <i class="fas fa-square" style="color: #333;"></i>
                                    <i class="fab fa-instagram" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 0.6em;"></i>
                                </div>
                            </a>
                            <a class="ml-3" href="https://www.facebook.com/poppylarbalestier/" target="_blank">
                                <div class="icon-link fa-2x" style="position: relative; display: inline-block; width: 1em; height: 1em;">
                                    <i class="fas fa-square" style="color: #333;"></i>
                                    <i class="fab fa-facebook-f" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 0.6em;"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Desktop Navigation -->
                <nav class="navbar navbar-expand-lg navbar-light d-none d-lg-block">
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav mx-auto">
                            @foreach($allData['navigation']->where('position', '>', 0) as $item)
                            <li class="nav-item">
                                <a
                                    href="{{ rtrim($baseUrl, '/') }}/{{ $item->page->slug }}"
                                    title="{{ $item->page->name }}"
                                    class="nav-link text-uppercase {{ $path === '/' . $item->page->slug ? 'active' : '' }}"
                                >
                                    {!! $item->page->title !!}
                                </a>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                </nav>
            </header>
            
            <div id="content" class="static-content">
                @if($type === 'page')
                    @include('partials.static-page', ['page' => $page])
                @elseif($type === 'post')
                    @include('partials.static-post', ['post' => $page])
                @elseif($type === 'category')
                    @include('partials.static-category', ['category' => $page, 'posts' => $posts])
                @endif
            </div>
        </div>
        
        <footer id="bottom" class="mt-4">
            <div class="container">
                <div class="text-uppercase">
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <div class="text-center text-sm-left">&copy; Poppy Larbalestier Photography {{ date('Y') }}</div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="text-center text-sm-right">Website by <a href="https://github.com/defaye" target="_blank">Jono de Faye</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    
    <!-- Data for JavaScript -->
    <script>
        window.STATIC_DATA = {
            currentPage: @json($page),
            currentPath: @json($path),
            currentType: @json($type),
            allData: @json($allData)
        };
    </script>
    
    <!-- Include static-specific scripts only -->
    <script src="{{ $baseUrl }}js/manifest.js"></script>
    <script src="{{ $baseUrl }}js/vendor.js"></script>
    <script src="{{ $baseUrl }}js/app-static.js"></script>
    
    <!-- Load OwlCarousel after jQuery is guaranteed to be available -->
    <script>
        // Ensure jQuery is available before loading OwlCarousel
        window.addEventListener('load', function() {
            if (typeof $ !== 'undefined') {
                // Load OwlCarousel dynamically
                var script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.js';
                script.crossOrigin = 'anonymous';
                script.onload = function() {
                    // Initialize carousels after OwlCarousel is loaded
                    initializeCarousels();
                };
                document.head.appendChild(script);
            } else {
                console.error('jQuery is not available');
            }
        });
        
        function initializeCarousels() {
            if (typeof $ !== 'undefined' && typeof $.fn !== 'undefined' && typeof $.fn.owlCarousel !== 'undefined') {
                // Initialize main carousel
                $('.fallback-gallery .main-carousel').each(function() {
                    var $mainCarousel = $(this);
                    var $thumbnailCarousel = $mainCarousel.closest('.carousel').find('.thumbnail-carousel');
                    
                    var mainOwl = $mainCarousel.owlCarousel({
                        items: 1,
                        loop: true,
                        autoplay: true,
                        autoplayTimeout: 2500,
                        autoplayHoverPause: true,
                        animateIn: 'fadeIn',
                        animateOut: 'fadeOut',
                        mouseDrag: false,
                        nav: false,
                        dots: false
                    });
                    
                    // Initialize thumbnail carousel if it exists
                    if ($thumbnailCarousel.length > 0) {
                        var thumbOwl = $thumbnailCarousel.owlCarousel({
                            center: true,
                            autoplay: false,
                            loop: true,
                            mouseDrag: false,
                            nav: false,
                            dots: false,
                            responsive: {
                                0: { items: 0 },
                                768: { items: 3 },
                                992: { items: 5 },
                                1200: { items: 5 }
                            },
                            margin: 5
                        });
                        
                        // Sync carousels
                        mainOwl.on('changed.owl.carousel', function(event) {
                            thumbOwl.trigger('to.owl.carousel', event.page.index, 300);
                        });
                        
                        // Thumbnail click navigation
                        $thumbnailCarousel.on('click', '.owl-item', function() {
                            var index = $(this).find('[data-index]').data('index');
                            mainOwl.trigger('to.owl.carousel', index, 300);
                        });
                    }
                    
                    // Main carousel click to advance
                    $mainCarousel.on('click', function() {
                        mainOwl.trigger('next.owl.carousel');
                    });
                });
            }
        }
    </script>
    
    <script>
        // Initialize static content
        document.addEventListener('DOMContentLoaded', function() {
            // Add loaded class to content
            setTimeout(function() {
                const staticContent = document.querySelector('.static-content');
                if (staticContent) {
                    staticContent.classList.add('loaded');
                }
            }, 100);
            
            // Handle navigation clicks for SPA-like experience
            document.querySelectorAll('a[href^="/"], a[href^="./"]').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href && (href.startsWith('/') || href.startsWith('./')) && !href.startsWith('//')) {
                        // Let the browser handle the navigation normally for static site
                        return true;
                    }
                });
            });
        });
    </script>
</body>
</html>
