<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Preference extends Model
{
    protected $fillable = [
    'search',
    'category',
    'country',
    'language',
    'tag',
    'from_date',
    'to_date',
    ];

    protected $dates = [
        'from_date',
        'to_date',
    ];

    public static $rules = [
        'search' => 'nullable',
        'category' => 'nullable',
        'country' => 'nullable',
        'language' => 'nullable',
        'tag' => 'nullable',
        'from_date' => 'nullable|date',
        'to_date' => 'nullable|date|after_or_equal:from_date',
    ];
}
