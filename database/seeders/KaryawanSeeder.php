<?php

namespace Database\Seeders;

use App\Models\Karyawan;
use Illuminate\Database\Seeder;

class KaryawanSeeder extends Seeder
{
    public function run(): void
    {
        $karyawan = [
            ['name' => 'Cristiano Ronaldo', 'umur' => 39, 'masa_kerja' => 20, 'kode_karyawan' => 'KRY-001'],
            ['name' => 'Lionel Messi', 'umur' => 36, 'masa_kerja' => 19, 'kode_karyawan' => 'KRY-002'],
            ['name' => 'Neymar Jr', 'umur' => 32, 'masa_kerja' => 15, 'kode_karyawan' => 'KRY-003'],
            ['name' => 'Kylian Mbappe', 'umur' => 25, 'masa_kerja' => 8, 'kode_karyawan' => 'KRY-004'],
            ['name' => 'Erling Haaland', 'umur' => 23, 'masa_kerja' => 6, 'kode_karyawan' => 'KRY-005'],
            ['name' => 'Kevin De Bruyne', 'umur' => 32, 'masa_kerja' => 12, 'kode_karyawan' => 'KRY-006'],
            ['name' => 'Jude Bellingham', 'umur' => 20, 'masa_kerja' => 4, 'kode_karyawan' => 'KRY-007'],
            ['name' => 'Mohamed Salah', 'umur' => 31, 'masa_kerja' => 10, 'kode_karyawan' => 'KRY-008'],
            ['name' => 'Luka Modric', 'umur' => 38, 'masa_kerja' => 22, 'kode_karyawan' => 'KRY-009'],
            ['name' => 'Robert Lewandowski', 'umur' => 35, 'masa_kerja' => 18, 'kode_karyawan' => 'KRY-010'],
            ['name' => 'Virgil van Dijk', 'umur' => 32, 'masa_kerja' => 13, 'kode_karyawan' => 'KRY-011'],
            ['name' => 'Phil Foden', 'umur' => 23, 'masa_kerja' => 7, 'kode_karyawan' => 'KRY-012'],
            ['name' => 'Bukayo Saka', 'umur' => 22, 'masa_kerja' => 6, 'kode_karyawan' => 'KRY-013'],
            ['name' => 'Antoine Griezmann', 'umur' => 33, 'masa_kerja' => 14, 'kode_karyawan' => 'KRY-014'],
            ['name' => 'Harry Kane', 'umur' => 30, 'masa_kerja' => 12, 'kode_karyawan' => 'KRY-015'],
        ];

        foreach ($karyawan as $data) {
            Karyawan::create($data);
        }
    }
}