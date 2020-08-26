<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEdgesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('edges', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer("weight");
            $table->bigInteger('vertex_id_from')->unsigned()->index();
            $table->bigInteger('vertex_id_to')->unsigned()->index();
            $table->foreign('vertex_id_from')->references('id')->on('vertices');
            $table->foreign('vertex_id_to')->references('id')->on('vertices');
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
        Schema::dropIfExists('edges');
    }
}
