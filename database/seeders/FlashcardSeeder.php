<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FlashcardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('flashcards')->insert([
            [
                'card_id' => 1,
                'learn_points' => 0,
                'last_learned_date' => now(),
                'tag_id' => 1,
                'is_favourite' => false,
                'word' => '自分',
                'meaning' => 'Bản thân | じぶん | TỰ PHÂN',
                'created_at' => now(),
                'updated_at' =>now(),
            ],
            [
                'card_id' => 2,
                'learn_points' => 22,
                'last_learned_date' => now(),
                'tag_id' => 1,
                'is_favourite' => true,
                'word' => '私',
                'meaning' => 'Tôi | あたし | TỰ',
                'created_at' => now(),
                'updated_at' =>now(),
            ],
            [
                'card_id' => 3,
                'learn_points' => 12,
                'last_learned_date' => now(),
                'tag_id' => 1,
                'is_favourite' => false,
                'word' => '日本',
                'meaning' => 'Nhật Bản | にほん | NHẬT BỔN',
                'created_at' => now(),
                'updated_at' =>now(),
            ],
        ]);
    }
}
