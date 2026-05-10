<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // PENTING: Matikan pengecekan foreign key sementara
        Schema::disableForeignKeyConstraints();

        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            
            // 1. Sesuaikan nama target tabel ke 'karyawans' (bukan employees)
            // 2. Gunakan unsignedBigInteger dulu agar tidak error urutan file
            $table->unsignedBigInteger('karyawan_id');
            
            $table->date('date');
            $table->time('time');
            $table->string('status'); 
            $table->timestamps();

            // Tambahkan index manual agar tetap cepat
            $table->index('karyawan_id');
        });

        // Nyalakan kembali pengecekan
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};