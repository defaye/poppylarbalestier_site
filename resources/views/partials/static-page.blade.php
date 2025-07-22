{{-- Static Page Template --}}
<div class="container">
    @if($page->component && $page->component->element_name === 'posts-gallery')
        {{-- Posts Gallery Component --}}
        <div class="posts-gallery">
            @if($page->title && strtolower(trim($page->title)) !== 'home')
                <h1 class="text-center mb-4">{{ $page->title }}</h1>
            @endif
            
            @if($page->content)
                <div class="content mb-4">
                    {!! $page->content !!}
                </div>
            @endif
            
            <div class="gallery">
                @foreach($allData['posts'] as $post)
                    @if($post->images->count() > 0)
                        <div class="gallery-item">
                            <a href="{{ rtrim($baseUrl, '/') }}/posts/{{ $post->slug }}">
                                <img src="{{ $post->images->first()->path }}" 
                                     alt="{{ $post->title }}" 
                                     loading="lazy">
                                <div class="overlay">
                                    <h3>{{ $post->title }}</h3>
                                    @if($post->excerpt)
                                        <p>{{ $post->excerpt }}</p>
                                    @endif
                                </div>
                            </a>
                        </div>
                    @endif
                @endforeach
            </div>
        </div>
    @else
        {{-- Regular Page --}}
        <div class="page-content">
            @if($page->title && strtolower(trim($page->title)) !== 'home')
                <h1 class="text-center mb-4">{{ $page->title }}</h1>
            @endif
            
            @if($page->content)
                <div class="content">
                    {!! $page->content !!}
                </div>
            @endif
            
            @if($page->images && $page->images->count() > 0)
                <div class="page-images mt-4">
                    @if($page->images->count() === 1)
                        <div class="single-image text-center">
                            <img src="{{ $page->images->first()->path }}" 
                                 alt="{{ $page->images->first()->alt_text ?: $page->title }}" 
                                 class="img-fluid"
                                 loading="lazy">
                        </div>
                    @else
                        {{-- Carousel placeholder for Vue to replace --}}
                        <div class="carousel-placeholder" data-images="{{ json_encode($page->images) }}">
                            {{-- Fallback content for non-JS users --}}
                            <div class="carousel fallback-gallery">
                                <div class="carousel-primary">
                                    <div class="fullscreen-icon" onclick="alert('Fullscreen mode not available in static version')">
                                        <i class="fas fa-expand"></i>
                                    </div>
                                    <div class="owl-carousel main-carousel" id="main-carousel">
                                        @foreach($page->images as $image)
                                            <div class="carousel-item">
                                                <img src="{{ $image->path }}" 
                                                     alt="{{ $image->alt_text ?: $page->title }}" 
                                                     class="img-fluid"
                                                     loading="lazy"
                                                     data-index="{{ $loop->index }}">
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                                @if(count($page->images) > 1)
                                <div class="carousel-paginator d-none d-md-block">
                                    <div class="owl-carousel thumbnail-carousel" id="thumbnail-carousel">
                                        @foreach($page->images as $image)
                                            <div class="carousel-item" data-index="{{ $loop->index }}">
                                                <img src="{{ $image->path }}" 
                                                     alt="{{ $image->alt_text ?: $page->title }}" 
                                                     class="img-fluid"
                                                     loading="lazy">
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                                @endif
                            </div>
                        </div>
                    @endif
                </div>
            @endif
        </div>
    @endif
</div>
