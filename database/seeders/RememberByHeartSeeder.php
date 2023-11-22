<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RememberByHeartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('remember_by_heart')->insert([ 
            'remember_id' => 1,
            'card_id' => 2,
            'card_level' => 1,
            'created_at' => now(),
            'updated_at' =>now(),
        ]);
    }
}
