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
        Schema::table('remember_by_heart', function (Blueprint $table) {
            $table->dropForeign('remember_by_heart_card_id_foreign');
            $table->foreign('card_id')->references('card_id')->on('flashcards')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('remember_by_heart', function (Blueprint $table) {
            $table->dropForeign('remember_by_heart_card_id_foreign');
            $table->foreign('card_id')->references('card_id')->on('flashcards');
        });
    }
};
