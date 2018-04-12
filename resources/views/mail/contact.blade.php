@component('mail::message')
# You have a new message

<strong>{{ $request->name }}</strong> asks:

@component('mail::panel')
"<em>{{ $request->message }}</em>"
@endcomponent

@component('mail::button', ['url' => url('mailto:' . $request->email)])
Reply
@endcomponent

@component('mail::button', ['color' => 'green', 'url' => url('tel:' . preg_replace('/[^\d]/', null, $request->phone))])
{{ $request->phone }}
@endcomponent

<small>The details provided have not been verified.</small>
@endcomponent
