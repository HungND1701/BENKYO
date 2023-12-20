<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Flashcard;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $auth = auth()->user();
        $flashcardCount = Flashcard::where('learn_points', 0)->count();
        $exists = DB::table('history')
        ->where(DB::raw('DATE(created_at)'), Carbon::today()->format('Y-m-d'))
        ->exists();

        if (!$exists) {
            DB::table('history')
            ->insert([
                'learned_amount' => 0,
                'learning_amount' => 0,
                'not_learn_amount' => $flashcardCount,
                'user_id' => auth()->user()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        Carbon::setTestNow(Carbon::now('Asia/Ho_Chi_Minh'));
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');

        if ($endDate === null) {
            $endDate = Carbon::today()->format('Y-m-d');
        }
        
        if ($startDate === null) {
            $startDate = Carbon::today()->subDays(7)->format('Y-m-d');
        }
    
        // Convert them to Carbon instances
        $startDate = Carbon::createFromFormat('Y-m-d', $startDate);
        $endDate = Carbon::createFromFormat('Y-m-d', $endDate);

        $dates = collect()->times($endDate->diffInDays($startDate), function ($time) use ($startDate) {
            return $startDate->copy()->addDays($time)->format('Y-m-d');
        });

        $dates->prepend($startDate->format('Y-m-d'));

        $amounts = DB::table('history')
        ->select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('SUM(learned_amount) as total_learned_amount'),
            DB::raw('SUM(learning_amount) as total_learning_amount'),
            DB::raw('SUM(not_learn_amount) as total_not_learn_amount')
        )
        ->where('user_id', $auth->id)
        ->whereIn(DB::raw('DATE(created_at)'), $dates)
        ->groupBy('date')
        ->get();

        return Inertia::render(
            'Dashboard', [
                'dates' => $dates,
                'amounts' => $amounts
            ]
        );
    }

    public function getData(Request $request)
    {
        $auth = auth()->user();
        $startDate = $request->startDate;
        $endDate = $request->endDate;
        $startDate = Carbon::createFromFormat('Y-m-d', $startDate);
        $endDate = Carbon::createFromFormat('Y-m-d', $endDate);
        $dates = collect()->times($endDate->diffInDays($startDate), function ($time) use ($startDate) {
            return $startDate->copy()->addDays($time)->format('Y-m-d');
        });

        $dates->prepend($startDate->format('Y-m-d'));

        $amounts = DB::table('history')
        ->select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('SUM(learned_amount) as total_learned_amount'),
            DB::raw('SUM(learning_amount) as total_learning_amount'),
            DB::raw('SUM(not_learn_amount) as total_not_learn_amount')
        )
        ->where('user_id', $auth->id)
        ->whereIn(DB::raw('DATE(created_at)'), $dates)
        ->groupBy('date')
        ->get();

        return response()->json([$dates, $amounts]);
    }

}
