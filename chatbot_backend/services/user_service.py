usuarios_temp = {}

def iniciar_registro(data):
    user_id = data.get('user_id')
    if user_id not in usuarios_temp:
        usuarios_temp[user_id] = {"estado": "registro", "datos": {}}
    return {"mensaje": "¡Vamos a comenzar! ¿Cuál es tu nombre completo?"}

def agregar_dato_formulario(data):
    user_id = data.get('user_id')
    campo = data.get('campo')
    valor = data.get('valor')

    if user_id in usuarios_temp:
        usuarios_temp[user_id]["datos"][campo] = valor
        return {"mensaje": f"{campo.capitalize()} registrado correctamente."}
    return {"mensaje": "Usuario no encontrado."}
