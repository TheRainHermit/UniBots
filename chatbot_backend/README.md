# 🤖 ChatBot Académico – USC (Universidad Santiago de Cali)

Este proyecto es un backend en Flask que asiste a estudiantes y aspirantes en la inscripción académica, ayudándolos con:

- Registro paso a paso de datos.
- Consulta y sugerencia de materias disponibles (con y sin cupo).
- Asistencia para completar formularios.
- Guardado automático de la información.
- Revisión y edición de formularios.
- Redirección inteligente según preguntas.
- Exportación a PDF de los datos.
- Validación básica con token de seguridad.

---

## ⚙ Estructura del Proyecto

chatbot_backend/
├── app.py
├── routes/
│   └── chatbot_routes.py
├── services/
│   ├── user_service.py
│   ├── form_service.py
│   ├── materias_service.py
│   ├── pdf_service.py
│   └── redireccion_service.py
├── database/
│   └── connection.py
├── data/
│   └── materias_usc.json
│   └── formulario_<user_id>.pdf
├── requirements.txt

---

## 🚀 Instalación y ejecución

### 1. Clonar el proyecto

```bash
git clone https://github.com/tu_usuario/chatbot-usc.git
cd chatbot-usc
```

### 2. Crear entorno virtual y activarlo

```bash
python3 -m venv venv
source venv/bin/activate  # en Linux/mac
venv\Scripts\activate     # en Windows
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Configurar base de datos PostgreSQL

Edita `database/connection.py` y reemplaza estas variables con las que te dio ElephantSQL o Supabase:

```python
DB_HOST = "..."
DB_NAME = "..."
DB_USER = "..."
DB_PASS = "..."
```

Luego corre el servidor:

```bash
python app.py
```

El backend estará disponible en:
👉 http://localhost:5000/api/chatbot/

---

## 🔌 Endpoints disponibles

| Método | Ruta                  | Descripción                              |
|--------|-----------------------|------------------------------------------|
| POST   | /iniciar-registro     | Inicia conversación con usuario          |
| POST   | /llenar-formulario    | Recibe cada campo del formulario         |
| POST   | /formulario-guardado  | Consulta el formulario guardado          |
| POST   | /actualizar-formulario| Edita un campo ya guardado               |
| POST   | /materias             | Devuelve todas las materias por programa |
| POST   | /materias-con-cupo    | Solo materias con cupo disponible        |
| POST   | /ver-formulario       | Muestra el formulario actual (en memoria)|
| POST   | /descargar-formulario | Genera y descarga el formulario como PDF |
| POST   | /redireccion          | Redirige a enlaces oficiales según pregunta |

---

## 🔐 Validación de seguridad (opcional)

Algunos endpoints aceptan un token que debe validarse así:

```json
{
  "user_id": "usr123",
  "token": "clave123"
}
```

Este sistema básico evita que cualquier persona consulte los datos de otros.

---

## 🧪 Prueba rápida (ejemplo en curl o Postman)

```bash
curl -X POST http://localhost:5000/api/chatbot/materias \
     -H "Content-Type: application/json" \
     -d '{"programa": "Ingeniería de Sistemas"}'
```

---

## 📄 Créditos

Este backend fue diseñado para un proyecto universitario por estudiantes de la Universidad Santiago de Cali, con arquitectura modular, conexión a PostgreSQL, y listo para integrarse con un frontend conversacional.

## 💬 Contacto

Para soporte o colaboración técnica, contactar al equipo de desarrollo en esta plataforma.
