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
            $table->int('card_id');
            $table->int('card_level');
            $table->date('create_at');
            $table->date('update_at');

            $table->constrain('card_id')->references('card_id')->on('flashcards');
            $table->primary('remember_id');
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
