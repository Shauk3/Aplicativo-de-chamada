"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LogOut, Plus, Trash2, Edit2 } from "lucide-react"
import AdminSidebar from "./admin-sidebar"

interface AdminDashboardProps {
  user: { role: "admin" | "professor"; email: string; name: string }
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"professors" | "students" | "rooms">("professors")
  const [professors, setProfessors] = useState([
    { id: 1, name: "João Silva", email: "joao@escola.com", phone: "(11) 9999-8888" },
  ])
  const [students, setStudents] = useState([{ id: 1, name: "Ana Santos", email: "ana@email.com", room: "1A" }])
  const [rooms, setRooms] = useState([{ id: 1, name: "1A", teacher: "João Silva", students: 25 }])

  const [newProfessor, setNewProfessor] = useState({ name: "", email: "", phone: "" })
  const [newStudent, setNewStudent] = useState({ name: "", email: "", room: "" })
  const [newRoom, setNewRoom] = useState({ name: "", teacher: "" })

  const addProfessor = () => {
    if (newProfessor.name && newProfessor.email) {
      setProfessors([...professors, { id: Date.now(), ...newProfessor }])
      setNewProfessor({ name: "", email: "", phone: "" })
    }
  }

  const addStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.room) {
      setStudents([...students, { id: Date.now(), ...newStudent }])
      setNewStudent({ name: "", email: "", room: "" })
    }
  }

  const addRoom = () => {
    if (newRoom.name && newRoom.teacher) {
      setRooms([...rooms, { id: Date.now(), ...newRoom, students: 0 }])
      setNewRoom({ name: "", teacher: "" })
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Painel de Coordenação</h1>
            <p className="text-muted-foreground">Bem-vindo, {user.name}</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="flex gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {activeTab === "professors" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Cadastrar Professor</h2>
              <div className="space-y-3">
                <Input
                  placeholder="Nome"
                  value={newProfessor.name}
                  onChange={(e) => setNewProfessor({ ...newProfessor, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newProfessor.email}
                  onChange={(e) => setNewProfessor({ ...newProfessor, email: e.target.value })}
                />
                <Input
                  placeholder="Telefone"
                  value={newProfessor.phone}
                  onChange={(e) => setNewProfessor({ ...newProfessor, phone: e.target.value })}
                />
                <Button
                  onClick={addProfessor}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Professor
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Professores Cadastrados</h2>
              <div className="space-y-3">
                {professors.map((prof) => (
                  <div key={prof.id} className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">{prof.name}</p>
                      <p className="text-sm text-muted-foreground">{prof.email}</p>
                      <p className="text-sm text-muted-foreground">{prof.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "students" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Cadastrar Aluno</h2>
              <div className="space-y-3">
                <Input
                  placeholder="Nome"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
                <Input
                  placeholder="Sala (ex: 1A)"
                  value={newStudent.room}
                  onChange={(e) => setNewStudent({ ...newStudent, room: e.target.value })}
                />
                <Button onClick={addStudent} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Aluno
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Alunos Cadastrados</h2>
              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <p className="text-sm text-muted-foreground">Sala: {student.room}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "rooms" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Cadastrar Sala</h2>
              <div className="space-y-3">
                <Input
                  placeholder="Nome da Sala (ex: 1A)"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                />
                <Input
                  placeholder="Professor Responsável"
                  value={newRoom.teacher}
                  onChange={(e) => setNewRoom({ ...newRoom, teacher: e.target.value })}
                />
                <Button onClick={addRoom} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Sala
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Salas Cadastradas</h2>
              <div className="space-y-3">
                {rooms.map((room) => (
                  <div key={room.id} className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Sala {room.name}</p>
                      <p className="text-sm text-muted-foreground">Professor: {room.teacher}</p>
                      <p className="text-sm text-muted-foreground">{room.students} alunos</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
