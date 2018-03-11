@extends('layouts.app')

@section('content')
    <page v-model="page" @load="load"></page>
@stop
