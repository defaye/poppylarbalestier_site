<?php

use Illuminate\Database\Seeder;

class TestDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);

        factory(App\Page::class, 1)->create()->each(function ($page) {
            $page->images()->saveMany(factory(App\Image::class, rand(5, 15))->make());
        });

        factory(App\Page::class, 3)->create()->each(function ($page) {
            $page->posts()->saveMany(
                factory(App\Post::class, rand(3, 5))->create()->each(function ($post) {
                    $post->tags()->saveMany(factory(App\Tag::class, rand(1, 10))->make());
                    $post->images()->saveMany(factory(App\Image::class, rand(5, 15))->make());
                })
            );
        });

        factory(App\Post::class, 3)->create()->each(function ($post) {
            $post->tags()->saveMany(factory(App\Tag::class, rand(1, 10))->make());
            $post->images()->saveMany(factory(App\Image::class, rand(5, 15))->make());
        });

    }
}
