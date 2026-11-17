# Plano de Desenvolvimento — Página de Login (e Base para Cadastro)

## 1. Objetivo
Desenvolver a página de **Login** do **Code Connect** (`apps/web`) seguindo a arquitetura **Atomic Design**, estilizada com **Tailwind CSS**, coberta por testes unitários com **Vitest + Testing Library** e projetada desde a base para reuso direto na futura página de **Cadastro**.

---

## 2. Assets Utilizados
- **Banner principal (Login)**: `apps/web/public/banner-login.png` (`/banner-login.png`)
- **Logos sociais**:
  - Github: `apps/web/public/github.png` (`/github.png`)
  - Gmail: `apps/web/public/gmail.png` (`/gmail.png`)

---

## 3. Arquitetura de Componentes (Atomic Design)

### 3.1. Atoms (`apps/web/src/components/atoms/`)
- **`Label`** (`Label/Label.tsx` & `Label/Label.spec.tsx`)
  - Rótulo de campos de formulário com tipografia padrão (`18px`, `#E1E1E1`).
- **`Input`** (`Input/Input.tsx` & `Input/Input.spec.tsx`)
  - Campo de entrada estilizado (`bg-[#888888]`, `text-[#171D1F]`, foco em `#81FE88`, suporte a todos os atributos nativos de `<input>`).
- **`Checkbox`** (`Checkbox/Checkbox.tsx` & `Checkbox/Checkbox.spec.tsx`)
  - Checkbox customizado acessível com suporte a rótulo (`Lembrar-me` no Login; `Lembrar-me` ou termos no Cadastro).
- **`Button`** (`Button/Button.tsx` & `Button/Button.spec.tsx`)
  - Botão de ação principal (`#81FE88` com texto `#132E35`), suporte a variantes (`primary`, `outline`), largura total (`fullWidth`) e ícone à direita (`icon`).
- **`Divider`** (`Divider/Divider.tsx` & `Divider/Divider.spec.tsx`)
  - Divisor horizontal simples ou com texto centralizado (`ou entre com outras contas`).

### 3.2. Molecules (`apps/web/src/components/molecules/`)
- **`FormField`** (`FormField/FormField.tsx` & `FormField/FormField.spec.tsx`)
  - Combina `Label` + `Input` + mensagem de erro acessível (`role="alert"`).
  - Reutilizável em qualquer campo textual tanto do Login quanto do Cadastro.
- **`SocialButton`** (`SocialButton/SocialButton.tsx` & `SocialButton/SocialButton.spec.tsx`)
  - Botão vertical contendo a imagem do provedor (`iconSrc`) e o nome abaixo (`label`).
- **`AuthRedirectPrompt`** (`AuthRedirectPrompt/AuthRedirectPrompt.tsx` & `AuthRedirectPrompt/AuthRedirectPrompt.spec.tsx`)
  - Bloco de redirecionamento no rodapé do card contendo pergunta (`promptText`) e link de ação com ícone (`actionText`).
  - No Login: `"Ainda não tem conta?"` + `"Crie seu cadastro!"`.
  - No Cadastro (reuso futuro): `"Já tem conta?"` + `"Faça seu login!"`.

### 3.3. Organisms (`apps/web/src/components/organisms/`)
- **`SocialLoginGroup`** (`SocialLoginGroup/SocialLoginGroup.tsx` & `SocialLoginGroup/SocialLoginGroup.spec.tsx`)
  - Agrupa o `Divider` (`"ou entre com outras contas"`) e os `SocialButton`s de **Github** (`/github.png`) e **Gmail** (`/gmail.png`).
  - Reutilizável sem alterações entre Login e Cadastro.
- **`LoginForm`** (`LoginForm/LoginForm.tsx` & `LoginForm/LoginForm.spec.tsx`)
  - Formulário específico de Login:
    - `FormField` de **Email ou usuário** (`placeholder="usuario123"`)
    - `FormField` de **Senha** (`type="password"`, `placeholder="******"`)
    - Linha auxiliar com `Checkbox` (`Lembrar-me`) e link `Esqueci a senha`
    - `Button` de submissão (`Login` com seta à direita)

### 3.4. Templates (`apps/web/src/components/templates/`)
- **`AuthTemplate`** (`AuthTemplate/AuthTemplate.tsx` & `AuthTemplate/AuthTemplate.spec.tsx`)
  - Layout base compartilhado entre **Login** e **Cadastro**:
    - Fundo escuro (`#01080E`) com os grafismos decorativos do símbolo do Code Connect nas extremidades.
    - Card central (`#171D1F`, `rounded-[32px]`) dividido em duas colunas no desktop:
      - **Coluna esquerda**: Banner configurável via props (`bannerSrc`, `bannerAlt`).
      - **Coluna direita**: Cabeçalho (`title`, `subtitle`), área principal do formulário (`children`), seção social (`socialSection`) e rodapé (`footer`).

### 3.5. Pages (`apps/web/src/pages/`)
- **`LoginPage`** (`Login/LoginPage.tsx` & `Login/LoginPage.spec.tsx`)
  - Conecta o `AuthTemplate` com:
    - `bannerSrc="/banner-login.png"`
    - `title="Login"`
    - `subtitle="Boas-vindas! Faça seu login."`
    - `<LoginForm />` como `children`
    - `<SocialLoginGroup />` como `socialSection`
    - `<AuthRedirectPrompt />` como `footer`

---

## 4. Estratégia de Reuso para a Página de Cadastro (Próximo Passo)
Quando a página de **Cadastro** for implementada:
1. Reutilizar integralmente o **`AuthTemplate`**, alterando apenas `bannerSrc`, `bannerAlt`, `title="Cadastro"` e `subtitle="Olá! Preencha seus dados."`.
2. Criar apenas o organismo **`RegisterForm`** utilizando os mesmos átomos (`Button`, `Checkbox`) e moléculas (`FormField`) para os campos de Nome, Email, Senha, etc.
3. Reutilizar **`SocialLoginGroup`** e **`AuthRedirectPrompt`** na coluna direita do template.

---

## 5. Qualidade, Linting e Testes
- **Testes Unitários (Vitest + React Testing Library)**:
  - Todo componente (`Atom`, `Molecule`, `Organism`, `Template` e `Page`) possui seu respectivo arquivo `.spec.tsx` validando renderização, props, acessibilidade e interações de usuário.
- **Padronização**:
  - `import type` para importações exclusivas de tipo (`verbatimModuleSyntax: true`).
  - Validação com `pnpm test:web`, `pnpm lint:web` (Oxlint) e `pnpm build:web`.
