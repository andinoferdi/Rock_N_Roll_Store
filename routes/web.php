<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserpageController;
use App\Http\Controllers\DashboardController;

Route::prefix('')->group(function () {
    Route::get('/', [UserpageController::class, 'index'])->name('userpage');

    Route::middleware(['auth'])->group(function () {});
});


Route::prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
  
});