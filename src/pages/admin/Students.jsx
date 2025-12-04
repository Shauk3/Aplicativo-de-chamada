import { useState, useEffect } from 'react';
import { storage } from '../../services/storage';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Plus, Trash2, User } from 'lucide-react';

export default function Students() {
    const [students, setStudents] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({ name: '', matricula: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = () => {
        setStudents(storage.getStudents());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        try {
            storage.createStudent(formData.name, formData.matricula);
            setFormData({ name: '', matricula: '' });
            setIsCreating(false);
            loadStudents();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Alunos</h1>
                <Button onClick={() => setIsCreating(!isCreating)}>
                    <Plus className="w-4 h-4 mr-2 inline" />
                    Novo Aluno
                </Button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-lg font-semibold mb-4">Cadastrar Aluno</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Nome"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Matrícula"
                                value={formData.matricula}
                                onChange={e => setFormData({ ...formData, matricula: e.target.value })}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="secondary" onClick={() => setIsCreating(false)}>Cancelar</Button>
                            <Button type="submit">Salvar</Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-500">Nome</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Matrícula</th>
                            <th className="px-6 py-4 font-medium text-gray-500 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                    Nenhum aluno cadastrado.
                                </td>
                            </tr>
                        ) : (
                            students.map(student => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium text-gray-900">{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {student.matricula}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
