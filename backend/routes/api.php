<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from ticketing API!'
    ]);
});

Route::post('/echo', function (\Illuminate\Http\Request $request) {
    $validated = $request->validate([
        'title' => ['required', 'string', 'max:100'],
        'priority' => ['required', 'in:low,medium,high'],
    ]);

    return response()->json([
        'message' => 'Data berhasil diterima!',
        'received_data' => $request->all(),
    ]);
});

// CRUD USER
Route::middleware('auth:sanctum', 'role:user')->group(function () {
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::put('/tickets/{ticket}', [TicketController::class, 'update']);
    Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy']);
    Route::get('/tickets', [TicketController::class, 'index']);
    Route::get('/tickets/{ticket}', [TicketController::class, 'show']);
});

// CRUD ADMIN
Route::middleware('auth:sanctum', 'role:admin')->prefix('admin')->group(function () {
    Route::get('/tickets/{ticket}', [TicketController::class, 'adminShow']);
    Route::get('/tickets', [TicketController::class, 'adminIndex']);
    Route::patch('/tickets/{ticket}/status', [TicketController::class, 'updateStatus']);
    Route::delete('/tickets/{ticket}', [TicketController::class, 'adminDestroy']);
});

// Register
Route::post('/register', [AuthController::class, 'register']);

// Login
Route::post('/login', [AuthController::class, 'login']);

// Logout
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);