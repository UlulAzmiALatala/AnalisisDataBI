<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DatasetController;

// 1. FRONTEND / USER (React + Inertia)
Route::get('/', function () {
    return Inertia::render('Dashboard');
});

// 2. ADMIN PANEL (Blade + Alpine)
Route::prefix('admin')->group(function () {
    // Kita arahkan /admin agar langsung masuk ke halaman datasets
    Route::get('/', function () {
        return redirect()->route('admin.datasets.index');
    });

    Route::get('/datasets', [DatasetController::class, 'index'])->name('admin.datasets.index');
    Route::post('/datasets', [DatasetController::class, 'store'])->name('admin.datasets.store');
    Route::delete('/datasets/{dataset}', [DatasetController::class, 'destroy'])->name('admin.datasets.destroy');
});
