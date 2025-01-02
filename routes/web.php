<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserpageController;

Route::prefix('')->group(function () {
    Route::get('/', [UserpageController::class, 'index'])->name('userpage');

    Route::middleware(['auth'])->group(function () {});
});
