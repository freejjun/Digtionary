import os, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
import http.server, socketserver
port = 3456
handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", port), handler) as httpd:
    print(f"Serving at http://localhost:{port}")
    httpd.serve_forever()
