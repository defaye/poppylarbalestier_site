<?php

use App\Component;
use Illuminate\Database\Seeder;

class ComponentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Component::create(['name' => 'Page']);
        Component::create(['name' => 'About']);
    }
}
