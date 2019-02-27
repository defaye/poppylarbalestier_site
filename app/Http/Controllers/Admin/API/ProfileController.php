<?php

namespace App\Http\Controllers\Admin\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Rules\CheckPassword;
use App\Rules\StrongPassword;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Validator;

class ProfileController extends Controller
{
    public function get()
    {
    	return response()->json(
    		new ProfileResource(auth()->user())
    	);
    }

    public function update(Request $request)
    {
    	$user = auth()->user();

    	Validator::make($request->all(), [
    		'id' => 'required|exists:users,id',
    		'name' => 'required|string|max:255',
    		'email' => [
    			'required',
    			Rule::unique('users', 'email')->ignore($user->email),
    		],
    		'password' => [
    			sprintf(
    				'required_with:new_password%s',
    				($request->email !== $user->email ? ',email' : null)
    			),
    			new CheckPassword($user),
    		],
    		'new_password' => [
    			new StrongPassword($request->input('new_password')),
    		],
    		'new_password_confirmation' => 'required_with:new_password',
    	]);

    	if ($request->new_password) {
    		$user->password = \Hash::make($request->new_password);
    	}

    	$user->fill([
    		'name' => $request->name,
    		'email' => $request->email,
    	]);

    	$user->save();

    	return response()->json(true);
    }
}
