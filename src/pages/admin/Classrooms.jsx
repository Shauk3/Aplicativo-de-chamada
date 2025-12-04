import { useState, useEffect } from 'react';
import { storage } from '../../services/storage';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Plus, Trash2, BookOpen, Users } from 'lucide-react';

export default function Classrooms() {
    const [classrooms, setClassrooms] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({ name: '', subject: '' });
    const [error, setError] = useState('');
    const [selectedClassroom, setSelectedClassroom] = useState(null);
    const [students, setStudents] = useState([]);
    const [availableStudents, setAvailableStudents] = useState([]);

    useEffect(() => {
        loadClassrooms();
        setAvailableStudents(storage.getStudents());
    }, []);

    const loadClassrooms = () => {
        setClassrooms(storage.getClassrooms());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        try {
            storage.createClassroom(formData.name, formData.subject);
            setFormData({ name: '', subject: '' });
            setIsCreating(false);
            loadClassrooms();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEnrollStudent = (studentId) => {
        if (!selectedClassroom) return;
        storage.enrollStudent(selectedClassroom.id, studentId);
        // Refresh list
        // In a real app we would update state, here we can just force re-render or fetch
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Salas de Aula</h1>
                <Button onClick={() => setIsCreating(!isCreating)}>
                    <Plus className="w-4 h-4 mr-2 inline" />
                    Nova Sala
                </Button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-lg font-semibold mb-4">Cadastrar Sala</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Nome da Sala (ex: 1A)"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Matéria"
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classrooms.map(classroom => (
                    <div key={classroom.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <button className="text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{classroom.name}</h3>
                        <p className="text-gray-500 mb-4">{classroom.subject}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>{storage.getStudentsByClassroom(classroom.id).length} alunos</span>
                            </div>
                            <button
                                onClick={() => setSelectedClassroom(classroom)}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Gerenciar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for managing students would go here, but for MVP we might skip or do a simple one */}
            {selectedClassroom && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Gerenciar Alunos - {selectedClassroom.name}</h2>
                            <button onClick={() => setSelectedClassroom(null)} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Adicionar Aluno</h3>
                                <div className="flex gap-2">
                                    <select
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                handleEnrollStudent(e.target.value);
                                                e.target.value = "";
                                            }
                                        }}
                                    >
                                        <option value="">Selecione um aluno...</option>
                                        {availableStudents.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.matricula})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Alunos Matriculados</h3>
                                <div className="space-y-2">
                                    {storage.getStudentsByClassroom(selectedClassroom.id).map(student => (
                                        <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span>{student.name}</span>
                                            <span className="text-sm text-gray-500">{student.matricula}</span>
                                        </div>
                                    ))}
                                    {storage.getStudentsByClassroom(selectedClassroom.id).length === 0 && (
                                        <p className="text-gray-500 text-sm">Nenhum aluno matriculado.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
