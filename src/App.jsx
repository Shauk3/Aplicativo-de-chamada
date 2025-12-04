import { useState } from "react";

export default function App() {
    const [tipoAcesso, setTipoAcesso] = useState("coordenacao");

    return (
        <div className="min-h-screen bg-blue-950 flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
                
                {/* Logo */}
                <div className="w-16 h-16 bg-blue-900 mx-auto rounded-lg flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">📚</span>
                </div>

                {/* Título */}
                <h1 className="text-center text-2xl font-bold mt-4">
                    Controle de Presença
                </h1>
                <p className="text-center text-gray-600 text-sm mb-6">
                    Sistema de Gestão Escolar
                </p>

                {/* Tipo de Acesso */}
                <div className="mb-4">
                    <p className="font-medium mb-1">Tipo de Acesso</p>
                    
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                name="tipo"
                                checked={tipoAcesso === "coordenacao"}
                                onChange={() => setTipoAcesso("coordenacao")}
                            />
                            Coordenação
                        </label>

                        <label className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                name="tipo"
                                checked={tipoAcesso === "professor"}
                                onChange={() => setTipoAcesso("professor")}
                            />
                            Professor
                        </label>
                    </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="block text-sm font-medium">Email</label>
                    <input 
                        type="email"
                        placeholder="admin@escola.com"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none"
                    />
                </div>

                {/* Senha */}
                <div className="mb-5">
                    <label className="block text-sm font-medium">Senha</label>
                    <input 
                        type="password"
                        placeholder="Digite sua senha"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none"
                    />
                </div>

                {/* Botão */}
                <button className="w-full bg-blue-950 text-white py-2 rounded-lg font-semibold hover:bg-blue-900">
                    Entrar
                </button>

                {/* Credenciais */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm mt-5">
                    <p className="font-medium mb-1">Credenciais de Teste:</p>
                    <p><strong>Admin:</strong> admin@escola.com / 123456</p>
                    <p><strong>Professor:</strong> professor@escola.com / 123456</p>
                </div>

            </div>

        </div>
    );
}
