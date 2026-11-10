# 🚀 Talento Tech — Node.js

![Node.js](https://img.shields.io/badge/Node.js-JavaScript-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-API-000000?logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)
![JWT](https://img.shields.io/badge/Auth-JWT-8A2BE2)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

API REST para administrar productos con Node.js, Express y Firebase Firestore. Incluye inicio de sesión con JWT y está desplegada en Vercel.

🔗 **[Ver repositorio en GitHub](https://github.com/franjavi1/api-rest-node.js)**  
🌐 **[Ver API en producción](https://api-rest-node-js-dusky.vercel.app)**

> Esta aplicación es una API, no un sitio web. La raíz `/` puede responder `Ruta no encontrada`; para usarla, enviá solicitudes a sus endpoints.

## 🧩 ¿De qué trata?

Este proyecto fue desarrollado como parte de la formación **Talento Tech — Node.js**. Permite consultar y administrar productos guardados en Firestore, con rutas protegidas mediante tokens JWT.

El flujo de una petición es:

```text
👨‍💻 Cliente (Postman / frontend / curl)
                  │
                  ▼
            🌐 API en Vercel
                  │
          ┌───────┴────────┐
          │                │
       POST login     Rutas de productos
          │                │
          ▼                ▼
       🔑 JWT         🛡️ Middleware JWT
                           │
                           ▼
              🎮 Controller → ⚙️ Service
                           │
                           ▼
                     🗄️ Firestore
```

## ⚡ Funcionalidades

| Método | Endpoint | Función |
|---|---|---|
| 🔑 `POST` | `/auth/login` | Valida las credenciales de demostración y devuelve un JWT. |
| 🟢 `GET` | `/api/products` | Obtiene todos los productos. |
| 🔎 `GET` | `/api/products/:id` | Busca un producto por su ID. |
| 🟡 `POST` | `/api/products/create` | Crea un producto en Firestore. |
| 🔵 `PATCH` | `/api/products/:id` | Actualiza un producto existente. |
| 🔴 `DELETE` | `/api/products/:id` | Elimina un producto por su ID. |

Las rutas de productos requieren un token Bearer. El login es público.

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| 🟢 Node.js | Entorno de ejecución |
| 🟡 JavaScript / ES Modules | Lenguaje y sistema de módulos |
| 🚏 Express | Servidor y rutas HTTP |
| 🔥 Firebase Firestore | Persistencia de productos |
| 🔐 JSON Web Token | Autenticación de rutas |
| 🌍 CORS | Permitir solicitudes de otros orígenes |
| ☁️ Vercel | Despliegue de la API |

## 📁 Estructura del proyecto

```text
📦 api-rest-node.js
├── 📄 index.js                     # Configuración y arranque de Express
├── 📄 vercel.json                  # Configuración de despliegue
├── 📄 package.json                # Dependencias y comandos
├── 📁 utils/
│   └── 📄 token-generator.js       # Generación del JWT
└── 📁 src/
    ├── 📁 controllers/             # Controladores HTTP
    ├── 📁 data/                    # Conexión con Firebase
    ├── 📁 middlewares/             # Middleware de autenticación
    ├── 📁 models/                  # Consultas a Firestore
    ├── 📁 routes/                  # Rutas de auth y productos
    └── 📁 services/                # Lógica entre controladores y modelos
```

## 🚀 Instalación y ejecución local

Necesitás tener Node.js y npm instalados.

```bash
git clone https://github.com/franjavi1/api-rest-node.js.git
cd api-rest-node.js
npm install
npm run dev
```

El servidor local queda disponible en `http://localhost:3000`. También podés iniciarlo con `npm start`.

## 🔐 Variables de entorno

Creá un archivo `.env` en la raíz del proyecto y completá tus valores de Firebase y JWT:

```env
JWT_SECRET_KEY=tu_clave_secreta
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
FIREBASE_APP_ID=tu_app_id
```

En producción, configurá las mismas variables en **Vercel → Project Settings → Environment Variables**. No subas `.env` a GitHub: el archivo está excluido por `.gitignore`.

## 🎮 Uso

### 1. Iniciar sesión y obtener un token

En Postman, elegí **POST** y usá:

```text
https://api-rest-node-js-dusky.vercel.app/auth/login
```

En **Body → raw → JSON**, enviá las credenciales de demostración configuradas en el controlador:

```json
{
  "email": "user@email.com",
  "password": "strongPass123"
}
```

La respuesta es un token JWT (cadena JSON). Copialo para autorizar las siguientes solicitudes. El token vence en una hora.

### 2. Enviar el token

En Postman, abrí **Authorization → Bearer Token** y pegá el token sin comillas y sin escribir `Bearer` en el campo. Postman agrega el prefijo automáticamente.

También podés enviar este encabezado desde otro cliente:

```http
Authorization: Bearer <token>
```

### 🟢 Obtener productos

```http
GET https://api-rest-node-js-dusky.vercel.app/api/products
```

Para consultar uno, reemplazá `ID_DEL_PRODUCTO` por el ID creado por Firestore:

```http
GET https://api-rest-node-js-dusky.vercel.app/api/products/ID_DEL_PRODUCTO
```

### 🟡 Crear un producto

```http
POST https://api-rest-node-js-dusky.vercel.app/api/products/create
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
  "category": "informatica",
  "name": "Teclado",
  "price": 15000
}
```

`category` y `name` deben ser textos no vacíos. `price` debe ser un número mayor que cero, sin comillas. Firestore genera el ID automáticamente.

### 🔵 Actualizar un producto

```http
PATCH https://api-rest-node-js-dusky.vercel.app/api/products/ID_DEL_PRODUCTO
Content-Type: application/json
Authorization: Bearer <token>
```

En el body enviá los campos que querés modificar:

```json
{
  "price": 18000
}
```

### 🔴 Eliminar un producto

```http
DELETE https://api-rest-node-js-dusky.vercel.app/api/products/ID_DEL_PRODUCTO
Authorization: Bearer <token>
```

## 📬 Respuestas HTTP

| Estado | Significado |
|---|---|
| `200` | Consulta, actualización o eliminación exitosa |
| `201` | Producto creado |
| `400` | Body inválido al crear o JSON mal formado |
| `401` | Falta el token, el formato Bearer no es válido o las credenciales de login son incorrectas |
| `403` | Token inválido o vencido |
| `404` | Ruta o producto no encontrado |
| `500` | Error interno del servidor o de un servicio externo |

## 🧠 Conceptos practicados

🟢 Arquitectura por capas · 🟢 Rutas y controladores · 🟢 Servicios y modelos · 🟢 Métodos HTTP · 🟢 CRUD · 🟢 Firestore · 🟢 JWT · 🟢 Variables de entorno · 🟢 Middleware · 🟢 Manejo de errores · 🟢 Despliegue en Vercel

## 👨‍💻 Autor

**Francisco Javier Stevenin**  
🎓 Proyecto realizado durante la formación **Talento Tech — Node.js**.

🔗 [GitHub](https://github.com/franjavi1)

⭐ Si te resulta útil, podés darle una estrella al repositorio.

🚀 **Node.js · JavaScript · Express · REST API · Firestore · JWT · Vercel**
