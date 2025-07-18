import os
import google.generativeai as genai
from services.materias_service import obtener_materias_por_programa
from services.redireccion_service import buscar_url_relacionada

# Configura la API Key desde las variables de entorno
#  GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# if not GOOGLE_API_KEY:
    # raise ValueError("No se ha configurado la GOOGLE_API_KEY en el archivo .env")

#genai.configure(api_key=GOOGLE_API_KEY)

# Este es el "cerebro" del chatbot.
# Le damos una instrucción inicial para que sepa cómo comportarse.
#model = genai.GenerativeModel('gemini-1.5-flash')

# def get_ai_response(user_question, user_id):
#     """
#     Función principal que procesa la pregunta del usuario.
#     Por ahora, solo responderá de forma conversacional.
#     Más adelante, le daremos "herramientas" para usar los otros servicios.
#     """
    
#     # Un prompt básico para empezar
#     prompt = f"""
#     Eres un asistente virtual amigable y servicial para la Universidad Santiago de Cali.
#     Un usuario con el ID '{user_id}' te ha hecho la siguiente pregunta: '{user_question}'.
#     Por favor, responde de manera clara y concisa.
#     """

#     response = model.generate_content(prompt)
#     return {"respuesta": response.text}