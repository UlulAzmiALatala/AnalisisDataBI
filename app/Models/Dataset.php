<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dataset extends Model
{
    use HasFactory, HasUuids; // Mengaktifkan UUID

    protected $guarded = [];

    protected $casts = [
        'aggregations' => 'array', // Otomatis mengkonversi JSONB ke Array di PHP
    ];

    public function dataEntries()
    {
        return $this->hasMany(DataEntry::class);
    }
}
