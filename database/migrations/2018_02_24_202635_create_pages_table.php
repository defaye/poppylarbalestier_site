<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->nullable()->unique();
            $table->string('name')->nullable()->unique();
            $table->text('body')->nullable();
            $table->string('slug')->nullable()->unique();
            $table->boolean('published')->default(false);
            $table->integer('component_id')->unsigned();
            $table->timestamps();

            $table->foreign('component_id')->references('id')->on('components')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pages');
    }
}
