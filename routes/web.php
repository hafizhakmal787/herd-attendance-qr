<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Features;
use Inertia\Inertia;
use App\Models\Karyawan;
use App\Models\Attendance;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// --- 1. Halaman Depan ---
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'auth' => ['user' => Auth::user()],
    ]);
})->name('home');

// --- 2. Halaman Scanner ---
Route::get('/absensi', function () {
    return Inertia::render('AttendancePage', [
        'auth' => ['user' => Auth::user()]
    ]); 
})->name('absensi');

// --- 3. Proses Absen ---
Route::post('/scan-qr', [AttendanceController::class, 'scan'])->name('scan.qr');

// --- 4. Proteksi Admin ---
Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/dashboard', function () {
        if (Auth::user()->email !== 'admin@example.com') {
            return redirect('/')->with('error', 'Khusus Admin.');
        }

        return Inertia::render('dashboard', [
            'employees' => Karyawan::all(),
            'todayAttendances' => Attendance::with('karyawan')
                ->whereDate('date', now()->toDateString())
                ->orderBy('time', 'desc')
                ->get()
        ]);
    })->name('dashboard');

    Route::get('/karyawan/qr-list', function () {
        if (Auth::user()->email !== 'admin@example.com') {
            return redirect('/')->with('error', 'Akses terbatas.');
        }
        return Inertia::render('Karyawan/QRList', ['employees' => Karyawan::all()]);
    })->name('karyawan.qr');

    // Route Hapus User yang tadi error
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::get('/karyawan/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/karyawan', [UserController::class, 'store'])->name('users.store');

    Route::get('/karyawan/{karyawan}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/karyawan/{karyawan}', [UserController::class, 'update'])->name('users.update');

});

// --- 5. Logout ---
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/');
})->name('logout');