@extends('layouts.app')

@section('content')
    <component :is="$store.state.page && $store.state.page.component && $store.state.page.component.element_name" v-model="$store.state.page"></component>
@stop
