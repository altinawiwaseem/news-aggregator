<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PreferenceController extends Controller
{
    public function create(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'search' => 'nullable',
            'category' => 'nullable',
            'country' => 'nullable',
            'language' => 'nullable',
            'tag' => 'nullable',
            'fromDate' => 'nullable|date',
            'toDate' => 'nullable|date|after_or_equal:fromDate',
        ]);

        // Create and save a Preference instance
        $preference = Preference::create($validatedData);

        // Optionally, you can return a response or redirect
        // to another page after the preference is created
        return response()->json([
            'message' => 'Preference created successfully',
            'preference' => $preference,
        ]);
    }


    public function store(Request $request)
    {
        logger($request->all());
        $validator = Validator::make($request->all(), Preference::$rules);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $preference = Preference::create($request->all());

        return response()->json([
            'message' => 'Preference created successfully',
            'preference' => $preference,
        ], 201);
    }

  
    // ...
}
