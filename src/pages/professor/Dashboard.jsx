import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../../services/storage';
import { BookOpen, Users, Calendar } from 'lucide-react';

export default function ProfessorDashboard() {
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        // In a real app, we would filter by the logged-in professor
        // For this MVP, we show all classrooms or we could add a 'professorId' to classrooms
        // Let's show all for simplicity as per plan
        setClassrooms(storage.getClassrooms());
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Minhas Salas</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classrooms.map(classroom => (
                    <Link
                        key={classroom.id}
                        to={`/professor/classroom/${classroom.id}`}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow block group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <BookOpen className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{classroom.name}</h3>
                        <p className="text-gray-500 mb-4">{classroom.subject}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>{storage.getStudentsByClassroom(classroom.id).length} alunos</span>
                            </div>
                        </div>
                    </Link>
                ))}

                {classrooms.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        Nenhuma sala encontrada. Entre em contato com a coordenação.
                    </div>
                )}
            </div>
        </div>
    );
}
