<?php

use Faker\Factory;
use Illuminate\Database\Seeder;
use App\Graph;

class GraphsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        // Create 2 product records
        for ($i = 0; $i < 2; $i++) {
            Graph::create([
                'name' => $faker->title
            ]);
        }
    }
}
