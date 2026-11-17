# AGENTS.md — Code Connect

Este repositório é um monorepo gerenciado com **pnpm workspaces** (`pnpm@12.21.0`).

## Estrutura do Monorepo

- `apps/api`: Backend em **NestJS 12** (ESM, TypeScript 6, Express 5, Vitest 4, Oxlint + Prettier). Possui regras específicas adicionais em `apps/api/AGENTS.md`.
- `apps/web`: Frontend em **React 19** + **Vite 8** (ESM, TypeScript 7, Oxlint).

## Comandos Principais (a partir da raiz)

Execute comandos sempre via `pnpm` na raiz do workspace ou filtrando o pacote desejado:

- **Desenvolvimento (ambos os apps em paralelo)**: `pnpm dev`
  - Apenas Web: `pnpm dev:web` (`pnpm --filter web dev`)
  - Apenas API: `pnpm dev:api` (`pnpm --filter api start:dev`)
- **Build**: `pnpm build` (`pnpm build:web` / `pnpm build:api`)
- **Testes**: `pnpm test` (`pnpm test:web` / `pnpm test:api`)
  - Testes E2E da API: `pnpm --filter api test:e2e`
- **Linting**: `pnpm lint` (`pnpm lint:web` / `pnpm lint:api`)
- **Executar comandos em um pacote específico**:
  - `pnpm web <comando>` (atalho para `pnpm --filter web <comando>`)
  - `pnpm api <comando>` (atalho para `pnpm --filter api <comando>`)

## Convenções de Código e Arquitetura

### Backend (`apps/api`)
- **Aderência Estrita aos Princípios REST (RESTful)**:
  - **Modelagem orientada a recursos**: Utilize substantivos no plural para identificar recursos nas rotas (ex.: `/users`, `/posts/:id/comments`) e nunca verbos nas URLs.
  - **Semântica de Métodos HTTP**: Respeite o propósito e a idempotência de cada verbo (`GET` para leitura segura, `POST` para criação, `PUT` para substituição completa, `PATCH` para atualização parcial, `DELETE` para remoção).
  - **Códigos de Status HTTP Semânticos**: Retorne status codes precisos (`200 OK`, `201 Created` para recursos criados, `204 No Content` para deleções/ações sem corpo de retorno, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`).
  - **Stateless & Interface Uniforme**: Nenhuma sessão de cliente deve ser mantida em memória entre requisições; utilize query parameters padronizados para filtros, ordenação e paginação, e mantenha um contrato de erro consistente.
- **ESM Estrito (`"type": "module"`, `"moduleResolution": "nodenext"`)**:
  - Todos os imports relativos **devem** incluir a extensão `.js` (ex.: `import { AppService } from './app.service.js'`).
  - Não utilize `__dirname` ou `__filename`; use `import.meta.dirname` e `import.meta.filename`.
- **Testes com Vitest**:
  - Arquivos de teste unitário: `src/**/*.spec.ts`.
  - Arquivos de teste E2E: `test/**/*.e2e-spec.ts`.
  - Globais do Vitest (`describe`, `it`, `expect`, `vi`) estão habilitados. Use `vi.fn()` em vez de `jest.fn()`.
- **Formatação e Linting**:
  - Oxlint com checagem de tipos (`oxlint --type-aware src/ test/`) — `typescript/no-floating-promises` é tratado como erro.
  - Prettier configurado com aspas simples (`singleQuote: true`) e `trailingComma: "all"`.
- Consulte `apps/api/AGENTS.md` para diretrizes detalhadas sobre pacotes oficiais do NestJS 12 e validação com Standard Schema (`StandardSchemaValidationPipe`).

### Frontend (`apps/web`)
- **Arquitetura de Componentes — Atomic Design**:
  - Estruture os componentes seguindo a hierarquia do **Atomic Design**: `atoms`, `molecules`, `organisms`, `templates` e `pages` (ex.: dentro de `src/components/` e `src/pages/`).
- **Estilização — Tailwind CSS**:
  - Utilize **Tailwind CSS** como padrão para estilização dos componentes, priorizando classes utilitárias e consistência de design tokens.
- **Obrigatoriedade de Testes em Componentes**:
  - **Todo componente criado ou modificado deve possuir um teste** cobrindo o seu uso essencial (renderização, props principais, interações do usuário e estados relevantes).
- **React 19 + Vite 8 + TypeScript (`bundler` resolution)**:
  - `verbatimModuleSyntax: true` e `erasableSyntaxOnly: true` estão ativos no `tsconfig.app.json` — utilize `import type` para importações apenas de tipos.
  - `noUnusedLocals` e `noUnusedParameters` estão habilitados; remova variáveis e parâmetros não utilizados antes de finalizar alterações.
- **Linting**:
  - Oxlint configurado com os plugins `react`, `typescript` e `oxc` (regras de Hooks e exportação de componentes ativas).

## Controle de Versão e Git

- **Conventional Commits**:
  - Todas as mensagens de commit em ambos os projetos devem seguir a especificação **Conventional Commits**: `<tipo>(<escopo>): <descrição curta>`.
  - **Tipos permitidos**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
  - **Escopos recomendados**: `web`, `api`, `repo` (ou o módulo/componente específico, ex.: `feat(web): add button atom component`, `fix(api): return 201 on user creation`).
  - Use o modo imperativo, letras minúsculas na descrição e adicione `!` (ou rodapé `BREAKING CHANGE:`) quando houver mudanças que quebrem compatibilidade.
