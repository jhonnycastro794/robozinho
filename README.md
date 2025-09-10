# 🎰 Casino Robot - Sistema de Gerenciamento de Usuários

Sistema web para gerenciamento de usuários do Casino Robot com interface administrativa completa.

![Casino Robot Demo](https://img.shields.io/badge/Status-Funcional-green)
![Testes](https://img.shields.io/badge/Testes-9%2F9%20Passaram-brightgreen)
![Playwright](https://img.shields.io/badge/E2E-Playwright-blue)

## 🚀 Demonstração

**Demo Online**: [Clique aqui para acessar](https://seu-usuario.github.io/casino-robot)

**Credenciais de Teste:**
- Usuário: `admin`
- Senha: `admin123`

## ✨ Funcionalidades

- 🔐 **Sistema de Login** com autenticação segura
- 👥 **Gerenciamento de Usuários** - Adicionar e listar usuários
- 🛡️ **Proteção de Rotas** - Acesso controlado ao painel admin
- 💾 **Persistência de Dados** - Dados salvos no localStorage
- 🚪 **Sistema de Logout** com limpeza de sessão
- ⚠️ **Tratamento de Erros** para credenciais inválidas
- 📱 **Interface Responsiva** adaptável a diferentes dispositivos

## 🧪 Testes

O projeto inclui **9 testes E2E automatizados** com Playwright:

- ✅ Verificação da página inicial
- ✅ Login com credenciais válidas e inválidas
- ✅ Proteção de acesso ao painel admin
- ✅ Adição e listagem de usuários
- ✅ Persistência de sessão e dados
- ✅ Funcionalidade de logout
- ✅ Validação de campos obrigatórios

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Servidor de Desenvolvimento**: Live Server
- **Testes E2E**: Playwright
- **Persistência**: localStorage
- **Hospedagem**: GitHub Pages

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/casino-robot.git
cd casino-robot
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm start
```

4. **Acesse o projeto:**
   - Abra seu navegador em: `http://localhost:3000`
   - Clique em "Acesso ao Painel Admin"
   - Use as credenciais: `admin` / `admin123`

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes com interface visual
npm run test:ui

# Executar testes com navegador visível
npm run test:headed

# Ver relatório dos testes
npx playwright show-report
```

## 📁 Estrutura do Projeto

```
casino-robot/
├── src/
│   ├── index.html          # Página inicial
│   ├── login.html          # Formulário de login
│   ├── admin.html          # Painel administrativo
│   └── script.js           # Lógica JavaScript
├── tests/
│   └── admin-panel.spec.js # Testes E2E
├── package.json            # Configuração do projeto
├── playwright.config.js    # Configuração dos testes
└── README.md              # Este arquivo
```

## 🎯 Como Usar

### 1. Acesso ao Sistema
- Acesse a página inicial
- Clique em "Acesso ao Painel Admin"

### 2. Login
- **Usuário**: `admin`
- **Senha**: `admin123`

### 3. Gerenciar Usuários
- Preencha o nome e email do usuário
- Clique em "Adicionar Usuário"
- Os usuários aparecerão na tabela abaixo

### 4. Logout
- Clique no botão "Sair" para encerrar a sessão

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm test` - Executa os testes E2E
- `npm run test:ui` - Executa testes com interface
- `npm run test:headed` - Executa testes com navegador visível

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, abra uma [issue](https://github.com/seu-usuario/casino-robot/issues) no repositório.

---

**Desenvolvido com ❤️ para o Casino Robot**