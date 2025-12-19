export interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;
  concluida: boolean;
  criadoEm?: string; // ISO date
}

export type TarefasState = Tarefa[];

export type TarefaInput = Omit<Tarefa, "id" | "criadoEm">;
