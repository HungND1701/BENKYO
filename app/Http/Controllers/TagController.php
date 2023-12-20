<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Requests\NewTagRequest;
use App\Http\Requests\UpdateTagRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Tag;
use App\Models\Flashcard;
use Illuminate\Support\Facades\DB;
use Exception;

class TagController extends Controller
{
    public function index(Request $request): Response
    {
        $tags = Tag::all();

        return Inertia::render(
            'tag/Index', [
                'tags' => $tags,
            ]
        );
    }

    public function store(NewTagRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::table('tags')->insert(
                [
                    'tag_name' => $validated['title'],
                    'description' => $validated['description'],
                    'user_id' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                    'is_marked' => false,
                ]
            );
        } catch (Exception $e) {
            return redirect()->back()->withErrors(
                [
                    'store' => $e->getMessage(),
                ]
            );
        }

        return redirect()->route('tags.index');
    }

    public function show(Request $request): Response
    {   

        $flashcards = Tag::find((int)$request->tag)->flashcards->sortDesc()->values()->all();;

        return Inertia::render(
            'tag/Show', [
                'tag' => Tag::where('tag_id', (int)$request->tag)->get()->first(),
                'flashcards' => $flashcards,
            ]
        );
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {   
        return Inertia::render(
            'tag/Edit', [
                'tag' => Tag::where('tag_id', (int)$request->tag)->get()->first()
            ]
        );
    }

    public function learn(Request $request): Response
    {   
        $tag = Tag::with('flashcards')->where('tag_id', (int)$request->tag)->get()->first();
        return Inertia::render(
            'tag/Learn', [
                'tag' => $tag
            ]
        );
    }

    public function quizzes(Request $request): Response
    {   
        $tag = Tag::with('flashcards')->where('tag_id', (int)$request->tag)->get()->first();
        return Inertia::render(
            'tag/Quizzes', [
                'tag' => $tag,
                'numQuizze' => intval($request->numQuizze),
                'isTrueFalse' => $request->isTrueFalse,
                'isMulti' => $request->isMulti
            ]
        );
    }

    /**
     * Update the user's profile information.
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $validated = $request->validated();
        try {
            DB::table('tags')
                ->where('tag_id', $tag->tag_id)
                ->update(
                    [
                    'tag_name' => $validated['title'],
                    'description' => $validated['description'],
                     ]
                );

        } catch (Exception $e) {
            return redirect()->back()->withErrors(
                [
                    'update' => $e->getMessage(),
                ]
            );
        }

        return redirect()->route('tags.index');
    }

    
    public function destroy(Request $request, Tag $tag)
    {
        try {
            DB::table('tags')
                ->where('tag_id', $tag->tag_id)
                ->delete();

        } catch (Exception $e) {
            return redirect()->back()->withErrors(
                [
                    'delete' => $e->getMessage(),
                ]
            );
        }

        return redirect()->route('tags.index');
    }
}
