# Páginas de Projetos - Allan Rolim Portfolio

## O que foi implementado

Criei um sistema completo de páginas individuais para cada projeto do portfólio, com navegação fluida e design consistente.

### Estrutura criada:

1. **pages/Home.tsx** - Página inicial com hero, grid de projetos e footer
2. **pages/ProjectDetail.tsx** - Página individual de cada projeto com:
   - Header com botão de voltar
   - Hero do projeto com título, descrição e tags
   - Imagem principal em destaque
   - Seção "Sobre o projeto" com conteúdo descritivo
   - Galeria de imagens adicionais
   - Navegação para o próximo projeto

### Funcionalidades:

- **Roteamento com React Router**: Navegação entre home e páginas de projetos
- **URLs dinâmicas**: Cada projeto tem sua própria URL (`/project/1`, `/project/2`, etc.)
- **Navegação no Header**: Clicar no logo volta para a home
- **Cards clicáveis**: Clicar em qualquer card de projeto leva para sua página individual
- **Animações suaves**: Transições com Framer Motion em todas as páginas
- **Design responsivo**: Funciona perfeitamente em mobile e desktop
- **Tema e idioma persistentes**: Mantém as preferências ao navegar entre páginas

### Como usar:

1. Na home, clique em qualquer card de projeto para ver os detalhes
2. Na página do projeto, use o botão "Voltar" ou clique no logo para retornar
3. Use "Próximo projeto" no final da página para navegar sequencialmente

### Próximos passos sugeridos:

- Adicionar conteúdo real para cada projeto (textos, imagens específicas)
- Implementar galeria de imagens com lightbox
- Adicionar seção de depoimentos de clientes
- Criar página de contato dedicada
- Adicionar animações de transição entre páginas
