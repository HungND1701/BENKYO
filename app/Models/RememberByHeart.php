<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RememberByHeart extends Model
{
    use HasFactory;

    protected $fillable=['*'];

    public function flashCard(): BelongsTo
    {
        return $this->belongsTo(FlashCard::class);
    }
}