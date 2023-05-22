<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PreferenceController extends Controller
{
    public function index()
    {
        return Preference::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'language' => 'nullable|string|max:255',
            'tag' => 'nullable|string|max:255',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $preferenceData = $validator->validated();
        $hasAtLeastOneValue = $this->hasAtLeastOneValue($preferenceData);
    
        if (!$hasAtLeastOneValue) {
            return response()->json(['message' => 'At least one field must have a value.'], 400);
        }
    
        $preference = Preference::create($preferenceData);
    
        return response()->json($preference, 201);
    }
    
    private function hasAtLeastOneValue($data)
    {
        foreach ($data as $value) {
            if (!is_null($value)) {
                return true;
            }
        }
    
        return false;
    }
    
    

    public function destroy(Request $request)
    {
        $key = $request->input('key');
        $value = $request->input('value');

        // Delete the value inside the specified column
        Preference::where($key, $value)->update([$key => null]);

        

        return response()->json(['message' => 'Preference deleted successfully']);
    }

}