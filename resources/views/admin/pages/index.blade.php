@extends('layouts.admin')

@section('content')
<div class="container-fluid">
    <h1>Pages</h1>
    <div class="row">
        <div class="col">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Published?</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($pages as $page)
                        <tr ondblclick="window.location.href='/admin/pages/{{ $page->id }}'">
                            <td><a href="/admin/pages/{{ $page->id }}">{{ $page->id }}</a></td>
                            <td>{{ $page->name }}</td>
                            <td>{{ $page->published ? 'Published' : 'Un-published' }}</td>
                        </tr>
                    @empty
                        <tr><td colspan="4">There are no pages to show.</td></tr>
                    @endforelse
                </tbody>
            </table>
            {{ $pages->links('vendor.pagination.bootstrap-4') }}
        </div>
    </div>
</div>
@stop
