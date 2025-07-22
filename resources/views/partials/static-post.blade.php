{{-- Static Post Template --}}
<div class="container">
    <div class="post-content">
        <h1 class="text-center mb-4">{{ $post->title }}</h1>
        
        @if($post->excerpt)
            <div class="excerpt text-center mb-4">
                <p class="lead">{{ $post->excerpt }}</p>
            </div>
        @endif
        
        @if($post->body)
            <div class="content mb-4">
                {!! $post->body !!}
            </div>
        @endif
        
        @if($post->images && $post->images->count() > 0)
            <div class="post-images">
                @if($post->images->count() === 1)
                    <div class="single-image text-center mb-4">
                        <img src="{{ $post->images->first()->path }}" 
                             alt="{{ $post->images->first()->alt_text ?: $post->title }}" 
                             class="img-fluid"
                             loading="lazy">
                    </div>
                @else
                    {{-- Carousel placeholder for Vue to replace --}}
                    <div class="carousel-placeholder" data-images="{{ json_encode($post->images) }}">
                        {{-- Fallback content for non-JS users --}}
                        <div class="image-carousel mb-4 fallback-gallery">
                            <div class="owl-carousel owl-theme">
                                @foreach($post->images as $image)
                                    <div class="item">
                                        <img src="{{ $image->path }}" 
                                             alt="{{ $image->alt_text ?: $post->title }}" 
                                             class="img-fluid"
                                             loading="lazy">
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                @endif
            </div>
        @endif
        
        <div class="post-meta">
            <div class="row">
                @if($post->category)
                    <div class="col-md-6">
                        <h5>Category</h5>
                        <div class="category">
                            <a href="{{ rtrim($baseUrl, '/') }}/categories/{{ $post->category->slug }}" 
                               class="badge badge-primary">
                                {{ $post->category->name }}
                            </a>
                        </div>
                    </div>
                @endif
                
                @if($post->tags && $post->tags->count() > 0)
                    <div class="col-md-6">
                        <h5>Tags</h5>
                        <div class="tags">
                            @foreach($post->tags as $tag)
                                <span class="badge badge-secondary mr-2">
                                    {{ $tag->name }}
                                </span>
                            @endforeach
                        </div>
                    </div>
                @endif
            </div>
        </div>
        
        <div class="post-navigation mt-4">
            <div class="row">
                <div class="col-md-6">
                    <a href="{{ rtrim($baseUrl, '/') }}/" class="btn btn-outline-primary">
                        ← Back to Gallery
                    </a>
                </div>
                <div class="col-md-6 text-right">
                    @php
                        $allPosts = $allData['posts'];
                        $currentIndex = $allPosts->search(function($p) use ($post) {
                            return $p->id === $post->id;
                        });
                        $nextPost = $currentIndex !== false && $currentIndex < $allPosts->count() - 1 ? $allPosts[$currentIndex + 1] : null;
                        $prevPost = $currentIndex !== false && $currentIndex > 0 ? $allPosts[$currentIndex - 1] : null;
                    @endphp
                    
                    @if($prevPost)
                        <a href="{{ rtrim($baseUrl, '/') }}/posts/{{ $prevPost->slug }}" class="btn btn-outline-secondary mr-2">
                            ← Previous
                        </a>
                    @endif
                    
                    @if($nextPost)
                        <a href="{{ rtrim($baseUrl, '/') }}/posts/{{ $nextPost->slug }}" class="btn btn-outline-secondary">
                            Next →
                        </a>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
