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
        Schema::create('history', function (Blueprint $table) {

            $table->int('history_id');
            $table->int('learned_amount');
            $table->int('learning_amount');
            $table->int('not_learn_amount');
            $table->int('user_id');
            $table->date('create_at');
            $table->date('update_at');

            $table->primary('history_id');
            $table->foreign('history_userid')->references('user_id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history');
    }
};
