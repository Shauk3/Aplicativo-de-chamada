"use client"

import { Users, BookOpen, DoorOpen } from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: "professors" | "students" | "rooms") => void
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const menuItems = [
    { id: "professors", label: "Professores", icon: Users },
    { id: "students", label: "Alunos", icon: BookOpen },
    { id: "rooms", label: "Salas", icon: DoorOpen },
  ]

  return (
    <div className="w-64 bg-primary text-primary-foreground p-6 hidden md:block">
      <div className="mb-8">
        <div className="text-2xl font-bold">📚 Escola</div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as "professors" | "students" | "rooms")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-primary-foreground text-primary font-semibold"
                  : "hover:bg-primary/80 text-primary-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
