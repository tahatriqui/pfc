<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  public function run(): void
  {
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');

    // ================= RESET TABLES =================
    DB::table('project_tasks')->truncate();
    DB::table('project_members')->truncate();
    DB::table('projects')->truncate();

    DB::table('exam_records')->truncate();
    DB::table('exams')->truncate();
    DB::table('class_type_courses')->truncate();
    DB::table('classes')->truncate();
    DB::table('class_types')->truncate();
    DB::table('courses')->truncate();
    DB::table('users')->truncate();
    DB::table('student_parents')->truncate();
    DB::table('teachers')->truncate();
    DB::table('admins')->truncate();

    DB::statement('SET FOREIGN_KEY_CHECKS=1;');

    $now = now();

    // ================= ADMIN =================
    DB::table('admins')->insert([
      'firstname' => 'Admin',
      'lastname' => 'Admin',
      'date_of_birth' => '1990-01-01',
      'gender' => 'm',
      'address' => 'Rabat',
      'blood_type' => 'O+',
      'phone' => '0600000001',
      'email' => 'admin@admin.admin',
      'password' => Hash::make('123456789'),
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    // ================= TEACHERS =================
    $teacher1 = DB::table('teachers')->insertGetId([
      'firstname' => 'Teacher',
      'lastname' => 'One',
      'date_of_birth' => '1988-05-12',
      'gender' => 'm',
      'address' => 'Casablanca',
      'blood_type' => 'A+',
      'phone' => '0600000002',
      'email' => 'teacher@teacher.teacher',
      'password' => Hash::make('123456789'),
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    $teacher2 = DB::table('teachers')->insertGetId([
      'firstname' => 'Sara',
      'lastname' => 'Alami',
      'date_of_birth' => '1992-03-20',
      'gender' => 'f',
      'address' => 'Rabat',
      'blood_type' => 'B+',
      'phone' => '0600000003',
      'email' => 'sara.teacher@test.com',
      'password' => Hash::make('123456789'),
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    // ================= PARENTS =================
    $parent1 = DB::table('student_parents')->insertGetId([
      'firstname' => 'Parent',
      'lastname' => 'One',
      'date_of_birth' => '1975-02-10',
      'last_login_date' => $now,
      'gender' => 'm',
      'blood_type' => 'O+',
      'address' => 'Rabat',
      'phone' => '0611111111',
      'email' => 'parent@test.com',
      'password' => Hash::make('123456789'),
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    $parent2 = DB::table('student_parents')->insertGetId([
      'firstname' => 'Fatima',
      'lastname' => 'Zahra',
      'date_of_birth' => '1980-07-15',
      'last_login_date' => $now,
      'gender' => 'f',
      'blood_type' => 'A+',
      'address' => 'Temara',
      'phone' => '0622222222',
      'email' => 'fatima.parent@test.com',
      'password' => Hash::make('123456789'),
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    // ================= STUDENTS =================
    $student1 = DB::table('users')->insertGetId([
      'firstname' => 'Taha',
      'lastname' => 'Triqui',
      'email' => 'taha@gmail.com',
      'password' => Hash::make('123456789'),
      'date_of_birth' => '2005-04-10',
      'last_login_date' => $now,
      'gender' => 'm',
      'blood_type' => 'O+',
      'student_parent_id' => $parent1,
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    $student2 = DB::table('users')->insertGetId([
      'firstname' => 'Youssef',
      'lastname' => 'Alaoui',
      'email' => 'youssef@student.test',
      'password' => Hash::make('123456789'),
      'date_of_birth' => '2006-09-22',
      'last_login_date' => $now,
      'gender' => 'm',
      'blood_type' => 'A+',
      'student_parent_id' => $parent1,
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    $student3 = DB::table('users')->insertGetId([
      'firstname' => 'Salma',
      'lastname' => 'Benali',
      'email' => 'salma@student.test',
      'password' => Hash::make('123456789'),
      'date_of_birth' => '2006-12-01',
      'last_login_date' => $now,
      'gender' => 'f',
      'blood_type' => 'B+',
      'student_parent_id' => $parent2,
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    // ================= COURSES =================
    $math = DB::table('courses')->insertGetId([
      'name' => 'Mathématiques',
      'description' => 'Cours de mathématiques',
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    $info = DB::table('courses')->insertGetId([
      'name' => 'Informatique',
      'description' => 'Cours de programmation et informatique',
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    $fr = DB::table('courses')->insertGetId([
      'name' => 'Français',
      'description' => 'Cours de français',
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    // ================= CLASS TYPES =================
    $devType = DB::table('class_types')->insertGetId([
      'name' => 'Développement Digital',
      'code' => 'DD',
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    $gestionType = DB::table('class_types')->insertGetId([
      'name' => 'Gestion',
      'code' => 'GE',
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    // ================= CLASSES =================
    $classe1 = DB::table('classes')->insertGetId([
      'name' => 'DD101',
      'code' => 'DD101',
      'class_type_id' => $devType,
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    $classe2 = DB::table('classes')->insertGetId([
      'name' => 'GE101',
      'code' => 'GE101',
      'class_type_id' => $gestionType,
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    // ================= CLASS TYPE COURSES =================
    DB::table('class_type_courses')->insert([
      [
        'class_type_id' => $devType,
        'course_id' => $math,
        'coef' => 3,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'class_type_id' => $devType,
        'course_id' => $info,
        'coef' => 5,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'class_type_id' => $gestionType,
        'course_id' => $fr,
        'coef' => 2,
        'created_at' => $now,
        'updated_at' => $now,
      ],
    ]);

    // ================= EXAMS =================
    $exam1 = DB::table('exams')->insertGetId([
      'name' => 'Contrôle Math 1',
      'teacher_id' => $teacher1,
      'course_id' => $math,
      'classe_id' => $classe1,
      'type' => 'cc',
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    $exam2 = DB::table('exams')->insertGetId([
      'name' => 'EFM Informatique',
      'teacher_id' => $teacher2,
      'course_id' => $info,
      'classe_id' => $classe1,
      'type' => 'efm',
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    // ================= EXAM RECORDS / NOTES =================
    DB::table('exam_records')->insert([
      [
        'exam_id' => $exam1,
        'user_id' => $student1,
        'note' => 15.5,
        'comment' => 'Bon travail',
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'exam_id' => $exam1,
        'user_id' => $student2,
        'note' => 12,
        'comment' => 'Moyen',
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'exam_id' => $exam2,
        'user_id' => $student1,
        'note' => 17,
        'comment' => 'Très bien',
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'exam_id' => $exam2,
        'user_id' => $student3,
        'note' => 14,
        'comment' => 'Bien',
        'created_at' => $now,
        'updated_at' => $now,
      ],
    ]);

    // ================= PROJECTS / PROJECT MEMBERS / TASKS =================
    $project1 = DB::table('projects')->insertGetId([
      'title' => 'Plateforme collaborative de gestion de projets étudiants',
      'description' => 'Application permettant aux étudiants de travailler en équipe, gérer les tâches, déposer les livrables et recevoir les remarques de l’encadrant.',
      'teacher_id' => $teacher1,
      'classe_id' => $classe1,
      'status' => 'active',
      'deadline' => '2026-07-25',
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    $project2 = DB::table('projects')->insertGetId([
      'title' => 'Application de gestion bibliothèque',
      'description' => 'Application simple pour gérer les livres, les étudiants et les emprunts.',
      'teacher_id' => $teacher2,
      'classe_id' => $classe1,
      'status' => 'pending',
      'deadline' => '2026-07-30',
      'created_at' => $now,
      'updated_at' => $now,
    ]);

    DB::table('project_members')->insert([
      [
        'project_id' => $project1,
        'user_id' => $student1,
        'role' => 'leader',
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'project_id' => $project1,
        'user_id' => $student2,
        'role' => 'member',
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'project_id' => $project2,
        'user_id' => $student3,
        'role' => 'leader',
        'created_at' => $now,
        'updated_at' => $now,
      ],
    ]);

    DB::table('project_tasks')->insert([
      [
        'project_id' => $project1,
        'assigned_to' => $student1,
        'title' => 'Créer les migrations Laravel',
        'description' => 'Créer les tables projects, project_members et project_tasks.',
        'status' => 'done',
        'priority' => 'high',
        'due_date' => '2026-07-10',
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'project_id' => $project1,
        'assigned_to' => $student1,
        'title' => 'Créer les pages React admin',
        'description' => 'Créer les pages AdminProjects et AdminTasks.',
        'status' => 'in_progress',
        'priority' => 'high',
        'due_date' => '2026-07-15',
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'project_id' => $project1,
        'assigned_to' => $student2,
        'title' => 'Ajouter les commentaires',
        'description' => 'Permettre aux étudiants de commenter les tâches.',
        'status' => 'todo',
        'priority' => 'medium',
        'due_date' => '2026-07-20',
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'project_id' => $project2,
        'assigned_to' => $student3,
        'title' => 'Créer la page livres',
        'description' => 'Créer une interface pour afficher les livres.',
        'status' => 'todo',
        'priority' => 'medium',
        'due_date' => '2026-07-22',
        'created_at' => $now,
        'updated_at' => $now,
      ],
    ]);
  }
}
