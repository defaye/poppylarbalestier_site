@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>About Me</h1>
        <div class="row my-5">
            <div class="col-12 col-lg-9">
                <p>Since 2010, I've been a wedding and lifestyle photographer, covering amazing weddings in the Channel Islands, UK, and further afield. Though I've gained awards for my work, what's important to me is capturing the moments that will be preserved forever and passed down the generations.</p>
                <p>I feel very fortunate that photography can be both my passion and my profession, and I am looking forward to covering more weddings and lifestyle shoots here in the Channel Islands, and further afield.</p>
                <p>I always welcome the opportunity to meet up with clients to discuss working together, and so please feel free to contact me.</p>
            </div>
            <div class="col-12 col-lg-3">
                <h2>Get In Touch</h2>
                <hr>
                <div><a href="https://www.facebook.com/pages/***REMOVED***-***REMOVED***-***REMOVED***/261844107286000" target="_blank">Like me on Facebook</a></div>
                <div><a href="https://twitter.com/poppyplp" target="_blank">Follow me on Twitter</a></div>
                <hr>
                <div><strong>Phone:</strong> <a href="tel:00447700832331">+44 (0) 7700 832 331</a></div>
                <div>Or <strong><a href="mailto:***REMOVED***">Email Me</a></strong></div>
            </div>
        </div>
        <responsive-image src="{{ url('images/content/about/P-PG-145-1-.jpg') }}" alt="Me and my husband" :ratio-x="4" :ratio-y="3"></responsive-image>
    </div>
@stop
