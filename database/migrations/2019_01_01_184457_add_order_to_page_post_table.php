<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOrderToPagePostTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('page_post', function (Blueprint $table) {
            $table->integer('order')->unsigned()->nullable();
        });
        $pagePosts = DB::table('page_post')->get();
        foreach ($pagePosts as $index => $pagePost) {
            DB::table('page_post')
                ->wherePageId($pagePost->page_id)
                ->wherePostId($pagePost->post_id)
                ->update([
                    'order' => $index,
                ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('page_post', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
}
