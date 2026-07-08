<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectTask;
use Illuminate\Http\Request;

class StudentProjectController extends Controller
{
    public function myProjects(Request $request)
    {
        $student = $request->user();

        return Project::with([
            'teacher:id,firstname,lastname,email',
            'members:id,firstname,lastname,email',
            'tasks.assignedStudent:id,firstname,lastname,email',
        ])
            ->whereHas('members', function ($query) use ($student) {
                $query->where('users.id', $student->id);
            })
            ->latest()
            ->get();
    }

    public function myTasks(Request $request)
    {
        $student = $request->user();

        return ProjectTask::with([
            'project:id,title,status,deadline',
            'assignedStudent:id,firstname,lastname,email',
        ])
            ->where('assigned_to', $student->id)
            ->latest()
            ->get();
    }

    public function updateTaskStatus(Request $request, ProjectTask $projectTask)
    {
        $student = $request->user();

        if ((int) $projectTask->assigned_to !== (int) $student->id) {
            return response()->json([
                'message' => 'Unauthorized action.',
            ], 403);
        }

        $data = $request->validate([
            'status' => 'required|in:todo,in_progress,done',
        ]);

        $projectTask->update([
            'status' => $data['status'],
        ]);

        return response()->json(
            $projectTask->load([
                'project:id,title,status,deadline',
                'assignedStudent:id,firstname,lastname,email',
            ])
        );
    }
}
