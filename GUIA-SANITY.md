# 🎨 Guia do Sanity CMS

## O que é o Sanity?

O Sanity é um CMS (Content Management System) visual onde você pode gerenciar todo o conteúdo do seu portfólio através de uma interface bonita e intuitiva, sem precisar mexer em código!

## 🚀 Como Começar

### 1. Obter suas credenciais

Primeiro, você precisa pegar o Project ID do Sanity:

```bash
cd studio
npm run dev
```

Isso vai abrir o Sanity Studio no navegador. Na primeira vez, você vai:
1. Fazer login com Google/GitHub
2. Criar um projeto (escolha um nome como "Allan Rolim Portfolio")
3. O Sanity vai te dar um **Project ID**

### 2. Configurar o Project ID

Copie o Project ID e cole no arquivo `sanity.config.ts` na raiz do projeto:

```typescript
projectId: 'SEU_PROJECT_ID_AQUI', // Substitua isso
```

### 3. Iniciar o Sanity Studio

```bash
cd studio
npm run dev
```

Isso abre o painel admin em `http://localhost:3333`

## 📝 Como Adicionar um Projeto

1. Abra o Sanity Studio (`http://localhost:3333`)
2. Clique em "Projetos" no menu lateral
3. Clique no botão "+" para criar novo projeto
4. Preencha os campos:

### Campos do Projeto:

**Título** (obrigatório)
- Português: Nome do projeto em PT
- English: Nome do projeto em EN

**Descrição** (obrigatório)
- Texto curto que aparece na home
- Preencha em PT e EN

**Tags** (obrigatório, 1-5 tags)
- Digite e aperte Enter para adicionar
- Ex: "Product Design", "Fintech", "Mobile App"

**Imagem de Capa** (obrigatório)
- Clique para fazer upload
- Tamanho ideal: 1200x1200px
- Essa é a imagem que aparece na home

**Galeria de Imagens** (obrigatório, mínimo 3)
- Clique em "Add item" para cada imagem
- Para cada imagem:
  - Faça upload da imagem
  - Escolha o tipo:
    - **Quadrada**: 1200x1200px
    - **Horizontal**: 2400x1200px (proporção 2:1)
  - Adicione texto alternativo (opcional)

**Sobre o Projeto** (obrigatório)
- Texto completo sobre o projeto
- Explique contexto, desafios, abordagem
- Preencha em PT e EN

**Resultados** (obrigatório)
- Resultados alcançados
- Métricas, impacto, feedback
- Preencha em PT e EN

**Ordem de Exibição** (obrigatório)
- Número que define a ordem na home
- Menor número aparece primeiro
- Ex: 1, 2, 3, 4...

### 4. Publicar

Depois de preencher tudo, clique em **"Publish"** no canto superior direito!

## 🎯 Dicas

- **Otimize as imagens** antes de fazer upload (use TinyPNG)
- **Ordem das imagens** na galeria define como aparecem na página
- **Tags** aparecem tanto na home quanto na página do projeto
- **Ordem de exibição** permite reorganizar projetos facilmente

## 🔄 Workflow Diário

1. Abra o Sanity Studio: `cd studio && npm run dev`
2. Edite/adicione projetos
3. Clique em "Publish"
4. As mudanças aparecem automaticamente no site!

## 📱 Estrutura Recomendada de Galeria

Para um projeto completo, recomendo essa ordem:

1. Imagem horizontal (wide)
2. Texto "Sobre o projeto" aparece aqui automaticamente
3. Duas imagens quadradas (lado a lado)
4. Imagem horizontal (wide)
5. Duas imagens quadradas (lado a lado)
6. Imagem horizontal (wide)
7. Texto "Resultados" aparece aqui automaticamente

Mas você pode adicionar quantas quiser!

## 🌐 Deploy do Sanity Studio

Quando quiser publicar o Sanity Studio online:

```bash
cd studio
npm run deploy
```

Isso cria uma URL pública tipo `seu-projeto.sanity.studio` onde você pode acessar de qualquer lugar!

## ❓ Problemas Comuns

**"Não consigo fazer upload de imagens"**
- Verifique se o Project ID está correto no `sanity.config.ts`
- Faça login novamente no Sanity Studio

**"As mudanças não aparecem no site"**
- Aguarde alguns segundos (o Sanity usa CDN)
- Recarregue a página com Cmd+Shift+R (Mac) ou Ctrl+Shift+R (Windows)

**"Erro ao carregar projetos"**
- Verifique se publicou os projetos no Sanity
- Verifique se o Project ID está correto
