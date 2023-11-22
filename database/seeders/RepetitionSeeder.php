<?php

namespace Database\Seeders;

use App\Models\Repetition;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class RepetitionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('repetitions')->insert([
            [
                'internals' => 1,
                'user_id' => 1,
                'level' => 1,
                'created_at' => now(),
                'updated_at' =>now(),
            ],
            [
                'internals' => 2,
                'user_id' => 1,
                'level' => 2,
                'created_at' => now(),
                'updated_at' =>now(),
            ],
            [
                'internals' => 3,
                'user_id' => 1,
                'level' => 3,
                'created_at' => now(),
                'updated_at' =>now(),
            ],
            [
                'internals' => 5,
                'user_id' => 1,
                'level' => 4,
                'created_at' => now(),
                'updated_at' =>now(),
            ],
            [
                'internals' => 10,
                'user_id' => 1,
                'level' => 5,
                'created_at' => now(),
                'updated_at' =>now(),
            ],
        ]);
    }
}
