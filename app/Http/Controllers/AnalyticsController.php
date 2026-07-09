<?php

namespace App\Http\Controllers;

use App\Models\Dataset;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function show(Dataset $dataset)
    {
        // Pastikan dataset sudah selesai diproses sebelum dianalisis
        if ($dataset->status !== 'completed') {
            abort(404, 'Dataset masih diproses atau gagal.');
        }

        // 1. Mengambil sampel struktur kolom dari satu baris data (untuk dynamic keys)
        $sampleData = $dataset->dataEntries()->first();
        $availableColumns = $sampleData ? array_keys($sampleData->payload) : [];

        // 2. Mengambil 100 baris pertama untuk Data Table interaktif
        $previewData = $dataset->dataEntries()->limit(100)->get()->pluck('payload');

        // 3. (Opsional) Contoh query agregat langsung ke JSONB menggunakan RAW SQL
        // Misalnya Anda punya kolom 'revenue' di CSV:
        // $totalRevenue = DB::table('data_entries')
        //     ->where('dataset_id', $dataset->id)
        //     ->sum(DB::raw("CAST(payload->>'revenue' AS NUMERIC)"));

        // Mengirimkan data dan metrik dasar ke komponen React
        return Inertia::render('Analytics', [
            'dataset' => [
                'id' => $dataset->id,
                'name' => $dataset->name,
                'total_rows' => $dataset->total_rows,
            ],
            'columns' => $availableColumns,
            'previewData' => $previewData,
        ]);
    }
}
