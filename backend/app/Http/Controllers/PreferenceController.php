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
    
        $preference = Preference::create($request->all());
    
        return response()->json($preference, 201);
    }
    
    public function update(Request $request, $id)
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
    
        $preference = Preference::findOrFail($id);
        $preference->update($request->all());
    
        return response()->json($preference, 200);
    }
    

    public function destroy($id)
    {
        $preference = Preference::findOrFail($id);
        $preference->delete();

        return response()->json(null, 204);
    }
}
