# 🚀 Guia de Deploy no GitHub

## Passos para Hospedar no GitHub Pages

### 1. Criar Repositório no GitHub

1. Vá para [github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Nome do repositório: `casino-robot` (ou o nome que preferir)
5. Marque como **público** (necessário para GitHub Pages gratuito)
6. **NÃO** marque "Initialize this repository with a README"
7. Clique em **"Create repository"**

### 2. Conectar Repositório Local

Execute estes comandos no terminal (já está pronto):

```bash
# Já executado - repositório Git inicializado
git init
git add .
git commit -m "Initial commit"

# Execute estes comandos (substitua SEU-USUARIO):
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/casino-robot.git
git push -u origin main
```

### 3. Ativar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique na aba **"Settings"** 
3. No menu lateral, clique em **"Pages"**
4. Em **"Source"**, selecione **"GitHub Actions"**
5. O workflow já está configurado (`.github/workflows/deploy.yml`)

### 4. Aguardar Deploy

- O deploy acontece automaticamente via GitHub Actions
- Acesse a aba **"Actions"** para ver o progresso
- Quando completar, o site estará disponível em:
  `https://seu-usuario.github.io/casino-robot`

## 🌐 URLs Importantes

- **Repositório**: `https://github.com/SEU-USUARIO/casino-robot`
- **Site Live**: `https://SEU-USUARIO.github.io/casino-robot`
- **Actions**: `https://github.com/SEU-USUARIO/casino-robot/actions`

## 🔧 Comandos Git Prontos

Copie e execute (substitua SEU-USUARIO):

```bash
# Navegar para o projeto
cd "i:\robô\casino-robot"

# Adicionar repositório remoto
git remote add origin https://github.com/SEU-USUARIO/casino-robot.git

# Renomear branch para main
git branch -M main

# Fazer upload inicial
git push -u origin main
```

## 🔄 Para Atualizações Futuras

```bash
# Após fazer mudanças no código:
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

O site será atualizado automaticamente a cada push!

## ✅ Checklist de Deploy

- [ ] Repositório criado no GitHub
- [ ] Git configurado localmente
- [ ] Remote origin adicionado
- [ ] Push inicial feito
- [ ] GitHub Pages ativado
- [ ] Workflow executou com sucesso
- [ ] Site acessível na URL do GitHub Pages

## 🆘 Troubleshooting

### Problema: "Permission denied"
- Use HTTPS em vez de SSH: `https://github.com/usuario/repo.git`
- Ou configure SSH key no GitHub

### Problema: "Failed to push"
- Verifique se o repositório foi criado no GitHub
- Confirme o nome de usuário e repositório no comando

### Problema: "GitHub Pages não ativa"
- Certifique-se que o repositório é público
- Aguarde alguns minutos após o primeiro push
- Verifique se o workflow está executando na aba Actions