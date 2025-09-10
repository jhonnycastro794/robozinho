#!/bin/bash

# Ubuntu Server Deployment Script for Casino Robot
# This script sets up the project to run on Ubuntu server

echo "🚀 Iniciando deploy do Casino Robot no Ubuntu Server..."

# Update system packages
echo "📦 Atualizando pacotes do sistema..."
sudo apt update && sudo apt upgrade -y

# Install Python (usually pre-installed, but ensure it's available)
echo "🐍 Instalando/verificando Python..."
sudo apt install -y python3 python3-pip

# Install Node.js and npm (optional, for development/testing)
echo "📦 Instalando Node.js e npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install firewall tools
echo "🔥 Configurando firewall..."
sudo apt install -y ufw
sudo ufw allow ssh
sudo ufw allow 3000
sudo ufw --force enable

# Create project directory
echo "📁 Criando diretório do projeto..."
sudo mkdir -p /var/www/casino-robot
sudo chown -R $USER:$USER /var/www/casino-robot

# Copy project files (assuming this script is run from project directory)
echo "📋 Copiando arquivos do projeto..."
cp -r * /var/www/casino-robot/
cd /var/www/casino-robot

# Install Node.js dependencies if using live-server
echo "📦 Instalando dependências Node.js..."
npm install

# Create systemd service for auto-start
echo "⚙️ Criando serviço systemd..."
sudo tee /etc/systemd/system/casino-robot.service > /dev/null <<EOF
[Unit]
Description=Casino Robot Web Service
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=/var/www/casino-robot
ExecStart=/usr/bin/python3 serve.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and enable service
echo "🔄 Recarregando systemd..."
sudo systemctl daemon-reload
sudo systemctl enable casino-robot
sudo systemctl start casino-robot

# Check service status
echo "📊 Verificando status do serviço..."
sudo systemctl status casino-robot

echo "✅ Deploy concluído!"
echo ""
echo "🌐 O Casino Robot está rodando em:"
echo "   - Local: http://localhost:3000"
echo "   - Rede: http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "🔧 Comandos úteis:"
echo "   - Ver status: sudo systemctl status casino-robot"
echo "   - Reiniciar: sudo systemctl restart casino-robot"
echo "   - Parar: sudo systemctl stop casino-robot"
echo "   - Logs: sudo journalctl -u casino-robot -f"
