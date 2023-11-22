<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Tag;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flashcard>
 */
class FlashcardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tagRandomId = Tag::all()->random()->tag_id;
        return [
            'learn_points' =>  $this->faker->numberBetween(1, 100),
            'last_learned_date' => fake()->dateTime(),
            'tag_id' => $tagRandomId,
            'is_favourite' => fake()->boolean(),
            'word' => fake()->text(10),
            'meaning' => fake()->text(50),
        ];
    }
}
