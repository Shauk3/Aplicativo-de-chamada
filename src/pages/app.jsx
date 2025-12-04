import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Layout } from '../components/Layout';
import Login from './Login';
import AdminDashboard from './admin/Dashboard';
import Professors from './admin/Professors';
import Students from './admin/Students';
import Classrooms from './admin/Classrooms';
import ProfessorDashboard from './professor/Dashboard';
import ClassroomDetails from './professor/ClassroomDetails';

function RootRedirect() {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    return <Navigate to={user.role === 'admin' ? '/admin' : '/professor'} replace />;
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route element={<Layout />}>
                        <Route path="/" element={<RootRedirect />} />

                        {/* Admin Routes */}
                        <Route path="/admin" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/professors" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <Professors />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/students" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <Students />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/classrooms" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <Classrooms />
                            </ProtectedRoute>
                        } />

                        {/* Professor Routes */}
                        <Route path="/professor" element={
                            <ProtectedRoute allowedRoles={['professor']}>
                                <ProfessorDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/professor/classroom/:id" element={
                            <ProtectedRoute allowedRoles={['professor']}>
                                <ClassroomDetails />
                            </ProtectedRoute>
                        } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}