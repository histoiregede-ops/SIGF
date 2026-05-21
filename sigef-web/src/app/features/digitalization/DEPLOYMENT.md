# Déploiement et Configuration Production

## ✅ Pré-déploiement - Checklist

### Code
- [ ] Pas d'erreurs de compilation
- [ ] Pas de warnings TypeScript
- [ ] Linting passé (si eslint configuré)
- [ ] Pas de console.log en production
- [ ] Pas de debugger statements
- [ ] Types stricts respectés

### Tests
- [ ] Tests unitaires passés
- [ ] Coverage > 80%
- [ ] Tests d'intégration OK
- [ ] Pas de erreurs non gérées
- [ ] Memory leaks vérifiés

### Performance
- [ ] Bundle size acceptable
- [ ] Images optimisées
- [ ] Pas de requêtes synchrones
- [ ] Lazy loading fonctionnel
- [ ] Tree-shaking actif

### Sécurité
- [ ] HTTPS configuré
- [ ] CORS configuré
- [ ] Headers de sécurité
- [ ] Pas de credentials en code
- [ ] Validation des inputs

### Accessibilité
- [ ] Contrast ratio WCAG AA
- [ ] Navigation au clavier OK
- [ ] Screen reader testé
- [ ] Responsive testé
- [ ] Pas d'erreurs a11y

### Documentation
- [ ] README à jour
- [ ] Installation documentée
- [ ] Exemples fournis
- [ ] Changelogs à jour
- [ ] Architecture documentée

---

## 🚀 Build de production

### 1. Compiler
```bash
# Build optimisé pour la production
ng build --configuration production

# Options:
# --source-map=false        # Désactiver les source maps
# --named-chunks            # Noms significatifs pour chunks
# --aot=true               # Ahead-of-Time compilation
# --build-optimizer        # Optimisation avancée
```

### 2. Vérifier le build
```bash
# Vérifier les fichiers générés
ls -lh dist/sigef-web/

# Vérifier les tailles
du -sh dist/sigef-web/

# Analyser les chunks
npm run analyze  # Si script disponible
```

### 3. Résultat attendu
```
dist/sigef-web/
├── index.html                    (~15 KB)
├── main-HASH.js                  (~600 KB - gzippé ~200 KB)
├── polyfills-HASH.js            (~50 KB)
├── styles-HASH.css              (~100 KB)
├── assets/                       (images, fonts)
└── browser/                      (si esm2022)
```

---

## 🖥️ Déploiement serveur

### Option 1: Nginx

```nginx
# /etc/nginx/sites-available/sigef

server {
    listen 80;
    listen [::]:80;
    
    server_name sigef.example.com;
    root /var/www/sigef-web/dist/sigef-web;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    server_name sigef.example.com;
    root /var/www/sigef-web/dist/sigef-web;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/sigef.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sigef.example.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss;

    # Browser caching
    location ~* ^.+\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|ttf)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Angular routing - fallback to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (si backend sur même serveur)
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Logs
    access_log /var/log/nginx/sigef-access.log;
    error_log /var/log/nginx/sigef-error.log;
}
```

### Option 2: Apache

```apache
# /etc/apache2/sites-available/sigef.conf

<VirtualHost *:80>
    ServerName sigef.example.com
    Redirect permanent / https://sigef.example.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName sigef.example.com
    DocumentRoot /var/www/sigef-web/dist/sigef-web

    # SSL
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/sigef.example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/sigef.example.com/privkey.pem

    # Security headers
    Header always set Strict-Transport-Security "max-age=31536000"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"

    # Gzip compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/css
        AddOutputFilterByType DEFLATE application/javascript
    </IfModule>

    # Caching
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType application/javascript A2592000
        ExpiresByType text/css A2592000
        ExpiresByType image/gif A2592000
        ExpiresByType image/jpeg A2592000
        ExpiresByType image/png A2592000
    </IfModule>

    # Angular routing
    <IfModule mod_rewrite.c>
        RewriteEngine on
        RewriteCond %{REQUEST_FILENAME} -d [OR]
        RewriteCond %{REQUEST_FILENAME} -f
        RewriteRule ^ - [L]
        RewriteRule ^ /index.html [L]
    </IfModule>

    # Logs
    ErrorLog ${APACHE_LOG_DIR}/sigef-error.log
    CustomLog ${APACHE_LOG_DIR}/sigef-access.log combined
</VirtualHost>
```

### Option 3: Docker

```dockerfile
# Dockerfile

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Serve stage
FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=builder /app/dist/sigef-web /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# docker-compose.yml

version: '3.8'

services:
  sigef-web:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - /etc/letsencrypt:/etc/letsencrypt:ro
    environment:
      - API_URL=https://api.sigef.example.com
    restart: unless-stopped
```

### Option 4: Node.js / Express

```javascript
// server.js

const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.static('dist/sigef-web', {
  maxAge: '30d',
  etag: false
}));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// API proxy
app.use('/api', require('./api-proxy'));

// Angular routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/sigef-web/index.html'));
});

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🔐 Configuration de sécurité

### HTTPS / SSL

```bash
# Générer certificat Let's Encrypt
sudo certbot certonly --standalone -d sigef.example.com

# Vérifier certificat
openssl x509 -in /etc/letsencrypt/live/sigef.example.com/fullchain.pem -text -noout

# Renouvellement automatique
sudo systemctl enable certbot.timer
```

### Environnement

```bash
# .env.production

API_URL=https://api.sigef.example.com
ENVIRONMENT=production
DEBUG=false
LOG_LEVEL=error
```

### Secrets

```typescript
// environment.prod.ts

export const environment = {
  production: true,
  apiUrl: process.env['API_URL'],
  apiKey: process.env['API_KEY'], // Ne pas commit!
};

// Utiliser dans les services
constructor(private http: HttpClient) {}

private apiUrl = environment.apiUrl;
```

---

## 📊 Monitoring et Logs

### Logs applicatifs

```typescript
// services/logger.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  
  log(message: string, data?: any): void {
    if (!environment.production) {
      console.log(message, data);
    }
    // Envoyer au service de logging
    this.sendToServer('INFO', message, data);
  }

  error(message: string, error?: any): void {
    console.error(message, error);
    this.sendToServer('ERROR', message, error);
  }

  warn(message: string, data?: any): void {
    console.warn(message, data);
    this.sendToServer('WARN', message, data);
  }

  private sendToServer(level: string, message: string, data?: any): void {
    // Envoyer à un service de logging (Sentry, LogRocket, etc.)
  }
}
```

### Performance Monitoring

```typescript
// Mesurer la performance
const start = performance.now();
// ... operation
const end = performance.now();
console.log(`Duration: ${end - start}ms`);

// Envoyer à analytics
if (window.gtag) {
  window.gtag('event', 'operation_duration', {
    value: end - start,
    event_category: 'performance'
  });
}
```

### Health Check

```bash
# Endpoint de santé
GET /health

Response: {
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-05-05T10:00:00Z"
}
```

---

## 🔄 Mise à jour continue

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches: [main, develop]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --watch=false --code-coverage
      
      - name: Build production
        run: npm run build -- --configuration production
      
      - name: Deploy to server
        run: |
          scp -r dist/sigef-web/* user@server:/var/www/sigef-web/
          ssh user@server 'sudo systemctl restart nginx'
```

---

## 📈 Scaling

### Caching

```typescript
// HTTP Caching Headers
new HttpClient
  .get(url, {
    headers: new HttpHeaders({
      'Cache-Control': 'max-age=3600'
    })
  })
```

### CDN Configuration

```nginx
# Servir les assets depuis CDN
location ~* ^/assets/ {
    add_header Cache-Control "public, max-age=31536000";
    add_header X-Served-By "CDN";
}
```

### Load Balancing

```nginx
# upstream backend
upstream sigef_backends {
    server backend1.example.com:8080;
    server backend2.example.com:8080;
    server backend3.example.com:8080;
}

server {
    location /api {
        proxy_pass http://sigef_backends;
    }
}
```

---

## ✅ Post-déploiement

### Vérification

- [ ] Site accessible
- [ ] HTTPS fonctionne
- [ ] Pas d'erreurs 404
- [ ] Assets chargés correctement
- [ ] API responsive
- [ ] Performances acceptables
- [ ] Logs propres
- [ ] Analytics tracking OK

### Monitoring

```bash
# Vérifier les logs
tail -f /var/log/nginx/sigef-error.log
tail -f /var/log/nginx/sigef-access.log

# Vérifier le certificat
ssl-test https://sigef.example.com

# Vérifier la performance
# - Lighthouse Score
# - Core Web Vitals
# - Page Load Time
```

---

## 🔄 Rollback procedure

```bash
# En cas de problème
1. Garder la version précédente
2. Vérifier les logs pour l'erreur
3. Corriger le code
4. Re-builder
5. Re-déployer
```

---

**Prêt pour la production! 🚀**
