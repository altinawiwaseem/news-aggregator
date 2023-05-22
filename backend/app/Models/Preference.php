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
    
    ];

  

    public static $rules = [
        'search' => 'nullable',
        'category' => 'nullable',
        'country' => 'nullable',
        'language' => 'nullable',
        'tag' => 'nullable',
       
    ];
}
