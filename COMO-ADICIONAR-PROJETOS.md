# Como Adicionar Projetos ao Portfólio

## 📁 Estrutura de Pastas

```
public/
  projects/
    projeto-1/
      thumbnail.jpg (1200x1200px - imagem da home)
      wide-1.jpg (2400x1200px)
      square-1.jpg (1200x1200px)
      square-2.jpg (1200x1200px)
      wide-2.jpg (2400x1200px)
      square-3.jpg (1200x1200px)
      square-4.jpg (1200x1200px)
      wide-3.jpg (2400x1200px)
    projeto-2/
      thumbnail.jpg
      wide-1.jpg
      ...
  projects.json
```

## 📝 Como Adicionar um Novo Projeto

### 1. Prepare suas imagens

**Tamanhos recomendados:**
- **Thumbnail** (capa da home): 1200x1200px
- **Imagens quadradas**: 1200x1200px ou 1600x1600px
- **Imagens wide**: 2400x1200px (proporção 2:1)

### 2. Crie uma pasta para o projeto

Dentro de `public/projects/`, crie uma pasta com o nome do projeto (sem espaços, use hífen):
```
public/projects/meu-projeto-incrivel/
```

### 3. Coloque as imagens na pasta

Nomeie as imagens de forma organizada:
- `thumbnail.jpg` - Imagem da capa (obrigatória)
- `wide-1.jpg`, `wide-2.jpg`, `wide-3.jpg` - Imagens horizontais
- `square-1.jpg`, `square-2.jpg`, etc - Imagens quadradas

### 4. Edite o arquivo `public/projects.json`

Adicione um novo objeto no array `projects`:

```json
{
  "id": 3,
  "title": {
    "pt": "Nome do Projeto em Português",
    "en": "Project Name in English"
  },
  "description": {
    "pt": "Breve descrição que aparece na home",
    "en": "Brief description that appears on home"
  },
  "tags": ["Tag 1", "Tag 2", "Tag 3"],
  "images": {
    "thumbnail": "/projects/meu-projeto-incrivel/thumbnail.jpg",
    "gallery": [
      "/projects/meu-projeto-incrivel/wide-1.jpg",
      "/projects/meu-projeto-incrivel/square-1.jpg",
      "/projects/meu-projeto-incrivel/square-2.jpg",
      "/projects/meu-projeto-incrivel/wide-2.jpg",
      "/projects/meu-projeto-incrivel/square-3.jpg",
      "/projects/meu-projeto-incrivel/square-4.jpg",
      "/projects/meu-projeto-incrivel/wide-3.jpg"
    ]
  },
  "about": {
    "pt": "Texto completo sobre o projeto. Explique o contexto, desafios, sua abordagem e processo.",
    "en": "Full text about the project. Explain context, challenges, your approach and process."
  },
  "results": {
    "pt": "Resultados alcançados. Fale sobre impacto, métricas, feedback do cliente e usuários.",
    "en": "Results achieved. Talk about impact, metrics, client and user feedback."
  }
}
```

### 5. Ordem das imagens na galeria

A ordem no array `gallery` define como aparecem na página do projeto:
1. Wide 1 (2 colunas)
2. Texto "Sobre o projeto"
3. Square 1 + Square 2 (lado a lado)
4. Wide 2 (2 colunas)
5. Square 3 + Square 4 (lado a lado)
6. Wide 3 (2 colunas)
7. Texto "Resultados"

Você pode adicionar mais imagens seguindo esse padrão!

## 🎨 Dicas

- Use imagens de alta qualidade
- Mantenha um estilo visual consistente
- Otimize as imagens antes de subir (use TinyPNG ou similar)
- As tags aparecem tanto na home quanto na página do projeto
- O ID deve ser único e sequencial (1, 2, 3, 4...)

## ✅ Checklist

- [ ] Criei a pasta do projeto em `public/projects/`
- [ ] Coloquei todas as imagens na pasta
- [ ] Adicionei o projeto no `projects.json`
- [ ] Preenchi título em PT e EN
- [ ] Preenchi descrição em PT e EN
- [ ] Adicionei as tags
- [ ] Escrevi o texto "Sobre"
- [ ] Escrevi o texto "Resultados"
- [ ] Testei no navegador
