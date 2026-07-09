<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectTask;
use Illuminate\Http\Request;

class TeacherProjectController extends Controller
{
    public function myProjects(Request $request)
    {
        $teacher = $request->user();

        return Project::with([
            'teacher:id,firstname,lastname,email',
            'members:id,firstname,lastname,email',
            'tasks.assignedStudent:id,firstname,lastname,email',
        ])
            ->where('teacher_id', $teacher->id)
            ->latest()
            ->get();
    }

    public function myTasks(Request $request)
    {
        $teacher = $request->user();

        return ProjectTask::with([
            'project:id,title,status,deadline,teacher_id',
            'assignedStudent:id,firstname,lastname,email',
        ])
            ->whereHas('project', function ($query) use ($teacher) {
                $query->where('teacher_id', $teacher->id);
            })
            ->latest()
            ->get();
    }

    public function createTask(Request $request)
    {
        $teacher = $request->user();

        $data = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:todo,in_progress,done',
            'priority' => 'nullable|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        $project = Project::with('members')->findOrFail($data['project_id']);

        if ((int) $project->teacher_id !== (int) $teacher->id) {
            return response()->json([
                'message' => 'Unauthorized project.',
            ], 403);
        }

        $isMember = $project->members
            ->where('id', $data['assigned_to'])
            ->isNotEmpty();

        if (!$isMember) {
            return response()->json([
                'message' => 'This student is not a member of this project.',
            ], 422);
        }

        $task = ProjectTask::create([
            'project_id' => $data['project_id'],
            'assigned_to' => $data['assigned_to'],
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'] ?? 'todo',
            'priority' => $data['priority'] ?? 'medium',
            'due_date' => $data['due_date'] ?? null,
        ]);

        return response()->json(
            $task->load([
                'project:id,title,status,deadline,teacher_id',
                'assignedStudent:id,firstname,lastname,email',
            ]),
            201
        );
    }
}
