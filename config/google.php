<?php
return [
    'analytics' => [
        'tracking_code' => env('GOOGLE_ANALYTICS_TRACKING_CODE'),
    ],
    'recaptcha' => [
        'secret' => env('GOOGLE_RECAPTCHA_SECRET'),
        'key' => env('GOOGLE_RECAPTCHA_KEY'),
    ],
];
