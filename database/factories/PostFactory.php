<?php

use App\Category;
use App\Post;
use Cocur\Slugify\Slugify;
use Faker\Generator as Faker;

$slugify = new Slugify;

$factory->define(Post::class, function (Faker $faker) use ($slugify) {
    return [
        'title' => ($title = $faker->unique()->sentence(5)),
        'slug' => $slugify->slugify($title),
        'body' => $faker->paragraphs($faker->numberBetween(3, 10), true),
        'category_id' => (function () use ($faker) {
            if (!($count = Category::count()) or $faker->boolean(33)) {
                return factory(Category::class)->create()->id;
            }
            return $faker->numberBetween(1, $count);
        })(),
        'published' => $faker->boolean(99),
    ];
});
