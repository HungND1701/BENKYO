<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Flashcard;
use App\Http\Requests\UpdateFlashcardRequest;
use App\Http\Requests\AddFlashcardRequest;
use Illuminate\Support\Facades\DB;
use Exception;
use Carbon\Carbon;

class FlashcardController extends Controller
{
    public function store(AddFlashcardRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::table('flashcards')->insert(
                [
                    'word' => $validated['word'],
                    'learn_points' => 1,
                    'meaning' => $validated['meaning'],
                    'created_at' => now(),
                    'updated_at' => now(),
                    'is_favourite' => false,
                    'tag_id' => $validated['tag_id'],
                ]
            );

        } catch (Exception $e) {
            return redirect()->back()->withErrors(
                [
                    'store' => $e->getMessage(),
                ]
            );
        }

        return redirect()->route('tags.show', ['tag' => $validated['tag_id']]);
    }

    public function destroy(Request $request, Flashcard $flashcard)
    {
        try {
            DB::table('flashcards')
                ->where('card_id', $flashcard->card_id)
                ->delete();

        } catch (Exception $e) {
            return redirect()->back()->withErrors(
                [
                    'delete' => $e->getMessage(),
                ]
            );
        }

        return redirect()->route('tags.show', ['tag' => $flashcard->tag_id]);
    }

    public function update(UpdateFlashcardRequest $request, Flashcard $flashcard)
    {
        $validated = $request->validated();

        try {
            DB::table('flashcards')
                ->where('card_id', $flashcard->card_id)
                ->update([
                    'word' => $validated['word'],
                    'meaning' => $validated['meaning'],
                ]);

        } catch (Exception $e) {
            return redirect()->back()->withErrors(
                [
                    'update' => $e->getMessage(),
                ]
            );
        }

        return redirect()->route('tags.show', ['tag' => $flashcard->tag_id]);
    }
    public function addFavourite(Request $request, Flashcard $flashcard)
    {
        try {
             // Lấy giá trị is_favourite từ request body
            $isFavourite = $request->input('is_favourite');

            // Cập nhật dữ liệu trong CSDL
            DB::table('flashcards')
                ->where('card_id', $flashcard->card_id)
                ->update([
                    'is_favourite' => $isFavourite,
                ]);

        } catch (Exception $e) {
            return redirect()->back()->withErrors(
                [
                    'update' => $e->getMessage(),
                ]
            );
        }

        return response()->json( DB::table('flashcards')
        ->where('card_id', $flashcard->card_id)->first());
    }

    public function updateLearnPoint(Request $request)
    {
        $card_id = $request->card_id;
        $point = $request->validate(['learn_point' => 'required|integer']);
        if($point['learn_point'] >= 1 && $point['learn_point'] < 20){
            DB::table('history')
                ->where(DB::raw('DATE(created_at)'), Carbon::today()->toDateString())
                ->increment('learning_amount');
            DB::table('history')
                ->where(DB::raw('DATE(created_at)'), Carbon::today()->toDateString())
                ->decrement('not_learn_amount');
        }
        elseif($point['learn_point'] >= 20){
            DB::table('history')
                ->where(DB::raw('DATE(created_at)'), Carbon::today()->toDateString())
                ->increment('learned_amount');
            DB::table('history')
                ->where(DB::raw('DATE(created_at)'), Carbon::today()->toDateString())
                ->decrement('learning_amount');
        }
        try{
            DB::table('flashcards')
                ->where('card_id', $card_id)
                ->update([
                    'learn_points' => $point['learn_point'],
                ]);
            return response()->json(['message' => 'Add success.', $card_id, $point], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Not found.', $card_id, $point], 404);
        }
    }
}
