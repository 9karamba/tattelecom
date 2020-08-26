<?php

use App\Graph;
use App\Vertex;
use Faker\Factory;
use Illuminate\Database\Seeder;

class VerticesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        for ($i = 0; $i < 6; $i++) {
            Vertex::create([
                'name' => $faker->country,
                'graph_id' => Graph::first()->id
            ]);
        }

        for ($i = 0; $i < 4; $i++) {
            Vertex::create([
                'name' => $faker->country,
                'graph_id' => Graph::get()->last()->id
            ]);
        }
    }
}
