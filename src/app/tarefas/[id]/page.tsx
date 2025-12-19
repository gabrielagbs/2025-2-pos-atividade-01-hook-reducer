"use client";

import React, { useReducer, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { reducer, initialState, actions } from "@/lib/reducer";

export default function EditarTarefaPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  // find tarefa or show placeholder
  const tarefa = state.find((t) => t.id === id);
  const [titulo, setTitulo] = useState(tarefa?.titulo ?? "");
  const [descricao, setDescricao] = useState(tarefa?.descricao ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return router.push("/tarefas");
    dispatch(actions.update({ id, titulo: titulo.trim(), descricao, concluida: tarefa?.concluida ?? false, criadoEm: tarefa?.criadoEm }));
    router.push("/tarefas");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Editar tarefa</h1>
      {tarefa ? (
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
            <button type="submit" className="btn">Salvar</button>
          </div>
        </form>
      ) : (
        <p>Tarefa não encontrada na sessão atual (this example keeps state in-memory per page).</p>
      )}
    </div>
  );
}
