<?php

use App\Edge;
use App\Vertex;
use Faker\Factory;
use Illuminate\Database\Seeder;

class EdgesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        // for 1 graph
        Edge::create([
            'weight' => $faker->numberBetween(0,100),
            'vertex_id_from' => Vertex::find(1)->id,
            'vertex_id_to' => Vertex::find(2)->id
        ]);
        Edge::create([
            'weight' => $faker->numberBetween(0,100),
            'vertex_id_from' => Vertex::find(2)->id,
            'vertex_id_to' => Vertex::find(4)->id
        ]);
        Edge::create([
            'weight' => $faker->numberBetween(0,100),
            'vertex_id_from' => Vertex::find(4)->id,
            'vertex_id_to' => Vertex::find(5)->id
        ]);
        Edge::create([
            'weight' => $faker->numberBetween(0,100),
            'vertex_id_from' => Vertex::find(5)->id,
            'vertex_id_to' => Vertex::find(3)->id
        ]);
        Edge::create([
            'weight' => $faker->numberBetween(0,100),
            'vertex_id_from' => Vertex::find(3)->id,
            'vertex_id_to' => Vertex::find(1)->id
        ]);

        // for 2 graph
        Edge::create([
            'weight' => $faker->numberBetween(0,100),
            'vertex_id_from' => Vertex::find(7)->id,
            'vertex_id_to' => Vertex::find(8)->id
        ]);
        Edge::create([
            'weight' => $faker->numberBetween(0,100),
            'vertex_id_from' => Vertex::find(8)->id,
            'vertex_id_to' => Vertex::find(7)->id
        ]);
        Edge::create([
            'weight' => $faker->numberBetween(0,100),
            'vertex_id_from' => Vertex::find(8)->id,
            'vertex_id_to' => Vertex::find(10)->id
        ]);
        Edge::create([
            'weight' => $faker->numberBetween(0,100),
            'vertex_id_from' => Vertex::find(10)->id,
            'vertex_id_to' => Vertex::find(9)->id
        ]);
        Edge::create([
            'weight' => $faker->numberBetween(0,100),
            'vertex_id_from' => Vertex::find(7)->id,
            'vertex_id_to' => Vertex::find(9)->id
        ]);
    }
}
