<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dataset;
use Illuminate\Http\Request;

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
            'file' => 'required|file|mimes:csv,txt,xlsx|max:10240', // Maksimal 10MB untuk contoh
        ]);

        // Logika ETL dan Upload akan kita taruh di sini nanti

        return back()->with('success', 'Dataset berhasil ditambahkan dan sedang diproses.');
    }

    public function destroy(Dataset $dataset)
    {
        $dataset->delete(); // Ini otomatis akan menghapus data_entries berkat cascadeOnDelete di migrasi
        return back()->with('success', 'Dataset beserta datanya berhasil dihapus.');
    }
}
