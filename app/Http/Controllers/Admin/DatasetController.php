<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dataset;
use Illuminate\Http\Request;
use App\Imports\DatasetImport;
use Maatwebsite\Excel\Facades\Excel;

class DatasetController extends Controller
{
    public function index()
    {
        $datasets = Dataset::latest()->get();

        // Mengembalikan view Blade standar (bukan Inertia)
        return view('admin.datasets.index', compact('datasets'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'required|file|mimes:csv,txt,xlsx|max:10240',
        ]);

        // 1. Buat record Dataset dengan status awal 'processing'
        $dataset = Dataset::create([
            'name' => $request->name,
            'status' => 'processing',
        ]);

        // 2. Simpan file fisik secara lokal sementara
        $filePath = $request->file('file')->store('datasets');

        // 3. Lemparkan tugas pembacaan file ke Background Job
        Excel::import(new DatasetImport($dataset), $filePath);

        return back()->with('success', 'Dataset berhasil diunggah dan sedang diproses di latar belakang.');
    }

    public function destroy(Dataset $dataset)
    {
        $dataset->delete(); // Ini otomatis akan menghapus data_entries berkat cascadeOnDelete di migrasi
        return back()->with('success', 'Dataset beserta datanya berhasil dihapus.');
    }
}
