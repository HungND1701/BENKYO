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
        Schema::create('remember_by_heart', function (Blueprint $table) {
            $table->id('remember_id');
            $table->foreignId('card_id')->constrained('flashcards','card_id');
            $table->integer('card_level', false, true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remember_by_heart');
    }
};
