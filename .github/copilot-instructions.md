# Instruções para agentes (Copilot / AI)

**Resumo rápido**
- Projeto: Next.js (app router) + React 19 + TypeScript (strict) + Tailwind.
- Objetivo do repositório: atividade didática para praticar `useReducer` e construir páginas sob `/src/app` (tarefas CRUD locais).

## Comandos úteis
- Instalar: `npm i`
- Desenvolvimento (com turbopack): `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`

> Observação: não há runner de testes configurado — não adicione frameworks de teste sem pedir ao mantenedor.

## Estrutura e padrões importantes
- Páginas/rotas ficam em `src/app` (app router). Ex.: `src/app/page.tsx` é a home.
- Coloque os tipos em `src/types/` (README recomenda isso).
- O `reducer` e lógica relacionadas devem ficar em `src/lib/` (ex.: `src/lib/reducer.ts`) e operar **localmente** (CRUD em memória). O uso de `localStorage`/`IndexedDB` é um desafio opcional — só adote se explicitamente solicitado.
- Arquivo utilitário `src/lib/utils.ts` exporta `cn(...)` which merges class names (usa `clsx` + `tailwind-merge`). Use-o ao compor classes Tailwind para evitar duplicação.
- `src/app/layout.tsx` registra fontes e importa `globals.css` — o projeto usa variáveis CSS para temas (veja `globals.css`).

## Regras práticas para alterações de UI/estado
- Por padrão, componentes no `app/` são server components — qualquer componente que usar hooks do React (ex.: `useReducer`, `useState`, `useEffect`) **deve** incluir a diretiva `"use client"` na primeira linha.
  - Exemplo mínimo em `src/app/tarefas/page.tsx`:
    ```tsx
    "use client";
    import React, { useReducer } from 'react';
    // ...
    ```
- Mantenha o `reducer` separado (em `src/lib/reducer.ts`) e tipado (use interfaces em `src/types/`).
- Evite chamadas de rede na implementação do reducer — a atividade espera operações locais.

### Exemplos concretos
- Tipo `Tarefa` (veja `src/types/index.ts`)

```ts
export interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;
  concluida: boolean;
  criadoEm?: string;
}
```

- Ações esperadas no `reducer` (`src/lib/reducer.ts`): `ADD`, `UPDATE`, `DELETE`, `TOGGLE`, `SET` — funções puros, sem efeitos colaterais.
- Páginas de exemplo implementadas em `src/app/tarefas` (ex.: `page.tsx`, `nova/page.tsx`, `[id]/page.tsx`, `[id]/apagar/page.tsx`). Essas páginas usam `useReducer` em componentes cliente e, **neste exemplo**, mantêm estado apenas em memória por rota (sem persistência). Se for necessário comportamento persistente, adote `localStorage` ou `IndexedDB` com cuidado e deixe isso explícito na PR.

## Conformidade com TypeScript e lint
- TypeScript está em modo `strict`; declare tipos/`interface` para dados da tarefa (ex.: `Tarefa` com `id`, `titulo`, `descricao`, `concluida`).
- Rode `npm run lint` e corrija avisos antes de abrir PRs.

## Estilo e componentes
- Projeto menciona `shadcnui` (UI library) — se adicionar componentes dessa biblioteca, siga os padrões de composição com `cn(...)` e preferir componentes leves (separar lógica de apresentação).
- Use classes Tailwind compostas com `cn(...)` para prevenir conflitos e garantir consistência. Veja `src/lib/utils.ts`.

## O que não tocar sem confirmar
- Não altere `next.config.ts` ou `tsconfig.json` sem necessidade explícita.
- Não adicionar infra CI ou test-suite sem aprovação (é um repositório de atividade estudantil).

## Tarefas comuns para um agente
- Implementar `src/lib/reducer.ts` com ações CRUD + tipos em `src/types/`.
- Criar páginas sob `src/app/tarefas` conforme README: listagem, nova tarefa, editar, apagar.
- Usar `"use client"` nos componentes que usarão `useReducer`.
- Testar localmente com `npm run dev` e corrigir lint/TypeScript.

## Contato / contexto
- Repositório de atividade do curso (professor: L A Minora). Consulte `README.md` para intenção pedagógica antes de grandes mudanças.

---
Se algo estiver ambíguo, pergunte (ex.: formato exato do tipo `Tarefa`, persistência desejada). Solicite revisão antes de grandes mudanças arquiteturais.