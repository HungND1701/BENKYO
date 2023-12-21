<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;
use App\Models\Flashcard;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->call(function () {
            $auth = auth()->user();
            $flashcardCount = Flashcard::where('learn_points', 0)->count();
            DB::table('notifications')->insert([
                'content' => 'Hôm nay bạn còn '.$flashcardCount.' từ chưa học',
                'is_read' => 0,
                'user_id' => $auth->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        })->daily();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
