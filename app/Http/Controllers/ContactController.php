<?php

namespace App\Http\Controllers;

use App\Notifications\ContactNotification;
use App\User;
use Illuminate\Http\Request;
use Validator;

class ContactController extends Controller
{
    public function sendMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:4,255',
            'email' => 'required|email|email_dns_exists',
            'phone' => 'required|max:15',
            'message' => 'required|between:50,1024',
            'recaptcha' => 'required|recaptcha',
        ],
            [
                'email.email_dns_exists' => 'The e-mail address provided does not seem right.',
            ],
            [
                'email' => 'e-mail address',
                'phone' => 'phone number',
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        User::first()->notify(
            (
                new ContactNotification((object) $request->all())
            )->delay(now()->addSeconds(10))
        );
        return response()->json(true);
    }
}
