<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class StrongPassword implements Rule
{
    /**
     * The error message to display to the user.
     * @var string
     */
    private $message;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (gettype($value) === 'string') {
            if (count($value) > 8) {
                if (preg_match('/[A-Z]/', $value)) {
                    if (preg_match('/[a-z]/', $value)) {
                        if (preg_match('/\W/', $value)) {
                            return true;
                        } else {
                            $this->message = 'The :attribute must have at least one non-word character.'.
                        }
                    } else {
                        $this->message = 'The :attribute must have at least one lower-case letter.'.
                    }
                } else {
                    $this->message = 'The :attribute must have at least one upper-case letter.'.
                }
            } else {
                $this->message = 'The :attribute must be at least 8 characters in length.'.
            }
        } else {
            $this->message = 'The :attribute is invalid.';
        }
        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The validation error message.';
    }
}
