@extends('layouts.app')

@section('content')
    <div class="container">
        <carousel :images="{{ json_encode($images) }}"></carousel>
    </div>
@stop
