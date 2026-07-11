import { createBrowserRouter } from "react-router-dom";

import AuthHome from "../pages/AuthHome.jsx";
import Login from "../pages/Login.jsx";
import NotFound from "../pages/NotFound.jsx";

import Layout from "../layouts/Layout.jsx";
import GuestLayout from "../layouts/GuestLayout.jsx";

import StudentProjects from "../components/Student/StudentProjects.jsx";
import StudentTasks from "../components/Student/StudentTasks.jsx";

import StudentDashboardLayout from "../layouts/StudentDashboardLayout.jsx";
import StudentDashboard from "../components/Student/StudentDashboard.jsx";

import AdminDashboardLayout from "../layouts/AdminDashboardLayout.jsx";
import AdminDashboard from "../components/Admin/Pages/AdminDashboard.jsx";
import ManageParents from "../components/Admin/Pages/ManageParents.jsx";
import ManageStudents from "../components/Admin/Pages/ManageStudents.jsx";
import AdminProjects from "../components/Admin/Pages/AdminProjects.jsx";
import AdminTasks from "../components/Admin/Pages/AdminTasks.jsx";

import TeacherProjects from "../components/Teacher/TeacherProjects.jsx";
import TeacherTasks from "../components/Teacher/TeacherTasks.jsx";
import TeacherDashboardLayout from "../layouts/TeacherDashboardLayout.jsx";
import TeacherDashboard from "../components/Teacher/TeacherDashboard.jsx";

import ParentDashboardLayout from "../layouts/ParentDashboardLayout.jsx";

export const LOGIN_ROUTE = "/login";

export const STUDENT_DASHBOARD_ROUTE = "/student/dashboard";

const ADMIN_BASE_ROUTE = "/admin";
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE + "/dashboard";
export const ADMIN_MANAGE_PARENTS_ROUTE = ADMIN_BASE_ROUTE + "/manage-parents";
export const ADMIN_MANAGE_STUDENTS_ROUTE =
  ADMIN_BASE_ROUTE + "/manage-students";
export const ADMIN_PROJECTS_ROUTE = ADMIN_BASE_ROUTE + "/projects";
export const ADMIN_TASKS_ROUTE = ADMIN_BASE_ROUTE + "/tasks";

export const TEACHER_DASHBOARD_ROUTE = "/teacher/dashboard";
export const TEACHER_PROJECTS_ROUTE = "/teacher/projects";
export const TEACHER_TASKS_ROUTE = "/teacher/tasks";

export const PARENT_DASHBOARD_ROUTE = "/parent/dashboard";

export const redirectToDashboard = (roleType) => {
  switch (roleType) {
    case "student":
      return STUDENT_DASHBOARD_ROUTE;
    case "admin":
      return ADMIN_DASHBOARD_ROUTE;
    case "teacher":
      return TEACHER_DASHBOARD_ROUTE;
    case "parent":
      return PARENT_DASHBOARD_ROUTE;
    default:
      return LOGIN_ROUTE;
  }
};

export const STUDENT_PROJECTS_ROUTE = "/student/projects";
export const STUDENT_TASKS_ROUTE = "/student/tasks";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AuthHome />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    element: <GuestLayout />,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <Login />,
      },
    ],
  },
  {
    element: <StudentDashboardLayout />,
    children: [
      {
        path: STUDENT_DASHBOARD_ROUTE,
        element: <StudentDashboard />,
      },
      {
        path: STUDENT_PROJECTS_ROUTE,
        element: <StudentProjects />,
      },
      {
        path: STUDENT_TASKS_ROUTE,
        element: <StudentTasks />,
      },
    ],
  },
  {
    element: <AdminDashboardLayout />,
    children: [
      {
        path: ADMIN_DASHBOARD_ROUTE,
        element: <AdminDashboard />,
      },
      {
        path: ADMIN_MANAGE_STUDENTS_ROUTE,
        element: <ManageStudents />,
      },
      {
        path: ADMIN_MANAGE_PARENTS_ROUTE,
        element: <ManageParents />,
      },
      {
        path: ADMIN_PROJECTS_ROUTE,
        element: <AdminProjects />,
      },
      {
        path: ADMIN_TASKS_ROUTE,
        element: <AdminTasks />,
      },
    ],
  },
  {
    element: <ParentDashboardLayout />,
    children: [
      {
        path: PARENT_DASHBOARD_ROUTE,
        element: <AdminDashboard />,
      },
    ],
  },
  {
    element: <TeacherDashboardLayout />,
    children: [
      {
        path: TEACHER_DASHBOARD_ROUTE,
        element: <TeacherDashboard />,
      },
      {
        path: TEACHER_PROJECTS_ROUTE,
        element: <TeacherProjects />,
      },
      {
        path: TEACHER_TASKS_ROUTE,
        element: <TeacherTasks />,
      },
    ],
  },
]);
