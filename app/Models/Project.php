<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  protected $fillable = [
    'title',
    'description',
    'teacher_id',
    'classe_id',
    'status',
    'deadline',
  ];

  public function teacher()
  {
    return $this->belongsTo(Teacher::class);
  }

  public function members()
  {
    return $this->belongsToMany(User::class, 'project_members')
      ->withPivot('role')
      ->withTimestamps();
  }

  public function tasks()
  {
    return $this->hasMany(ProjectTask::class);
  }
}
