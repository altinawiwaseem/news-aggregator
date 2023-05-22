<?php

use Illuminate\Http\Request;
use App\Http\Controllers\NController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



Route::post("register", [UserController::class, "register"]);

Route::post("login", [UserController::class, "login"]);

Route::post('/logout', [UserController::class, 'logout']);

Route::post("preferences", [PreferenceController::class, "create"]);

Route::get('/preferences', [PreferenceController::class, 'index']);

Route::post('/preferences', [PreferenceController::class, 'store']);

Route::put('/preferences/{id}', [PreferenceController::class, 'update']);

Route::delete('/preferences', [PreferenceController::class, 'destroy']);







Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
