# Como Configurar Google Analytics 4 (GA4)

## 🎯 O que você vai conseguir rastrear:

- ✅ Número de visitantes (únicos e totais)
- ✅ De onde vêm (país, cidade, dispositivo)
- ✅ Quais páginas visitam
- ✅ Quanto tempo ficam no site
- ✅ Quais projetos clicam
- ✅ Se clicam no botão de contato (WhatsApp)
- ✅ Se assistem o vídeo da Palae
- ✅ Se mudam idioma (PT/EN)
- ✅ Se mudam tema (claro/escuro)
- ✅ Fluxo de navegação entre páginas

---

## 📋 Passo 1: Criar Conta no Google Analytics

1. Acesse: https://analytics.google.com/
2. Faça login com sua conta Google
3. Clique em **"Começar a medir"** ou **"Criar conta"**

### Configuração da Conta:
- **Nome da conta**: Allan Rolim Portfolio (ou o que preferir)
- Marque as opções de compartilhamento de dados (opcional)
- Clique em **Avançar**

### Configuração da Propriedade:
- **Nome da propriedade**: Allan Rolim Site
- **Fuso horário**: (GMT-03:00) Brasília
- **Moeda**: Real brasileiro (BRL)
- Clique em **Avançar**

### Detalhes da Empresa:
- **Setor**: Design e Tecnologia
- **Tamanho da empresa**: Pequena (1-10 funcionários)
- Clique em **Avançar**

### Objetivos Comerciais:
- Marque: **"Examinar o comportamento do usuário"**
- Clique em **Criar**

### Aceite os Termos:
- Leia e aceite os termos de serviço
- Clique em **Aceito**

---

## 📋 Passo 2: Configurar Fluxo de Dados

1. Selecione plataforma: **Web**
2. Preencha:
   - **URL do site**: https://allanrolim.onrender.com (ou seu domínio)
   - **Nome do fluxo**: Allan Rolim Portfolio
3. Clique em **Criar fluxo**

---

## 📋 Passo 3: Copiar o ID de Medição

Após criar o fluxo, você verá uma tela com:

```
ID de medição
G-XXXXXXXXXX
```

**COPIE ESSE ID!** Você vai precisar dele.

---

## 📋 Passo 4: Adicionar o ID no Render

### Opção A: Via Dashboard do Render (Recomendado)

1. Acesse: https://dashboard.render.com/
2. Vá no serviço **"allanrolim"**
3. Clique em **Environment**
4. Clique em **Add Environment Variable**
5. Adicione:
   - **Key**: `VITE_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (seu ID copiado)
6. Clique em **Save Changes**
7. O Render vai fazer redeploy automaticamente

### Opção B: Via render.yaml (Alternativa)

Edite o arquivo `render.yaml` e adicione nas envVars do serviço allanrolim:

```yaml
- key: VITE_GA_MEASUREMENT_ID
  value: G-XXXXXXXXXX
```

Depois faça commit e push.

---

## 📋 Passo 5: Verificar se Está Funcionando

### Teste em Tempo Real:

1. Acesse o Google Analytics
2. No menu lateral, clique em **Relatórios** → **Tempo real**
3. Abra seu site em outra aba: https://allanrolim.onrender.com
4. Navegue pelo site (clique em projetos, mude idioma, etc.)
5. Volte no Google Analytics
6. Você deve ver **1 usuário ativo** aparecendo!

### Se não aparecer:

1. Abra o Console do navegador (F12)
2. Vá na aba **Console**
3. Procure por erros relacionados a "gtag" ou "analytics"
4. Verifique se o ID está correto no Render

---

## 📊 Como Ver os Dados

### Relatórios Principais:

#### 1. Tempo Real
- **Onde**: Relatórios → Tempo real
- **O que mostra**: Visitantes ativos agora, páginas que estão vendo

#### 2. Visão Geral
- **Onde**: Relatórios → Visão geral
- **O que mostra**: Resumo de usuários, sessões, taxa de rejeição

#### 3. Aquisição
- **Onde**: Relatórios → Aquisição → Visão geral
- **O que mostra**: De onde vêm os visitantes (Google, direto, redes sociais)

#### 4. Engajamento
- **Onde**: Relatórios → Engajamento → Páginas e telas
- **O que mostra**: Quais páginas são mais visitadas

#### 5. Dados Demográficos
- **Onde**: Relatórios → Dados demográficos → Visão geral
- **O que mostra**: País, cidade, idioma dos visitantes

#### 6. Tecnologia
- **Onde**: Relatórios → Tecnologia → Visão geral
- **O que mostra**: Dispositivos (mobile/desktop), navegadores, sistemas operacionais

#### 7. Eventos Personalizados
- **Onde**: Relatórios → Engajamento → Eventos
- **O que mostra**: Eventos customizados que configuramos:
  - `click_project`: Quando clicam em um projeto
  - `view_project`: Quando visualizam página de projeto
  - `click_contact`: Quando clicam no botão de contato
  - `change_language`: Quando mudam idioma
  - `change_theme`: Quando mudam tema
  - `play_video`: Quando assistem o vídeo

---

## 🎨 Eventos Customizados Configurados

### Projetos:
- **click_project**: Quando clica no card de projeto na home
  - Label: Nome do projeto (ex: "Palae")
- **view_project**: Quando entra na página do projeto
  - Label: Nome do projeto

### Contato:
- **click_contact**: Quando clica no botão de WhatsApp
  - Label: Localização do botão (hero_cta, footer_cta, project_cta)

### Configurações:
- **change_language**: Quando muda idioma
  - Label: Idioma escolhido (pt, en)
- **change_theme**: Quando muda tema
  - Label: Tema escolhido (light, dark)

### Mídia:
- **play_video**: Quando assiste o vídeo da Palae
  - Label: Nome do projeto

---

## 📱 App do Google Analytics

Baixe o app para acompanhar em tempo real:

- **iOS**: https://apps.apple.com/app/google-analytics/id881599038
- **Android**: https://play.google.com/store/apps/details?id=com.google.android.apps.giant

---

## 🔍 Dicas Úteis

### Ver Dados de Hoje:
1. No canto superior direito, clique no seletor de data
2. Escolha "Hoje"

### Ver Dados da Última Semana:
1. Seletor de data → "Últimos 7 dias"

### Criar Relatórios Personalizados:
1. Explorar → Criar exploração
2. Escolha métricas e dimensões que quer ver

### Configurar Alertas:
1. Administrador → Alertas personalizados
2. Configure para receber email quando algo acontecer

---

## ✅ Checklist Final

- [ ] Conta do Google Analytics criada
- [ ] Propriedade configurada
- [ ] Fluxo de dados web criado
- [ ] ID de medição copiado (G-XXXXXXXXXX)
- [ ] Variável de ambiente adicionada no Render
- [ ] Site testado em tempo real
- [ ] Apareceu no relatório de tempo real
- [ ] App instalado no celular (opcional)

---

## 🆘 Problemas Comuns

### "Não aparece nada no tempo real"
- Aguarde 1-2 minutos (pode ter delay)
- Limpe cache do navegador (Ctrl+Shift+Delete)
- Verifique se o ID está correto
- Teste em modo anônimo do navegador

### "Erro no console: gtag is not defined"
- O ID não foi configurado no Render
- Ou o deploy ainda não terminou
- Aguarde o deploy completar e teste novamente

### "Dados aparecem mas eventos não"
- Os eventos aparecem em "Engajamento → Eventos"
- Pode levar alguns minutos para aparecer
- Teste fazendo as ações (clicar em projeto, mudar idioma, etc.)

---

## 📞 Precisa de Ajuda?

Se tiver qualquer dúvida, é só me chamar! O sistema está pronto, só falta configurar o ID. 🚀
