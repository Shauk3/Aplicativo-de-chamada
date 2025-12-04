import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { School } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (login(email, password)) {
            // Redirect based on role is handled in ProtectedRoute or we can do it here
            // But for now, let's just let the user navigate or we can force it
            // Actually, better to just navigate to root and let routing handle it
            navigate('/');
        } else {
            setError('Email ou senha inválidos');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <School className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
                    <p className="text-gray-500">Faça login para acessar sua conta</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                    />

                    <Input
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full py-3">
                        Entrar
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Admin padrão: admin@admin.com / admin</p>
                </div>
            </div>
        </div>
    );
}
