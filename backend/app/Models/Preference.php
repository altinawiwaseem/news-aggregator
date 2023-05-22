<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Preference extends Model
{
    protected $fillable = [
    'q',
    'category',
    'country',
    'language',
    'tag',
    
    ];

  

    public static $rules = [
        'q' => 'nullable',
        'category' => 'nullable',
        'country' => 'nullable',
        'language' => 'nullable',
        'tag' => 'nullable',
       
    ];
}
