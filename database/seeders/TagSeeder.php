<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tags')->insert([
            'tag_id' => 1,
            'tag_name' => 'Nihongo 7',
            'description' => 'Học là manten :))))',
            'user_id' => 1,
            'is_marked' => true,
            'created_at' => now(),
            'updated_at' =>now(),
        ]);
    }
}
