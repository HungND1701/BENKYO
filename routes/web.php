<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\FlashcardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get(
    '/', function () {
        return Inertia::render(
            'Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            ]
        );
    }
);

Route::get(
    '/dashboard', function () {
        return Inertia::render('Dashboard');
    }
)->middleware([])->name('dashboard');

Route::middleware('auth')->group(
    function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    }
);

Route::get('/tags', [TagController::class, 'index'])->name('tags.index');
Route::post('/tags', [TagController::class, 'store'])->name('tags.store');
Route::get('/tags/{tag}/edit', [TagController::class, 'edit'])->name('tags.edit');
Route::get('/tags/{tag}/learn', [TagController::class, 'learn'])->name('tags.learn');
Route::get('/tags/{tag}/quizzes', [TagController::class, 'quizzes'])->name('tags.quizzes');
Route::put('/tags/{tag}', [TagController::class, 'update'])->name('tags.update');
Route::get('/tags/{tag}', [TagController::class, 'show'])->name('tags.show');
Route::delete('/tags/{tag}', [TagController::class, 'destroy'])->name('tags.destroy');

Route::delete('/flashcards/{flashcard}', [FlashcardController::class, 'destroy'])->name('flashcards.destroy');
Route::put('/flashcards/{flashcard}', [FlashcardController::class, 'update'])->name('flashcards.update');
Route::put('/flashcards/favourite/{flashcard}', [FlashcardController::class, 'addFavourite'])->name('flashcards.addFavourite');
Route::post('/flashcards', [FlashcardController::class, 'store'])->name('flashcards.store');

require __DIR__.'/auth.php';
