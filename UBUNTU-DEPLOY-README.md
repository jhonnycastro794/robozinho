# 🚀 Deploy do Casino Robot no Ubuntu Server

Este guia fornece instruções completas para implantar o Casino Robot em um servidor Ubuntu.

## 📋 Pré-requisitos

- Servidor Ubuntu 20.04 LTS ou superior
- Acesso root ou sudo
- Domínio (opcional, mas recomendado para produção)

## 🛠️ Método 1: Deploy Automático (Recomendado)

### Passo 1: Preparar o Servidor

```bash
# Atualizar o sistema
sudo apt update && sudo apt upgrade -y

# Instalar Git
sudo apt install -y git
```

### Passo 2: Clonar e Executar o Script

```bash
# Clonar o repositório
git clone https://github.com/SEU-USUARIO/casino-robot.git
cd casino-robot

# Tornar o script executável
chmod +x ubuntu-deploy.sh

# Executar o deploy
sudo ./ubuntu-deploy.sh
```

### Passo 3: Verificar o Deploy

```bash
# Verificar status do serviço
sudo systemctl status casino-robot

# Ver logs
sudo journalctl -u casino-robot -f

# Testar acesso
curl http://localhost:3000
```

## 🛠️ Método 2: Deploy Manual

### Passo 1: Instalar Dependências

```bash
# Instalar Python e Node.js
sudo apt update
sudo apt install -y python3 python3-pip nodejs npm

# Instalar firewall
sudo apt install -y ufw
```

### Passo 2: Configurar Firewall

```bash
sudo ufw allow ssh
sudo ufw allow 3000
sudo ufw --force enable
```

### Passo 3: Configurar o Projeto

```bash
# Criar diretório do projeto
sudo mkdir -p /var/www/casino-robot
sudo chown -R $USER:$USER /var/www/casino-robot

# Copiar arquivos
cp -r * /var/www/casino-robot/
cd /var/www/casino-robot

# Instalar dependências (se usar Node.js)
npm install
```

### Passo 4: Configurar Serviço Systemd

```bash
# Copiar arquivo de serviço
sudo cp casino-robot.service /etc/systemd/system/

# Recarregar systemd
sudo systemctl daemon-reload

# Habilitar e iniciar serviço
sudo systemctl enable casino-robot
sudo systemctl start casino-robot
```

## 🌐 Configuração com Nginx (Opcional - Recomendado para Produção)

### Passo 1: Instalar Nginx

```bash
sudo apt install -y nginx
```

### Passo 2: Configurar Site

```bash
# Copiar configuração
sudo cp nginx.conf /etc/nginx/sites-available/casino-robot

# Editar configuração (substitua your-domain.com)
sudo nano /etc/nginx/sites-available/casino-robot

# Criar symlink
sudo ln -s /etc/nginx/sites-available/casino-robot /etc/nginx/sites-enabled/

# Remover configuração padrão
sudo rm /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### Passo 3: Configurar SSL com Let's Encrypt (Opcional)

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Verificar renovação automática
sudo certbot renew --dry-run
```

## 🔧 Configuração Personalizada

### Editar config.env

```bash
# Copie e edite as configurações
cp config.env config.env.local
nano config.env.local
```

### Principais Configurações

- `SERVER_PORT`: Porta do servidor (padrão: 3000)
- `DOMAIN`: Seu domínio para SSL
- `PROJECT_DIR`: Diretório do projeto
- `SERVICE_NAME`: Nome do serviço systemd

## 📊 Monitoramento e Manutenção

### Comandos Úteis

```bash
# Verificar status do serviço
sudo systemctl status casino-robot

# Ver logs em tempo real
sudo journalctl -u casino-robot -f

# Reiniciar serviço
sudo systemctl restart casino-robot

# Parar serviço
sudo systemctl stop casino-robot

# Ver logs do Nginx
sudo tail -f /var/log/nginx/casino-robot_access.log
sudo tail -f /var/log/nginx/casino-robot_error.log
```

### Backup dos Dados

```bash
# Backup dos arquivos
tar -czf casino-robot-backup-$(date +%Y%m%d).tar.gz /var/www/casino-robot

# Backup do banco de dados (se aplicável)
# Adicione comandos de backup do seu banco de dados aqui
```

## 🚨 Troubleshooting

### Problema: Serviço não inicia

```bash
# Verificar logs detalhados
sudo journalctl -u casino-robot -n 50

# Verificar permissões
ls -la /var/www/casino-robot
```

### Problema: Porta 3000 ocupada

```bash
# Verificar processos na porta 3000
sudo lsof -i :3000

# Matar processo se necessário
sudo kill -9 PID_DO_PROCESSO
```

### Problema: Firewall bloqueando

```bash
# Verificar status do firewall
sudo ufw status

# Permitir porta específica
sudo ufw allow 3000
```

### Problema: Nginx não carrega

```bash
# Testar configuração
sudo nginx -t

# Verificar logs
sudo tail -f /var/log/nginx/error.log
```

## 🔒 Segurança

### Configurações Recomendadas

1. **Atualizações Automáticas**:
```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

2. **Fail2Ban para proteção SSH**:
```bash
sudo apt install -y fail2ban
```

3. **Configurar usuário não-root**:
```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
```

## 📈 Otimização de Performance

### Configurações do Sistema

```bash
# Aumentar limites de arquivo
echo "fs.file-max = 65536" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Configurar limits.conf
echo "* soft nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 65536" | sudo tee -a /etc/security/limits.conf
```

### Otimização do Python

```bash
# Instalar Gunicorn para produção (opcional)
pip3 install gunicorn

# Executar com Gunicorn
gunicorn --bind 0.0.0.0:3000 --workers 4 serve:app
```

## 🌐 Acesso ao Sistema

Após o deploy, o Casino Robot estará disponível em:

- **Local**: `http://localhost:3000`
- **Com Nginx**: `http://your-domain.com`
- **Com SSL**: `https://your-domain.com`

### Credenciais de Acesso

- **Usuário**: `admin`
- **Senha**: `admin123`

## 📞 Suporte

Para problemas específicos:

1. Verifique os logs do serviço
2. Teste a conectividade da porta
3. Verifique permissões dos arquivos
4. Confirme configurações do firewall

---

**🎰 Deploy concluído com sucesso!**
