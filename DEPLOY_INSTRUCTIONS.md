# Despliegue en GitHub Pages

Este proyecto ha sido configurado para ser desplegado fácilmente en GitHub Pages.

## Cambios realizados para compatibilidad

1.  **Routing**: Se ha cambiado `BrowserRouter` por `HashRouter` en `src/main.tsx`. Esto evita errores 404 al recargar páginas en subrutas, ya que GitHub Pages no soporta nativamente el enrutamiento de SPAs (Single Page Applications) sin configuración adicional del servidor. Las URLs tendrán el formato `/#/ruta`.
2.  **Rutas Relativas**: Se ha configurado `base: './'` en `vite.config.ts`. Esto asegura que los archivos CSS y JS se carguen correctamente independientemente de si la app está en la raíz del dominio o en un subdirectorio (como `https://usuario.github.io/repo/`).

## Instrucciones de Despliegue Manual

1.  **Construir el proyecto**:
    Ejecuta el siguiente comando para generar la carpeta `dist` con los archivos optimizados para producción:
    ```bash
    npm run build
    ```

2.  **Subir a GitHub**:
    Sube el contenido de tu proyecto a un repositorio en GitHub.

3.  **Configurar GitHub Pages**:
    *   Ve a la pestaña **Settings** de tu repositorio.
    *   Ve a la sección **Pages** (en el menú lateral izquierdo).
    *   En **Build and deployment**, selecciona **GitHub Actions** si quieres automatizarlo, o **Deploy from a branch** si prefieres hacerlo manualmente desde una rama.

### Opción A: Despliegue manual desde la carpeta `dist` (gh-pages)

La forma más sencilla es usar el paquete `gh-pages`.

1.  Instala la dependencia (si no quieres instalarla, puedes hacerlo manualmente con git):
    ```bash
    npm install gh-pages --save-dev
    ```

2.  Añade el script de despliegue en `package.json`:
    ```json
    "scripts": {
      // ... otros scripts
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

3.  Ejecuta el despliegue:
    ```bash
    npm run deploy
    ```

### Opción B: GitHub Actions (Recomendado)

Crea un archivo en `.github/workflows/deploy.yml` con el siguiente contenido:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Una vez subido este archivo, GitHub detectará la acción y desplegará tu sitio automáticamente cada vez que hagas push a la rama `main`.
