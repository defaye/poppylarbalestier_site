<?php

use Cocur\Slugify\Slugify;
use Faker\Generator as Faker;

$slugify = new Slugify;

$factory->define(App\Page::class, function (Faker $faker) use ($slugify) {
    return [
        'title' => $faker->unique()->sentence(5),
        'name' => ($name = $faker->unique()->word),
        'slug' => $slugify->slugify($name),
        'body' => $faker->paragraphs($faker->numberBetween(3, 10), true),
        'published' => $faker->boolean(99),
    ];
});
