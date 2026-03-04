# Como Adicionar Novos Projetos - Guia Atualizado

## ✅ Status Atual do Sistema

O sistema está **100% funcional** e pronto para você adicionar quantos projetos quiser!

### O que foi corrigido:
- ✅ Vídeo da Palae agora funciona independente do ID
- ✅ Sistema busca projetos automaticamente do Strapi no build
- ✅ Novas imagens aparecem automaticamente
- ✅ Tradução PT/EN funcionando
- ✅ Sistema de cores automático OKLCH
- ✅ Navegação entre projetos funcionando

---

## 📝 Passo a Passo para Adicionar Projetos

### 1. Acesse o Strapi Admin
- URL: https://strapi-cms-er5y.onrender.com/admin
- Faça login com suas credenciais

### 2. Crie um Novo Projeto
Vá em **Content Manager → Projects → Create new entry**

### 3. Preencha os Campos Obrigatórios

#### Campos de Texto:
- **title_pt**: Nome do projeto em português
- **title_en**: Nome do projeto em inglês
- **description_pt**: Descrição curta em português (aparece no card)
- **description_en**: Descrição curta em inglês
- **about_pt**: Texto "Sobre o projeto" em português
- **about_en**: Texto "Sobre o projeto" em inglês
- **results_pt**: Texto "Resultados" em português
- **results_en**: Texto "Resultados" em inglês

#### Tags:
- **tags_pt**: Tags separadas por vírgula em português
  - Exemplo: `Identidade Visual, Naming, Direção de Arte, Fotografia`
- **tags_en**: Tags separadas por vírgula em inglês
  - Exemplo: `Brand Identity, Naming, Art Direction, Photography`

#### Cor:
- **color**: Cor principal do projeto em hexadecimal
  - Exemplo: `#7a684d` (bege/marrom da Palae)
  - Exemplo: `#4c674a` (verde da Gautier & Munhoz)
  - O sistema gera automaticamente a versão dark no tema escuro!

#### Imagens:
- **thumbnail**: Imagem de capa (aparece no card na home)
- **gallery**: Galeria de imagens do projeto
  - Adicione quantas imagens quiser
  - O sistema detecta automaticamente imagens wide (largura >= 1.5x altura)
  - Imagens wide ocupam 2 colunas no grid

#### Ordem:
- **order**: Número para ordenar os projetos (1, 2, 3...)
  - Menor número aparece primeiro

### 4. Salve e Publique
- Clique em **Save**
- Clique em **Publish**

### 5. Deploy Automático
O Render vai detectar automaticamente e fazer o deploy em ~5 minutos!

**OU** você pode forçar o deploy manual:
1. Acesse o dashboard do Render
2. Vá no serviço "allanrolim"
3. Clique em "Manual Deploy" → "Deploy latest commit"

---

## 🎨 Dicas de Cores

O sistema usa OKLCH para gerar automaticamente versões dark das cores. Escolha cores que:
- Tenham boa saturação (não muito cinza)
- Sejam representativas do projeto
- Funcionem bem tanto claras quanto escuras

Exemplos de cores que ficam ótimas:
- Tons terrosos: `#7a684d`, `#8b7355`
- Verdes: `#4c674a`, `#5a7d57`
- Azuis: `#4a5f7d`, `#5b7a9e`
- Laranjas: `#d97642`, `#e88d5a`
- Roxos: `#7d5a8b`, `#9370a8`

---

## 📸 Dicas de Imagens

### Thumbnail (Capa):
- Proporção ideal: quadrada (1:1)
- Resolução mínima: 800x800px
- Formato: JPG ou PNG
- Deve representar bem o projeto

### Gallery:
- Imagens verticais/quadradas: ocupam 1 coluna
- Imagens wide (largura >= 1.5x altura): ocupam 2 colunas automaticamente
- Resolução recomendada: 1920px de largura
- Formato: JPG (melhor performance)

---

## 🎬 Vídeo (Opcional)

Atualmente apenas o projeto Palae tem vídeo. Se quiser adicionar vídeo em outros projetos:
1. Coloque o arquivo .mp4 na pasta `public/`
2. Me avise para ajustar o código

---

## ✅ Checklist Antes de Publicar

- [ ] Título em PT e EN preenchidos
- [ ] Descrição em PT e EN preenchidas
- [ ] Tags em PT e EN preenchidas (separadas por vírgula)
- [ ] About em PT e EN preenchidos
- [ ] Results em PT e EN preenchidos
- [ ] Cor hexadecimal definida (ex: #7a684d)
- [ ] Thumbnail (imagem de capa) adicionada
- [ ] Gallery com pelo menos 3-5 imagens
- [ ] Order definido (número de ordenação)
- [ ] Projeto salvo e publicado no Strapi

---

## 🚀 Resumo do Fluxo

```
1. Você adiciona projeto no Strapi
   ↓
2. Clica em Save + Publish
   ↓
3. Render detecta mudança no Strapi
   ↓
4. Build roda automaticamente
   ↓
5. Script busca projetos do Strapi
   ↓
6. Gera public/projects.json
   ↓
7. Build do frontend
   ↓
8. Deploy automático
   ↓
9. Site atualizado! 🎉
```

---

## 🆘 Problemas Comuns

### "Projeto não aparece no site"
- Verifique se clicou em **Publish** no Strapi
- Aguarde 5-10 minutos para o deploy completar
- Force um deploy manual no Render se necessário

### "Imagens não carregam"
- Verifique se as imagens foram enviadas corretamente no Strapi
- Confirme que o Cloudinary está configurado
- Teste a URL da imagem diretamente no navegador

### "Cores estranhas no tema dark"
- Escolha cores com boa saturação
- Evite cores muito claras ou muito escuras
- O sistema ajusta automaticamente, mas cores vibrantes funcionam melhor

---

## 📞 Precisa de Ajuda?

Se tiver qualquer dúvida ou problema, é só me chamar! O sistema está pronto e funcionando perfeitamente. 🚀
