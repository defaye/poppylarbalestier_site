@extends('layouts.admin')

@section('content')
<div class="container-fluid">
    <h1>Components</h1>
    <div class="row">
        <div class="col">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($components as $component)
                        <tr ondblclick="window.location.href='/admin/components/{{ $component->id }}'">
                            <td><a href="/admin/components/{{ $component->id }}">{{ $component->id }}</a></td>
                            <td>{{ $component->name }}</td>
                        </tr>
                    @empty
                        <tr><td colspan="4">There are no components to show.</td></tr>
                    @endforelse
                </tbody>
            </table>
            {{ $components->links('vendor.pagination.bootstrap-4') }}
        </div>
    </div>
    <a class="btn btn-primary w-100 mt-3" href="/admin/components/new">New</a>
</div>
@stop
