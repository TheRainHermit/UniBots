# 🤖 UniBots - Sistema de Chatbot con Inteligencia Artificial

> **Proyecto desarrollado para la Hackathon TalentoTech Valle (Julio 2025)**  
> *🏆 "Respuestas claras, camino seguro"*

**UniBots** es un sistema conversacional inteligente diseñado para la Universidad Santiago de Cali. Integra un chatbot asistido por Inteligencia Artificial para resolver consultas académicas e institucionales en tiempo real, con integración a WhatsApp y aplicaciones móviles.

---

### 🛠️ Arquitectura y Tecnologías

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,ts,python,postgres,flutter,git" alt="Tech Stack"/>
</p>

* **Backend & IA:** Python 🐍 | Modelo LLM local con **Ollama**
* **Frontend Web:** React ⚛️ con TypeScript & Vite / Next.js
* **Aplicación Móvil:** Flutter 📱 (Desarrollo Multiplataforma)
* **Base de Datos:** PostgreSQL 🐘
* **Integración de Mensajería:** Twilio API (Integración con WhatsApp)
* **IDE & Herramientas:** Visual Studio Code, Git & GitHub

---

### ✨ Características Principales

* 🧠 **IA Integrada:** Procesamiento de lenguaje natural mediante Ollama para respuestas contextuales de la universidad.
* 📱 **Integración Multi-canal:** Atención vía web y canal de WhatsApp mediante Twilio.
* 📊 **Panel Administrativo (Dashboard):** Interfaz web para monitorear interacciones y gestionar la base de conocimientos.

---

### 🚀 Instalación y Configuración Local

#### 🖥️ Frontend Web (`chatbot_frontend`)
```bash
cd chatbot_frontend
npm install
npm run dev

cd chatbot_backend
# Crear y activar entorno virtual Python
python -m venv venv
source venv/bin/activate  # En Linux/Mac
# venv\Scripts\activate   # En Windows

# Instalar dependencias y ejecutar
pip install -r requirements.txt
python main.py
