<?php

use App\Http\Controllers\Api\StudentProjectController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentParentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(static function () {
    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/projects', \App\Http\Controllers\Api\ProjectController::class);
    Route::apiResource('/tasks', \App\Http\Controllers\Api\TaskController::class);
    Route::apiResource('/deliverables', \App\Http\Controllers\Api\DeliverableController::class);
    Route::apiResource('/evaluations', \App\Http\Controllers\Api\EvaluationController::class);
    Route::apiResource('/project-tasks', \App\Http\Controllers\Api\ProjectTaskController::class);
});

Route::middleware(['auth:sanctum', 'ability:student'])->prefix('student')->group(static function () {
});
Route::middleware(['auth:sanctum', 'ability:student'])
    ->prefix('student')
    ->group(function () {
        Route::get('/projects', [StudentProjectController::class, 'myProjects']);
        Route::get('/tasks', [StudentProjectController::class, 'myTasks']);
        Route::put('/tasks/{projectTask}/status', [StudentProjectController::class, 'updateTaskStatus']);
    });

Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(static function () {
    Route::apiResources([
        'parents' => StudentParentController::class,
        'students' => StudentController::class,
    ]);
    Route::apiResource('projects', \App\Http\Controllers\Api\ProjectController::class);
    Route::apiResource('project-tasks', \App\Http\Controllers\Api\ProjectTaskController::class);
});

Route::middleware(['auth:sanctum', 'ability:teacher'])->prefix('teacher')->group(static function () {
});

require __DIR__.'/auth.php';
