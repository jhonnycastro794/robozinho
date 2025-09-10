#!/usr/bin/env python3
"""
Casino Robot Web Server
Production-ready HTTP server for serving the Casino Robot web application
"""

import http.server
import socketserver
import os
import sys
import logging
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Configuration
HOST = os.getenv('SERVER_HOST', '0.0.0.0')
PORT = int(os.getenv('SERVER_PORT', '3000'))
SOURCE_DIR = os.getenv('SOURCE_DIR', 'src')

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP request handler with enhanced logging"""

    def log_message(self, format, *args):
        """Override to use our logger"""
        logger.info(f"{self.address_string()} - {format % args}")

    def end_headers(self):
        """Add security headers"""
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('X-XSS-Protection', '1; mode=block')
        super().end_headers()

def main():
    """Main server function"""
    try:
        # Change to source directory
        source_path = Path(SOURCE_DIR)
        if not source_path.exists():
            logger.error(f"Source directory '{SOURCE_DIR}' not found!")
            sys.exit(1)

        os.chdir(source_path)
        logger.info(f"Changed to directory: {source_path.absolute()}")

        # Create server
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            logger.info("🚀 Casino Robot server starting...")
            logger.info(f"📁 Serving files from: {source_path.absolute()}")
            logger.info(f"🌐 Server running at: http://{HOST}:{PORT}")
            logger.info("💡 Press Ctrl+C to stop the server")

            # Start serving
            httpd.serve_forever()

    except KeyboardInterrupt:
        logger.info("🛑 Server stopped by user")
        sys.exit(0)
    except OSError as e:
        logger.error(f"❌ Failed to start server: {e}")
        sys.exit(1)
    except Exception as e:
        logger.error(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
