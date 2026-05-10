<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function create()
    {
        return Inertia::render('Karyawan/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'kode_karyawan' => 'required|string|unique:karyawans,kode_karyawan',
            'masa_kerja' => 'required|numeric',
            'umur' => 'required|numeric',
        ]);

        Karyawan::create($data);

        return redirect('/dashboard')->with('message', 'Sukses Tambah Data!');
    }

    public function edit($id)
    {
        $employee = Karyawan::findOrFail($id);
        return Inertia::render('Karyawan/Edit', [
            'employee' => $employee
        ]);
    }

    public function update(Request $request, $id)
    {
        $employee = Karyawan::findOrFail($id);
        
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'kode_karyawan' => 'required|string|unique:karyawans,kode_karyawan,' . $id,
            'masa_kerja' => 'required|numeric',
            'umur' => 'required|numeric', // Update umur juga
        ]);

        $employee->update($data);

        return redirect('/dashboard')->with('message', 'Data Berhasil Diupdate!');
    }

    public function destroy($id)
    {
        Karyawan::findOrFail($id)->delete();
        return redirect()->back();
    }
}