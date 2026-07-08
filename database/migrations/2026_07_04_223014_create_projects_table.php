<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('projects', function (Blueprint $table) {
      $table->id();

      $table->string('title');
      $table->text('description')->nullable();

      $table->foreignId('teacher_id')
        ->constrained('teachers')
        ->cascadeOnDelete();

      $table->foreignId('classe_id')
        ->nullable()
        ->constrained('classes')
        ->nullOnDelete();

      $table->enum('status', ['pending', 'active', 'completed', 'cancelled'])
        ->default('pending');

      $table->date('deadline')->nullable();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('projects');
  }
};
