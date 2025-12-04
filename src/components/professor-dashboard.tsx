"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, Check, X, BarChart3 } from "lucide-react"

interface ProfessorDashboardProps {
  user: { role: "admin" | "professor"; email: string; name: string }
  onLogout: () => void
}

interface Student {
  id: number
  name: string
  present?: boolean
}

interface Room {
  id: number
  name: string
  students: Student[]
}

export default function ProfessorDashboard({ user, onLogout }: ProfessorDashboardProps) {
  const [activeTab, setActiveTab] = useState<"attendance" | "report">("attendance")
  const [selectedRoom, setSelectedRoom] = useState(1)

  const [rooms] = useState<Room[]>([
    {
      id: 1,
      name: "1A",
      students: [
        { id: 1, name: "Ana Silva", present: false },
        { id: 2, name: "Bruno Santos", present: false },
        { id: 3, name: "Carlos Oliveira", present: false },
        { id: 4, name: "Diana Costa", present: false },
        { id: 5, name: "Eduardo Ferreira", present: false },
      ],
    },
    {
      id: 2,
      name: "2B",
      students: [
        { id: 6, name: "Fernanda Silva", present: false },
        { id: 7, name: "Gustavo Santos", present: false },
        { id: 8, name: "Helena Oliveira", present: false },
      ],
    },
  ])

  const [attendance, setAttendance] = useState<{ [key: number]: boolean }>({})
  const [report, setReport] = useState<{ [key: number]: { present: number; absent: number } }>({})

  const currentRoom = rooms.find((r) => r.id === selectedRoom)

  const toggleAttendance = (studentId: number) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }))
  }

  const saveAttendance = () => {
    if (!currentRoom) return

    const present = Object.values(attendance).filter(Boolean).length
    const absent = currentRoom.students.length - present

    setReport((prev) => ({
      ...prev,
      [selectedRoom]: { present, absent },
    }))

    alert(`Presença salva! Presentes: ${present}, Ausentes: ${absent}`)
    setAttendance({})
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard do Professor</h1>
            <p className="text-primary-foreground/90">Bem-vindo, {user.name}</p>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="flex gap-2 text-foreground hover:text-foreground bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "attendance"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Marcar Presença
          </button>
          <button
            onClick={() => setActiveTab("report")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "report"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Relatório
          </button>
        </div>

        {activeTab === "attendance" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Selecionar Sala</h2>
              <div className="flex gap-3 flex-wrap">
                {rooms.map((room) => (
                  <Button
                    key={room.id}
                    onClick={() => {
                      setSelectedRoom(room.id)
                      setAttendance({})
                    }}
                    variant={selectedRoom === room.id ? "default" : "outline"}
                    className={selectedRoom === room.id ? "bg-primary hover:bg-primary/90" : ""}
                  >
                    Sala {room.name}
                  </Button>
                ))}
              </div>
            </Card>

            {currentRoom && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Marcar Presença - Sala {currentRoom.name}</h2>
                <div className="space-y-3 mb-6">
                  {currentRoom.students.map((student) => (
                    <div
                      key={student.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                        attendance[student.id] ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
                      }`}
                    >
                      <span className="font-medium text-foreground">{student.name}</span>
                      <button
                        onClick={() => toggleAttendance(student.id)}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                          attendance[student.id]
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        {attendance[student.id] ? (
                          <>
                            <Check className="w-4 h-4" />
                            Presente
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4" />
                            Ausente
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={saveAttendance}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
                >
                  Salvar Presença
                </Button>
              </Card>
            )}
          </div>
        )}

        {activeTab === "report" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => {
              const roomReport = report[room.id] || { present: 0, absent: 0 }
              const total = room.students.length

              return (
                <Card key={room.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">Sala {room.name}</h3>
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Presentes</span>
                        <span className="font-bold text-green-600">{roomReport.present}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${(roomReport.present / total) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Ausentes</span>
                        <span className="font-bold text-red-600">{roomReport.absent}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all"
                          style={{ width: `${(roomReport.absent / total) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">Total de alunos: {total}</p>
                      <p className="text-sm text-muted-foreground">
                        Taxa de presença:{" "}
                        <span className="font-bold text-primary">
                          {total > 0 ? Math.round((roomReport.present / total) * 100) : 0}%
                        </span>
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
