# 🔄 Configurar Deploy Automático (Webhook)

## O que é isso?

Quando você publicar um projeto no Sanity, o Netlify vai automaticamente reconstruir e atualizar o site. Você não precisa fazer nada manualmente!

## Passo a Passo:

### 1. Criar Build Hook no Netlify

1. Acesse: https://app.netlify.com/sites/allanrolim/settings/deploys
2. Role até a seção **"Build hooks"**
3. Clique em **"Add build hook"**
4. Nome: `Sanity Publish`
5. Branch: `main`
6. Clique em **"Save"**
7. **COPIE A URL** que aparecer (algo como: `https://api.netlify.com/build_hooks/xxxxx`)

### 2. Adicionar Webhook no Sanity

1. Acesse: https://www.sanity.io/manage/personal/project/va3uk7s9
2. Vá em **"API"** no menu lateral
3. Role até **"Webhooks"**
4. Clique em **"Create webhook"**
5. Preencha:
   - **Name**: `Deploy Netlify`
   - **URL**: Cole a URL do build hook que você copiou do Netlify
   - **Dataset**: `production`
   - **Trigger on**: Marque `Create`, `Update` e `Delete`
   - **Filter**: Deixe em branco (ou use `_type == "project"` para só projetos)
   - **HTTP method**: `POST`
   - **API version**: `v2021-06-07`
6. Clique em **"Save"**

### 3. Testar!

1. Acesse o Sanity Studio: https://allanrolim.sanity.studio/
2. Crie ou edite um projeto
3. Clique em **"Publish"**
4. Aguarde 1-2 minutos
5. Acesse https://allanrolim.netlify.app/ e veja as mudanças!

## ✅ Pronto!

Agora seu workflow é:

1. Acesse https://allanrolim.sanity.studio/
2. Adicione/edite projetos
3. Clique em "Publish"
4. O site atualiza automaticamente em 1-2 minutos!

## 🔗 Links Úteis

- **Site**: https://allanrolim.netlify.app/
- **CMS**: https://allanrolim.sanity.studio/
- **Netlify Dashboard**: https://app.netlify.com/sites/allanrolim
- **Sanity Dashboard**: https://www.sanity.io/manage/personal/project/va3uk7s9
