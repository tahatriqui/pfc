<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectTask extends Model
{
  protected $fillable = [
    'project_id',
    'assigned_to',
    'title',
    'description',
    'status',
    'priority',
    'due_date',
  ];

  public function project()
  {
    return $this->belongsTo(Project::class);
  }

  public function assignedStudent()
  {
    return $this->belongsTo(User::class, 'assigned_to');
  }
}
