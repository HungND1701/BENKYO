<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    use HasFactory;

    protected $fillable=['*'];

    public function tags(): HasMany
    {
        return $this->hasMany(Tag::class);
    }

    public function repetitions(): HasMany
    {
        return $this->hasMany(Repetition::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function histories(): HasMany
    {
        return $this->hasMany(History::class);
    }

}