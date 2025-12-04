
const STORAGE_KEYS = {
  USERS: 'app_chamada_users',
  STUDENTS: 'app_chamada_students',
  CLASSROOMS: 'app_chamada_classrooms',
  ENROLLMENTS: 'app_chamada_enrollments',
  ATTENDANCE: 'app_chamada_attendance',
  CURRENT_USER: 'app_chamada_current_user',
};

// Helper to get data
const get = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Helper to set data
const set = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const storage = {
  // Auth
  login: (email, password) => {
    const users = get(STORAGE_KEYS.USERS);
    // Add default admin if no users exist
    if (users.length === 0 && email === 'admin@admin.com' && password === 'admin') {
        const admin = { id: 'admin', name: 'Admin', email: 'admin@admin.com', role: 'admin' };
        set(STORAGE_KEYS.USERS, [admin]);
        return admin;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  },
  
  getCurrentUser: () => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user) => {
    if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  // Users (Professors)
  getProfessors: () => {
    return get(STORAGE_KEYS.USERS).filter(u => u.role === 'professor');
  },
  
  createProfessor: (name, email, password) => {
    const users = get(STORAGE_KEYS.USERS);
    if (users.find(u => u.email === email)) throw new Error('Email already exists');
    const newUser = { id: crypto.randomUUID(), name, email, password, role: 'professor' };
    set(STORAGE_KEYS.USERS, [...users, newUser]);
    return newUser;
  },

  // Students
  getStudents: () => get(STORAGE_KEYS.STUDENTS),
  
  createStudent: (name, matricula) => {
    const students = get(STORAGE_KEYS.STUDENTS);
    if (students.find(s => s.matricula === matricula)) throw new Error('Matricula already exists');
    const newStudent = { id: crypto.randomUUID(), name, matricula };
    set(STORAGE_KEYS.STUDENTS, [...students, newStudent]);
    return newStudent;
  },

  // Classrooms
  getClassrooms: () => get(STORAGE_KEYS.CLASSROOMS),
  
  createClassroom: (name, subject) => {
    const classrooms = get(STORAGE_KEYS.CLASSROOMS);
    const newClassroom = { id: crypto.randomUUID(), name, subject };
    set(STORAGE_KEYS.CLASSROOMS, [...classrooms, newClassroom]);
    return newClassroom;
  },

  // Enrollments
  enrollStudent: (classroomId, studentId) => {
      const enrollments = get(STORAGE_KEYS.ENROLLMENTS);
      if (enrollments.find(e => e.classroomId === classroomId && e.studentId === studentId)) return;
      set(STORAGE_KEYS.ENROLLMENTS, [...enrollments, { id: crypto.randomUUID(), classroomId, studentId }]);
  },

  getStudentsByClassroom: (classroomId) => {
      const enrollments = get(STORAGE_KEYS.ENROLLMENTS).filter(e => e.classroomId === classroomId);
      const students = get(STORAGE_KEYS.STUDENTS);
      return enrollments.map(e => students.find(s => s.id === e.studentId)).filter(Boolean);
  },

  // Attendance
  saveAttendance: (classroomId, date, records) => {
      // records: [{ studentId, status }]
      const allAttendance = get(STORAGE_KEYS.ATTENDANCE);
      // Remove existing for this date/classroom to overwrite
      const filtered = allAttendance.filter(a => !(a.classroomId === classroomId && a.date === date));
      
      const newRecords = records.map(r => ({
          id: crypto.randomUUID(),
          classroomId,
          date,
          studentId: r.studentId,
          status: r.status
      }));
      
      set(STORAGE_KEYS.ATTENDANCE, [...filtered, ...newRecords]);
  },

  getAttendance: (classroomId, date) => {
      return get(STORAGE_KEYS.ATTENDANCE).filter(a => a.classroomId === classroomId && a.date === date);
  },
  
  getAttendanceReport: (classroomId) => {
      return get(STORAGE_KEYS.ATTENDANCE).filter(a => a.classroomId === classroomId);
  }
};
