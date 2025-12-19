import { Tarefa, TarefasState, TarefaInput } from "@/types";

export type Action =
  | { type: "ADD"; payload: TarefaInput }
  | { type: "UPDATE"; payload: Tarefa }
  | { type: "DELETE"; payload: { id: string } }
  | { type: "TOGGLE"; payload: { id: string } }
  | { type: "SET"; payload: TarefasState };

export function generateId() {
  // simple deterministic id for examples; replace with UUID if needed
  return Math.random().toString(36).slice(2, 9);
}

export const initialState: TarefasState = [];

export function reducer(state: TarefasState, action: Action): TarefasState {
  switch (action.type) {
    case "ADD": {
      const newTarefa: Tarefa = {
        id: generateId(),
        titulo: action.payload.titulo,
        descricao: action.payload.descricao,
        concluida: !!action.payload.concluida,
        criadoEm: new Date().toISOString(),
      };
      return [newTarefa, ...state];
    }

    case "UPDATE": {
      return state.map((t) => (t.id === action.payload.id ? { ...t, ...action.payload } : t));
    }

    case "DELETE": {
      return state.filter((t) => t.id !== action.payload.id);
    }

    case "TOGGLE": {
      return state.map((t) => (t.id === action.payload.id ? { ...t, concluida: !t.concluida } : t));
    }

    case "SET": {
      return action.payload;
    }

    default:
      return state;
  }
}

// Convenience action creators
export const actions = {
  add: (payload: TarefaInput): Action => ({ type: "ADD", payload }),
  update: (payload: Tarefa): Action => ({ type: "UPDATE", payload }),
  del: (id: string): Action => ({ type: "DELETE", payload: { id } }),
  toggle: (id: string): Action => ({ type: "TOGGLE", payload: { id } }),
  set: (payload: TarefasState): Action => ({ type: "SET", payload }),
};
