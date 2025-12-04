"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface LoginPageProps {
  onLogin: (role: "admin" | "professor", email: string, name: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"admin" | "professor">("admin")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    // Validar credenciais padrão
    const isAdmin = role === "admin" && email === "admin@escola.com" && password === "123456"
    const isProfessor = role === "professor" && email === "professor@escola.com" && password === "123456"

    if (isAdmin || isProfessor) {
      const name = role === "admin" ? "Coordenador" : "Professor"
      onLogin(role, email, name)
    } else {
      setError("Email ou senha incorretos")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
              <div className="text-2xl font-bold text-white">📚</div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Controle de Presença</h1>
            <p className="text-muted-foreground mt-2">Sistema de Gestão Escolar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tipo de Acesso</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value as "admin" | "professor")}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-foreground">Coordenação</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="professor"
                    checked={role === "professor"}
                    onChange={(e) => setRole(e.target.value as "admin" | "professor")}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-foreground">Professor</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                placeholder={role === "admin" ? "admin@escola.com" : "professor@escola.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Senha</label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 items-start">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Entrar
            </Button>
          </form>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600 font-medium mb-1">Credenciais de Teste:</p>
            <p className="text-xs text-gray-600">
              <strong>Admin:</strong> admin@escola.com / 123456
            </p>
            <p className="text-xs text-gray-600">
              <strong>Professor:</strong> professor@escola.com / 123456
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
