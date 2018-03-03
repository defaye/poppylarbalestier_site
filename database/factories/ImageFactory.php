<?php

use Faker\Generator as Faker;

$factory->define(App\Image::class, function (Faker $faker) {
    $reference = str_replace('-', '', $faker->uuid);
    $file = pathinfo($faker->image(storage_path('app/public/images'), 720, 553, 'cats', false));
    Storage::move('public/images/' . $file['basename'],
        ($newRelativePath = 'public/images/' . $reference . '.' . $file['extension'])
    );
    return [
        'name' => strtolower($faker->word),
        'extension' => $file['extension'],
        'size' => Storage::size($newRelativePath),
        'reference' => $reference,
    ];
});
