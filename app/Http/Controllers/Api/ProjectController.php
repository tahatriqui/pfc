<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectMember;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
  public function index()
  {
    return Project::with([
      'teacher:id,firstname,lastname,email',
      'members:id,firstname,lastname,email',
      'tasks',
    ])->latest()->get();
  }

  public function store(Request $request)
  {
    $data = $request->validate([
      'title' => 'required|string|max:255',
      'description' => 'nullable|string',
      'teacher_id' => 'required|exists:teachers,id',
      'classe_id' => 'nullable|exists:classes,id',
      'status' => 'nullable|in:pending,active,completed,cancelled',
      'deadline' => 'nullable|date',

      'members' => 'required|array|min:1',
      'members.*.user_id' => 'required|exists:users,id',
      'members.*.role' => 'nullable|in:leader,member',
    ]);

    $project = Project::create([
      'title' => $data['title'],
      'description' => $data['description'] ?? null,
      'teacher_id' => $data['teacher_id'],
      'classe_id' => $data['classe_id'] ?? null,
      'status' => $data['status'] ?? 'pending',
      'deadline' => $data['deadline'] ?? null,
    ]);

    foreach ($data['members'] as $member) {
      ProjectMember::create([
        'project_id' => $project->id,
        'user_id' => $member['user_id'],
        'role' => $member['role'] ?? 'member',
      ]);
    }

    return response()->json(
      $project->load(['teacher', 'members', 'tasks']),
      201
    );
  }

  public function show(Project $project)
  {
    return $project->load([
      'teacher:id,firstname,lastname,email',
      'members:id,firstname,lastname,email',
      'tasks.assignedStudent:id,firstname,lastname,email',
    ]);
  }

  public function update(Request $request, Project $project)
  {
    $data = $request->validate([
      'title' => 'sometimes|required|string|max:255',
      'description' => 'nullable|string',
      'teacher_id' => 'sometimes|required|exists:teachers,id',
      'classe_id' => 'nullable|exists:classes,id',
      'status' => 'nullable|in:pending,active,completed,cancelled',
      'deadline' => 'nullable|date',

      'members' => 'nullable|array',
      'members.*.user_id' => 'required_with:members|exists:users,id',
      'members.*.role' => 'nullable|in:leader,member',
    ]);

    $project->update([
      'title' => $data['title'] ?? $project->title,
      'description' => $data['description'] ?? $project->description,
      'teacher_id' => $data['teacher_id'] ?? $project->teacher_id,
      'classe_id' => $data['classe_id'] ?? $project->classe_id,
      'status' => $data['status'] ?? $project->status,
      'deadline' => $data['deadline'] ?? $project->deadline,
    ]);

    if (array_key_exists('members', $data)) {
      ProjectMember::where('project_id', $project->id)->delete();

      foreach ($data['members'] as $member) {
        ProjectMember::create([
          'project_id' => $project->id,
          'user_id' => $member['user_id'],
          'role' => $member['role'] ?? 'member',
        ]);
      }
    }

    return $project->load(['teacher', 'members', 'tasks']);
  }

  public function destroy(Project $project)
  {
    $project->delete();

    return response()->json([
      'message' => 'Project deleted successfully',
    ]);
  }
}
