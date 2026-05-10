<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model {
    protected $fillable = ['name', 'kode_karyawan', 'umur', 'masa_kerja'];
}