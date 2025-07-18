import os
from flask import Blueprint, request, jsonify, send_file
from services.materias_service import obtener_materias_por_programa, obtener_materias_con_cupo
from services.form_service import procesar_dato_formulario, obtener_formulario_guardado, actualizar_campo_formulario_guardado
from services.redireccion_service import buscar_url_relacionada
from services.pdf_service import generar_pdf_formulario
#from services.ai_service import get_ai_response

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/materias', methods=['POST'])
def consultar_materias():
    data = request.json
    programa = data.get('programa')
    if not programa:
        return jsonify({"error": "Programa no especificado"}), 400
    materias = obtener_materias_por_programa(programa)
    return jsonify({"materias": materias})

@chatbot_bp.route('/materias-con-cupo', methods=['POST'])
def consultar_materias_con_cupo():
    data = request.json
    programa = data.get('programa')
    if not programa:
        return jsonify({"error": "Programa no especificado"}), 400
    materias = obtener_materias_con_cupo(programa)
    return jsonify({"materias": materias})

@chatbot_bp.route('/llenar-formulario', methods=['POST'])
def llenar_formulario():
    data = request.json
    user_id = data.get('user_id')
    campo = data.get('campo')
    valor = data.get('valor')
    if not all([user_id, campo, valor]):
        return jsonify({"error": "Faltan campos obligatorios"}), 400
    respuesta = procesar_dato_formulario(user_id, campo, valor)
    return jsonify(respuesta)

@chatbot_bp.route('/formulario-guardado', methods=['POST'])
def consultar_formulario_guardado():
    data = request.json
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "Falta el user_id"}), 400
    respuesta = obtener_formulario_guardado(user_id)
    return jsonify(respuesta)

@chatbot_bp.route('/actualizar-formulario', methods=['POST'])
def actualizar_formulario_guardado():
    data = request.json
    user_id = data.get('user_id')
    campo = data.get('campo')
    nuevo_valor = data.get('valor')
    if not all([user_id, campo, nuevo_valor]):
        return jsonify({"error": "Faltan campos"}), 400
    respuesta = actualizar_campo_formulario_guardado(user_id, campo, nuevo_valor)
    return jsonify(respuesta)

@chatbot_bp.route('/redireccion', methods=['POST'])
def redireccionar_usuario():
    data = request.json
    pregunta = data.get('pregunta', '')
    url = buscar_url_relacionada(pregunta)
    return jsonify({"url": url})

@chatbot_bp.route('/descargar-formulario', methods=['POST'])
def descargar_formulario():
    data = request.json
    user_id = data.get('user_id')
    token_recibido = data.get('token')

    # Leemos el token seguro desde las variables de entorno
    TOKEN_SEGURO = os.getenv("API_TOKEN")

    if not TOKEN_SEGURO or token_recibido != TOKEN_SEGURO:
        return jsonify({"error": "Token inválido"}), 403
    resultado = obtener_formulario_guardado(user_id)
    if "datos" not in resultado:
        return jsonify({"error": "No hay formulario para este usuario."})
    ruta_pdf = generar_pdf_formulario(user_id, resultado["datos"])
    return send_file(ruta_pdf, as_attachment=True)

@chatbot_bp.route('/ask', methods=['POST'])
def ask_chatbot():
    """Endpoint principal para interactuar con la IA."""
    data = request.json
    user_question = data.get('pregunta')
    user_id = data.get('user_id')
    if not all([user_question, user_id]):
        return jsonify({"error": "Faltan los campos 'pregunta' y 'user_id'"}), 400
    
    respuesta = get_ai_response(user_question, user_id)
    return jsonify(respuesta)
