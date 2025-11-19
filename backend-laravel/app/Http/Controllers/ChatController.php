<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
class ChatController extends Controller {
  public function history($room){ return response()->json(['messages'=>[]]); }
  public function store(Request $r,$room){ return response()->json(['ok'=>true]); }
}
