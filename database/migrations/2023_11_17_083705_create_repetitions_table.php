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
        Schema::create('repetitions', function (Blueprint $table) {
            $table->integer('internals', false, true);
            $table->foreignId('user_id')->constrained('users','user_id');
            $table->integer('level', false, true);
            $table->timestamps();
            
            $table->primary(['internals', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repetitions');
    }
};
