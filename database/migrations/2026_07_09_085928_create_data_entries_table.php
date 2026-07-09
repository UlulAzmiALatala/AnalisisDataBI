<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('data_entries', function (Blueprint $table) {
            $table->uuid('id')->primary();

            // Relasi ke tabel datasets. Jika dataset dihapus, seluruh baris datanya ikut terhapus otomatis.
            $table->foreignUuid('dataset_id')->constrained('datasets')->cascadeOnDelete();

            // Menyimpan baris data mentah dari Excel/CSV dalam format JSON
            $table->jsonb('payload');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('data_entries');
    }
};
