<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('flashcards', function (Blueprint $table) {
            $table->id('card_id');
            $table->int('learn_points');
            $table->int('tag_id');
            $table->date('last_learned_date');
            $table->booleaan('is_favourite');
            $table->string('word', 255);
            $table->string('meaning', 255);
            $table->date('create_at');
            $table->date('update_at');

            $table->primary('card_id');
            $table->foreign('tag_id')->references('tag_id')->on('tags');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flashcards');
    }
};
