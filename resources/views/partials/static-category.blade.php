{{-- Static Category Template --}}
<div class="container">
    <div class="category-content">
        <h1 class="text-center mb-4">{{ $category->name }}</h1>
        
        @if($category->description)
            <div class="description text-center mb-4">
                <p class="lead">{{ $category->description }}</p>
            </div>
        @endif
        
        @if($posts && $posts->count() > 0)
            <div class="posts-grid">
                <div class="gallery">
                    @foreach($posts as $post)
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
            <div class="no-posts text-center">
                <p>No posts found in this category.</p>
                <a href="{{ rtrim($baseUrl, '/') }}/" class="btn btn-primary">Back to Gallery</a>
            </div>
        @endif
        
        <div class="category-navigation mt-4">
            <div class="text-center">
                <a href="{{ rtrim($baseUrl, '/') }}/" class="btn btn-outline-primary">
                    ← Back to Gallery
                </a>
            </div>
        </div>
    </div>
</div>
