@extends('layouts.admin')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-6 offset-lg-3">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-block">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                    <div>You are logged in!</div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
