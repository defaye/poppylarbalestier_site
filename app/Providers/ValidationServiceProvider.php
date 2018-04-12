<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use ReCaptcha\ReCaptcha;
use Request;
use Validator;

class ValidationServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('email_dns_exists', function ($attribute, $value, $parameters, $validator) {
            return filter_var($value, FILTER_VALIDATE_EMAIL) !== false and checkdnsrr(last(explode('@', $value, 2)), 'MX');
        });
        Validator::extend('recaptcha', function ($attribute, $value, $parameters, $validator) {
            $recaptcha = new ReCaptcha(config('google.recaptcha.secret'));
            $response = $recaptcha->verify($value, Request::getClientIp());
            return $response->isSuccess();
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
