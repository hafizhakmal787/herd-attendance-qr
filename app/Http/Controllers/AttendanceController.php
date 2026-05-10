<?php

namespace App\Http\Controllers;

use App\Models\Karyawan; // Ganti ke Karyawan
use App\Models\Attendance;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function scan(Request $request)
    {
        // 1. Cari Karyawan berdasarkan kode_karyawan (KRY-xxx)
        // Kita pakai request->qr_code karena itu yang dikirim dari React
        $karyawan = Karyawan::where('kode_karyawan', $request->qr_code)->first();

        if (!$karyawan) {
            return response()->json(['message' => 'QR Tidak Terdaftar!'], 404);
        }

        // 2. Cek apakah hari ini sudah absen (pakai karyawan_id)
        $today = Carbon::today()->toDateString();
        $exists = Attendance::where('karyawan_id', $karyawan->id)
            ->where('date', $today)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Woi ' . $karyawan->name . ', kamu sudah absen hari ini!'
            ], 400);
        }

        // 3. Simpan data absen (Batas jam 07:00)
        $currentTime = Carbon::now();
        $status = $currentTime->format('H:i') > '07:00' ? 'Terlambat' : 'Hadir';

        Attendance::create([
            'karyawan_id' => $karyawan->id, // Pakai id dari tabel karyawans
            'date'        => $today,
            'time'        => $currentTime->format('H:i:s'),
            'status'      => $status
        ]);

        // 4. Balikin data buat dashboard React (Sesuaikan dengan kolom Indo)
        return response()->json([
            'nama'   => $karyawan->name,
            'usia'   => $karyawan->umur . ' Tahun',
            'kerja'  => $karyawan->masa_kerja . ' Tahun',
            'status' => $status,
            'message' => 'Berhasil Absen! Selamat Bekerja.'
        ]);
    }
}