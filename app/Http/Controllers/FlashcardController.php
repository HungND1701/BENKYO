<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Flashcard;
use App\Http\Requests\UpdateFlashcardRequest;
use App\Http\Requests\AddFlashcardRequest;
use Illuminate\Support\Facades\DB;
use Exception;

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
}
