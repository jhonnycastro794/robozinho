import http.server
import socketserver
import os

# Muda para o diretório src
os.chdir('src')

# Cria o handler
handler = http.server.SimpleHTTPRequestHandler

# Inicia o servidor na porta 3000
with socketserver.TCPServer(("", 3000), handler) as httpd:
    print("Servidor rodando em http://localhost:3000")
    httpd.serve_forever()
