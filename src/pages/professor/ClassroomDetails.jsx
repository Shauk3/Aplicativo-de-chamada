import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storage } from '../../services/storage';
import { Button } from '../../components/Button';
import { Calendar, Check, X, Save, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';

export default function ClassroomDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [classroom, setClassroom] = useState(null);
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({}); // { studentId: 'present' | 'absent' }
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const cls = storage.getClassrooms().find(c => c.id === id);
        if (cls) {
            setClassroom(cls);
            const stds = storage.getStudentsByClassroom(id);
            setStudents(stds);

            // Initialize attendance
            const initialAttendance = {};
            stds.forEach(s => initialAttendance[s.id] = 'present');
            setAttendance(initialAttendance);

            loadAttendanceForDate(id, new Date().toISOString().split('T')[0]);
        }
    }, [id]);

    const loadAttendanceForDate = (classroomId, dateStr) => {
        const existing = storage.getAttendance(classroomId, dateStr);
        if (existing.length > 0) {
            const newAttendance = {};
            existing.forEach(r => newAttendance[r.studentId] = r.status);
            setAttendance(newAttendance);
        } else {
            // Reset to default present if no record exists
            const stds = storage.getStudentsByClassroom(classroomId);
            const initialAttendance = {};
            stds.forEach(s => initialAttendance[s.id] = 'present');
            setAttendance(initialAttendance);
        }
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        loadAttendanceForDate(id, newDate);
        setSaved(false);
    };

    const toggleStatus = (studentId) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
        }));
        setSaved(false);
    };

    const saveAttendance = () => {
        const records = Object.entries(attendance).map(([studentId, status]) => ({
            studentId,
            status
        }));
        storage.saveAttendance(id, date, records);
        setSaved(true);

        // Show success feedback briefly
        setTimeout(() => setSaved(false), 3000);
    };

    if (!classroom) return <div>Carregando...</div>;

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('/professor')} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{classroom.name}</h1>
                    <p className="text-gray-500">{classroom.subject}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <input
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        {saved && <span className="text-green-600 text-sm font-medium animate-in fade-in">Salvo com sucesso!</span>}
                        <Button onClick={saveAttendance} className="flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Salvar Chamada
                        </Button>
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {students.map(student => (
                        <div key={student.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <p className="font-medium text-gray-900">{student.name}</p>
                                <p className="text-sm text-gray-500">{student.matricula}</p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setAttendance(prev => ({ ...prev, [student.id]: 'present' }))}
                                    className={clsx(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                                        attendance[student.id] === 'present'
                                            ? "bg-green-100 border-green-200 text-green-700"
                                            : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                                    )}
                                >
                                    <Check className="w-4 h-4" />
                                    Presença
                                </button>
                                <button
                                    onClick={() => setAttendance(prev => ({ ...prev, [student.id]: 'absent' }))}
                                    className={clsx(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                                        attendance[student.id] === 'absent'
                                            ? "bg-red-100 border-red-200 text-red-700"
                                            : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                                    )}
                                >
                                    <X className="w-4 h-4" />
                                    Falta
                                </button>
                            </div>
                        </div>
                    ))}

                    {students.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            Nenhum aluno matriculado nesta sala.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
