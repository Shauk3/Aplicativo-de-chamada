import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { LogOut, School, Users, BookOpen, LayoutDashboard } from 'lucide-react';

export function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200 flex items-center gap-2">
                    <School className="w-8 h-8 text-blue-600" />
                    <span className="font-bold text-xl text-gray-800">Chamada App</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {user.role === 'admin' ? (
                        <>
                            <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                                <LayoutDashboard className="w-5 h-5" />
                                Dashboard
                            </Link>
                            <Link to="/admin/professors" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                                <Users className="w-5 h-5" />
                                Professores
                            </Link>
                            <Link to="/admin/students" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                                <Users className="w-5 h-5" />
                                Alunos
                            </Link>
                            <Link to="/admin/classrooms" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                                <BookOpen className="w-5 h-5" />
                                Salas
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/professor" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                                <LayoutDashboard className="w-5 h-5" />
                                Minhas Salas
                            </Link>
                        </>
                    )}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="mb-4 px-4">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
