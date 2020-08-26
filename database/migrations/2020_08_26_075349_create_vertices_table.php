<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVerticesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vertices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("name", 100);
            $table->bigInteger('graph_id')->unsigned()->index();
            $table->foreign('graph_id')->references('id')->on('graphs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vertices');
    }
}
