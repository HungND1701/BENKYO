<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Flashcard extends Model
{
    use HasFactory;

    protected $fillable=['*'];

    public function tag() : BelongsTo
    {
        return $this->belongsTo(Tag::class);
    }

    public function rememberByHeart(): HasOne
    {
        return $this->hasOne(RememberByHeart::class);
    }
}