"use client";

import React, { useReducer } from "react";
import Link from "next/link";
import { Tarefa } from "@/types";
import { reducer, initialState, actions } from "@/lib/reducer";

export default function TarefasPage() {
  const [state, dispatch] = useReducer(reducer, initialState as Tarefa[]);

  // sample initial items for demonstration
  React.useEffect(() => {
    if (state.length === 0) {
      dispatch(
        actions.set([
          { id: "a1", titulo: "Exemplo 1", descricao: "Descrição", concluida: false, criadoEm: new Date().toISOString() },
          { id: "a2", titulo: "Exemplo 2", descricao: "Outra", concluida: true, criadoEm: new Date().toISOString() },
        ])
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Tarefas</h1>
        <Link href="/tarefas/nova" className="btn">
          Nova tarefa
        </Link>
      </header>

      <ul className="space-y-2">
        {state.map((t) => (
          <li key={t.id} className="border p-3 rounded">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{t.titulo}</h3>
                <p className="text-sm text-muted-foreground">{t.descricao}</p>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => dispatch(actions.toggle(t.id))}
                  className="px-2 py-1 border rounded"
                >
                  {t.concluida ? "Reabrir" : "Concluir"}
                </button>
                <Link href={`/tarefas/${t.id}`} className="px-2 py-1 border rounded">
                  Editar
                </Link>
                <Link href={`/tarefas/${t.id}/apagar`} className="px-2 py-1 border rounded text-destructive">
                  Apagar
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
