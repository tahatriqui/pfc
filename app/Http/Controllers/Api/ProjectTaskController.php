<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProjectTask;
use Illuminate\Http\Request;

class ProjectTaskController extends Controller
{
  public function index()
  {
    return ProjectTask::with([
      'project:id,title,status,deadline',
      'assignedStudent:id,firstname,lastname,email',
    ])->latest()->get();
  }

  public function store(Request $request)
  {
    $data = $request->validate([
      'project_id' => 'required|exists:projects,id',
      'assigned_to' => 'nullable|exists:users,id',
      'title' => 'required|string|max:255',
      'description' => 'nullable|string',
      'status' => 'nullable|in:todo,in_progress,done',
      'priority' => 'nullable|in:low,medium,high',
      'due_date' => 'nullable|date',
    ]);

    $task = ProjectTask::create([
      'project_id' => $data['project_id'],
      'assigned_to' => $data['assigned_to'] ?? null,
      'title' => $data['title'],
      'description' => $data['description'] ?? null,
      'status' => $data['status'] ?? 'todo',
      'priority' => $data['priority'] ?? 'medium',
      'due_date' => $data['due_date'] ?? null,
    ]);

    return response()->json(
      $task->load(['project', 'assignedStudent']),
      201
    );
  }

  public function show(ProjectTask $projectTask)
  {
    return $projectTask->load([
      'project:id,title,status,deadline',
      'assignedStudent:id,firstname,lastname,email',
    ]);
  }

  public function update(Request $request, ProjectTask $projectTask)
  {
    $data = $request->validate([
      'project_id' => 'sometimes|required|exists:projects,id',
      'assigned_to' => 'nullable|exists:users,id',
      'title' => 'sometimes|required|string|max:255',
      'description' => 'nullable|string',
      'status' => 'nullable|in:todo,in_progress,done',
      'priority' => 'nullable|in:low,medium,high',
      'due_date' => 'nullable|date',
    ]);

    $projectTask->update($data);

    return $projectTask->load(['project', 'assignedStudent']);
  }

  public function destroy(ProjectTask $projectTask)
  {
    $projectTask->delete();

    return response()->json([
      'message' => 'Task deleted successfully',
    ]);
  }
}
