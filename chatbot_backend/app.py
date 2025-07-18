from flask import Flask
from database.connection import init_db
from flask_cors import CORS
# Importamos el Blueprint que contiene todas nuestras rutas del chatbot
from routes.chatbot_routes import chatbot_bp

# Llama a la función para inicializar la base de datos y crear las tablas
# Esto se ejecutará una vez cuando la aplicación inicie.
print("Inicializando la base de datos...")
init_db()
print("Base de datos lista.")

app = Flask(__name__)

# Habilitar CORS para permitir peticiones desde cualquier origen.
CORS(app)

# Aquí registrarías tus rutas (Blueprints)
app.register_blueprint(chatbot_bp, url_prefix='/api/chatbot')

@app.route("/")
def index():
    return "El servidor del chatbot está funcionando correctamente. ¡Listo para recibir peticiones!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
