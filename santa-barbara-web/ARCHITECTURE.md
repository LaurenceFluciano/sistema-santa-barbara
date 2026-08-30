# Especificações Arquiteturais

## 1. Organização

A aplicação separa **responsabilidades de negócio/aplicação** das **responsabilidades visuais**.

```text
src/
├── application/          # O QUE o sistema faz
│   ├── model/            # Modelos de dados da aplicação
│   ├── pages/            # Páginas e composição das funcionalidades
│   ├── routes/           # Mapeamento das rotas
│   └── services/         # Comunicação com APIs e serviços externos
│
└── ui/                   # COMO o sistema se apresenta
    ├── components/       # Componentes visuais reutilizáveis
    └── styles/           # Estilos e tokens globais
```

### `application`

Contém a lógica e os dados necessários para executar as funcionalidades do sistema.

* **`model/`** — modelos de dados utilizados pela aplicação.
* **`pages/`** — conectam modelos e services aos componentes da UI.
* **`routes/`** — definem as rotas da aplicação.
* **`services/`** — realizam comunicação com APIs e serviços externos.

Não devem ser criadas abstrações como DTOs, repositories, adapters ou `HttpClient` sem uma necessidade concreta. `fetch` é suficiente quando atende ao caso.

### `ui`

Contém exclusivamente responsabilidades de apresentação.

Os componentes devem ser reutilizáveis e desacoplados da aplicação. Não devem acessar services, APIs ou regras de negócio diretamente.

A comunicação com a aplicação ocorre por meio de **props**, que representam o contrato de dados do componente.

```text
application/model
       │
       ▼
application/pages
       │
       │ props
       ▼
ui/components
       │
       ▼
    Interface
```

A `application` pode utilizar a `ui`, mas a `ui` não deve depender da `application`.

---

# 2. Estilização e Layout

A aplicação utiliza CSS tradicional e Tailwind CSS com responsabilidades distintas.

> **CSS define a aparência. Tailwind define o layout.**

### CSS tradicional

Cada componente deve possuir um `.css` quando houver estilos próprios.

Utilize CSS para:

* cores e backgrounds;
* bordas e radius;
* sombras;
* padding interno;
* tipografia;
* transições e animações;
* estados visuais (`:hover`, `:focus`, `:active`, `:disabled`);
* demais propriedades relacionadas à aparência do componente.

```css
.card {
  background-color: var(--surface-color);
  border: 1px solid var(--strong-surface-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 24px;
}
```

### Tailwind CSS

Utilize Tailwind para composição espacial e layout:

* `flex` e `grid`;
* alinhamento e justificação;
* `gap`;
* margens externas;
* dimensionamento de containers;
* posicionamento relacionado à composição;
* responsividade.

```tsx
<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
  <Card />
  <Card />
  <Card />
  <Card />
</section>
```

---

# 3. Regra de Contexto

O **contexto que utiliza o componente controla sua posição**.

Um componente não deve definir margens externas ou outras regras que dependam de onde ele está sendo utilizado.

```tsx
<div className="flex flex-col gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

O `Card` não precisa saber que está dentro de uma lista.

Por outro lado, o componente pode utilizar regras de layout internamente quando elas fazem parte de sua própria estrutura ou funcionamento.

```css
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  inset: 100% 0 auto 0;
}
```

Portanto:

> **Layout externo pertence ao contexto. Layout interno pode pertencer ao componente.**

---

# 4. Regra de Decisão

Ao definir uma propriedade, pergunte:

> **Isso define a aparência do componente ou sua relação espacial com outros elementos?**

**Aparência → CSS**

```text
background
color
border
border-radius
box-shadow
padding
font
transition
```

**Layout → Tailwind**

```text
display
flex
grid
gap
margin externa
alignment
position de composição
width/height de composição
breakpoints
```

---

# 5. Princípios

1. **Separar aplicação e apresentação.**
2. **Componentes da UI não conhecem a lógica da aplicação.**
3. **Props são o contrato entre páginas e componentes.**
4. **Páginas conectam services/model à UI.**
5. **CSS define aparência; Tailwind define layout.**
6. **O contexto controla o posicionamento externo dos componentes.**
7. **Abstrações devem surgir por necessidade, não por antecipação.**
8. **A arquitetura deve permanecer simples, explícita e pragmática.**


# 6. Regra de Estrutura Rasa (Flat Hierarchy)

Os diretórios atuais devem manter uma hierarquia **rasa** para evitar navegação profunda e arquivos desnecessários de reexportação (`index.ts`).

### Regra

> **Não criar subpastas individuais para cada componente.**

### Permitido

```text
ui/components/
├── Button.tsx
├── Button.css
├── Card.tsx
└── Card.css
```

### Não permitido

```text
ui/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.css
│   └── index.ts
```