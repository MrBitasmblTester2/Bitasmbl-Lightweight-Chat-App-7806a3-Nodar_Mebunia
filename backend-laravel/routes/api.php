<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

Route::get('rooms/{room}/history',[ChatController::class,'history']);
Route::post('rooms/{room}/message',[ChatController::class,'store']);
