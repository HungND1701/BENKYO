<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('history')->insert([
            [
            'history_id' => 1,
            'learned_amount' => 4,
            'learning_amount' => 6,
            'not_learn_amount' => 8,
            'user_id' => 1,
            'created_at' => '2023-12-13 10:35:17',
            'updated_at' => '2023-12-13 10:35:17',
            ],
            [
            'history_id' => 2,
            'learned_amount' => 2,
            'learning_amount' => 2,
            'not_learn_amount' => 2,
            'user_id' => 1,
            'created_at' => '2023-12-14 10:37:19',
            'updated_at' => '2023-12-14 10:37:19',
            ],
            [
            'history_id' => 3,
            'learned_amount' => 4,
            'learning_amount' => 5,
            'not_learn_amount' => 5,
            'user_id' => 1,
            'created_at' => '2023-12-15 10:38:10',
            'updated_at' => '2023-12-15 10:38:10',
            ],
            [
            'history_id' => 4,
            'learned_amount' => 3,
            'learning_amount' => 3,
            'not_learn_amount' => 3,
            'user_id' => 1,
            'created_at' => '2023-12-16 10:40:29',
            'updated_at' => '2023-12-16 10:40:29',
            ],
            [
            'history_id' => 5,
            'learned_amount' => 5,
            'learning_amount' => 5,
            'not_learn_amount' => 3,
            'user_id' => 1,
            'created_at' => '2023-12-17 10:41:19',
            'updated_at' => '2023-12-17 10:41:19',
            ],
            [
            'history_id' => 6,
            'learned_amount' => 2,
            'learning_amount' => 1,
            'not_learn_amount' => 1,
            'user_id' => 1,
            'created_at' => '2023-12-19 10:41:58',
            'updated_at' => '2023-12-19 10:41:58',
            ]
        ]);
    }
}
