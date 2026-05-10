<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\KaryawanSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
public function run(): void
{
    // Dia bakal cari email ini, kalau ada dia UPDATE, kalau gak ada baru CREATE
    \App\Models\User::updateOrCreate(
        ['email' => 'admin@example.com'], 
        [
            'name' => 'Admin',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]
    );

    $this->call([
        KaryawanSeeder::class,
    ]);
}
}
