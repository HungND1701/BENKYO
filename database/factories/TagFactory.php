<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userRandomId = User::all()->random()->id;
        return [
            'tag_name' => fake()->name(),
            'user_id' => $userRandomId,
            'is_marked' => fake()->boolean(),
            'description' => fake()->text(100),
        ];
    }
}
