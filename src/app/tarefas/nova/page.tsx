"use client";

import React, { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { reducer, initialState, actions } from "@/lib/reducer";

export default function NovaTarefaPage() {
  const [, dispatch] = useReducer(reducer, initialState);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim()) return;
    dispatch(actions.add({ titulo: titulo.trim(), descricao, concluida: false }));
    // Redirect back to list (state is in-memory per page)
    router.push("/tarefas");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Nova tarefa</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm">Título</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Descrição</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <button type="submit" className="btn">Criar</button>
        </div>
      </form>
    </div>
  );
}
