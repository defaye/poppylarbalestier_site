@extends('layouts.app')

@section('content')
    <div class="container">
        <carousel :images="{{ json_encode($images) }}"></carousel>
    </div>
    {{-- <div class="container my-4">
        <p>***REMOVED*** preserves the most precious memories of our lives forever, whether it's our wedding days, engagements, or all those special times with our families.</p>
        <p>Our memories might fade, but our photos will last forever. That's why I believe photography is not only amazing, but essential too.</p>
        <p>I love to capture those special relationship moments, be it between the bride and groom, or family and friends. What's important to me is capturing emotions that will be preserved forever, in the knowledge of how precious those images will be for many generations to come.</p>
        <p>My style is very natural, and my aim is to be as discreet as possible and blend into the background. I truly believe that people look their best when they forget the camera is there, and they are at their most natural and relaxed.</p>
    </div> --}}
@stop
