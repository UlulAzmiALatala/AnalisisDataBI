<?php

namespace App\Imports;

use App\Models\Dataset;
use App\Models\DataEntry;
use Illuminate\Support\Str; // Tambahkan baris ini
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterImport;

class DatasetImport implements ToModel, WithHeadingRow, WithChunkReading, WithBatchInserts, ShouldQueue, WithEvents
{
    public $dataset;

    public function __construct(Dataset $dataset)
    {
        $this->dataset = $dataset;
    }

    public function model(array $row)
    {
        // Paksa pembuatan UUID secara eksplisit di sini
        return new DataEntry([
            'id'         => Str::uuid()->toString(),
            'dataset_id' => $this->dataset->id,
            'payload'    => $row,
        ]);
    }

    public function batchSize(): int
    {
        return 1000;
    }

    public function chunkSize(): int
    {
        return 1000;
    }

    public function registerEvents(): array
    {
        return [
            AfterImport::class => function (AfterImport $event) {
                $this->dataset->update([
                    'status' => 'completed',
                    'total_rows' => $this->dataset->dataEntries()->count()
                ]);
            },
        ];
    }
}
