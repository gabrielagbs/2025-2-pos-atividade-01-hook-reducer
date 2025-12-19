"use client";

import React, { useReducer } from "react";
import { useRouter, useParams } from "next/navigation";
import { reducer, initialState, actions } from "@/lib/reducer";

export default function ApagarTarefaPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  const tarefa = state.find((t) => t.id === id);

  function handleDelete() {
    if (!id) return router.push("/tarefas");
    dispatch(actions.del(id));
    router.push("/tarefas");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Apagar tarefa</h1>
      {tarefa ? (
        <div className="max-w-md">
          <p>Tem certeza que deseja apagar a tarefa <strong>{tarefa.titulo}</strong>?</p>
          <div className="flex gap-2 mt-4">
            <button onClick={handleDelete} className="btn btn-danger">Apagar</button>
            <button onClick={() => router.push("/tarefas")} className="btn">Cancelar</button>
          </div>
        </div>
      ) : (
        <p>Tarefa não encontrada na sessão atual (estado mantido apenas na página neste exemplo).</p>
      )}
    </div>
  );
}
