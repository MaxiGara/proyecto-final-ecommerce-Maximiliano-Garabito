# API RESTful Node.js para la gestión de medicamentos veterinarios

## Descripción

Este proyecto implementa una API RESTful en Node.js, utilizando Express, para gestionar una lista de medicamentos veterinarios. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los medicamentos, con validaciones básicas, autenticación mediante JWT, y despliegue en Vercel.

---

## Características

* ✅ **CRUD Completo:** Crear, leer, actualizar (PUT/PATCH) y eliminar medicamentos.
* ✅ **Validaciones:** Validaciones básicas de datos en las operaciones POST/PUT.
* ✅ **Autenticación con JWT:** Login de usuario con generación de token JWT.
* ✅ **Protección de rutas:** Solo usuarios autenticados pueden crear, modificar o eliminar productos.
* ✅ **Estructura Modular:** Código organizado en rutas, controladores, servicios y modelos.
* ✅ **Manejo de Errores:** Manejo adecuado de errores comunes y respuestas HTTP.
* ✅ **Despliegue en Vercel:** API accesible desde una URL pública.

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/usuario/tu-repositorio.git
cd tu-repositorio
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
cp .env-example .env
```

Editá el archivo `.env` con los valores correspondientes:

```
PORT=3001
JWT_SECRET=tu_clave_secreta_jwt
```

4. Ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

---

## Base URL

**Local:** `http://localhost:3001/api`
**Producción (Vercel):** `https://<tu-app>.vercel.app/api`

> Reemplazá `<tu-app>` con el subdominio real de tu despliegue en Vercel.

---

## Autenticación

Para crear, modificar o eliminar productos, se requiere autenticación mediante un token JWT.

### Iniciar sesión

* **POST** `/auth/login`

**Body (JSON):**

```json
{
  "email": "usuario@email.com",
  "password": "makpo"
}
```

**Respuesta exitosa:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### Cómo usar el token JWT

Incluí el token en el encabezado de tus peticiones protegidas:

```
Authorization: Bearer TU_TOKEN
```

---

## Endpoints de la API

**⚠️ Importante:** Las siguientes rutas requieren autenticación con JWT:

* `POST /products`
* `PUT /products/:id`
* `PATCH /products/:id`
* `DELETE /products/:id`

---

### Obtener todos los productos

* **Método:** `GET`
* **Endpoint:** `/products`
* **Descripción:** Devuelve la lista completa de medicamentos.

**Respuesta de ejemplo:**

```json
[
  {
    "id": "1",
    "nombre": "Ranitidina",
    "descripcion": "Protector gastrico",
    "presentacion": ["Comprimidos", "Inyectable"],
    "precio": 200
  }
]
```

---

### Buscar medicamentos (por nombre, presentación o precio)

* **Método:** `GET`
* **Endpoint:** `/products/search`
* **Descripción:** Devuelve productos filtrados por nombre, precio y/o presentación.

**Parámetros (query):**

| Nombre         | Tipo     | Requerido | Descripción                                    |
| -------------- | -------- | --------- | ---------------------------------------------- |
| `nombre`       | `string` | Opcional  | Filtra productos que contengan este nombre     |
| `precio`       | `number` | Opcional  | Filtra productos con este precio exacto        |
| `presentacion` | `string` | Opcional  | Filtra por tipo de presentación (ej. "jarabe") |

**Ejemplo:** `/products/search?presentacion=jarabe`

---

### Obtener producto por ID

* **Método:** `GET`
* **Endpoint:** `/products/:id`
* **Descripción:** Obtiene un producto específico por su ID.

**Ejemplo:** `/products/abc123`

**Respuesta de ejemplo:**

```json
{
  "id": "abc123",
  "nombre": "Ibuprofeno Forte",
  "descripcion": "Antiinflamatorio potente",
  "presentacion": "comprimido 600mg",
  "precio": 35
}
```

---

### Crear un nuevo producto (restringido)

* **Método:** `POST`
* **Endpoint:** `/products`
* **Protegido:** ✅ (requiere token JWT)

**Body (JSON):**

```json
{
  "nombre": "Nuevo Medicamento",
  "descripcion": "Descripción del producto",
  "precio": 100,
  "presentacion": ["Comprimidos", "Jarabe"]
}
```

**Respuesta:** `201 Created` con el producto creado.

---

### Actualizar producto completamente (PUT) (restringido)

* **Método:** `PUT`
* **Endpoint:** `/products/:id`
* **Protegido:** ✅

**Body (JSON):**

```json
{
  "nombre": "Producto Modificado",
  "descripcion": "Nueva descripción",
  "precio": 110,
  "presentacion": ["Inyectable"]
}
```

---

### Modificar parcialmente un producto (PATCH) (restringido)

* **Método:** `PATCH`
* **Endpoint:** `/products/:id`
* **Protegido:** ✅

**Body (JSON):**

```json
{
  "precio": 125
}
```

---

### Eliminar un producto (restringido)

* **Método:** `DELETE`
* **Endpoint:** `/products/:id`
* **Protegido:** ✅

**Respuesta:**

* `204 No Content` si se eliminó correctamente.
* `404 Not Found` si el producto no existe.

---

## Recomendación para pruebas

Utilizá herramientas como **Postman**, **Thunder Client** o **Insomnia** para enviar solicitudes HTTP con el token JWT en el header.

---

## Stack utilizado

* Node.js
* Express
* Firebase Firestore
* dotenv
* JWT (jsonwebtoken)
* nodemon (para desarrollo)

---

## Estructura del proyecto (resumen)

```
src/
├── controllers/
│   └── auth.controller.js
│   └── products.controller.js
├── middlewares/
│   └── auth.middleware.js
├── routes/
│   └── auth.router.js
│   └── products.router.js
├── services/
├── index.js
.env
```

---
