@extends('layouts.admin')

@section('content')
<div class="container-fluid">
    <h1>Posts</h1>
    <div class="row">
        <div class="col">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Published?</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($posts as $post)
                        <tr ondblclick="window.location.href='/admin/posts/{{ $post->id }}'">
                            <td><a href="/admin/posts/{{ $post->id }}">{{ $post->id }}</a></td>
                            <td>{{ $post->title }}</td>
                            <td>{{ optional($post->category)->name }}</td>
                            <td>
                                @if($post->published)
                                    <font-awesome-icon class="text-warning" :icon="['fas', 'lightbulb']" title="Published"></font-awesome-icon>
                                @else
                                    <font-awesome-icon class="text-warning" :icon="['fal', 'lightbulb']" title="Un-published"></font-awesome-icon>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="4">There are no posts to show.</td></tr>
                    @endforelse
                </tbody>
            </table>
            {{ $posts->links('vendor.pagination.bootstrap-4') }}
        </div>
    </div>
    <a class="btn btn-primary w-100 mt-3" href="/admin/posts/new">New</a>
</div>
@stop
