<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserpageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;


Route::get('/login', [LoginController::class, 'indexlogin'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::get('/register', [LoginController::class, 'indexregister'])->name('register');
Route::post('/register', [LoginController::class, 'register']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::prefix('')->group(function () {
    Route::get('/', [UserpageController::class, 'index'])->name('userpage');

    Route::middleware(['auth'])->group(function () {});
});


Route::prefix('dashboard')->middleware('auth.custom')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
  
});