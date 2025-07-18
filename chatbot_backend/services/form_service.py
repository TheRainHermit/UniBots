import psycopg
from database.connection import get_conn
from email_validator import validate_email, EmailNotValidError

# Definimos los campos esperados (orden del formulario)
# Esta lista sigue siendo nuestra "lista blanca" de campos válidos.
CAMPOS = [
    "nombre_completo",
    "correo",
    "documento",
    "telefono",
    "programa",
    "semestre"
]

def procesar_dato_formulario(user_id, campo, valor):
    """
    Procesa un dato del formulario de manera stateless.
    1. Busca un formulario 'in_progress' para el usuario.
    2. Si no existe, crea uno nuevo.
    3. Si existe, lo actualiza.
    4. Comprueba si el formulario está completo y actualiza su estado.
    """
    if campo not in CAMPOS:
        return {"error": f"El campo '{campo}' no es válido."}

    # Añadimos validación específica para el campo 'correo'
    if campo == 'correo':
        try:
            validate_email(valor)
        except EmailNotValidError as e:
            return {"error": f"La dirección de correo no es válida: {e}"}

    with get_conn() as conn:
        # Usamos dict_row para poder acceder a los datos por nombre de columna
        with conn.cursor(row_factory=psycopg.rows.dict_row) as cursor:
            # 1. Buscar formulario en progreso
            cursor.execute(
                "SELECT * FROM formularios WHERE user_id = %s AND status = 'in_progress' ORDER BY id DESC LIMIT 1",
                (user_id,)
            )
            form_actual = cursor.fetchone()

            if not form_actual:
                # 2. Crear formulario si no existe
                query = f"INSERT INTO formularios (user_id, {campo}, status) VALUES (%s, %s, 'in_progress') RETURNING *"
                cursor.execute(query, (user_id, valor))
                form_actual = cursor.fetchone()
            else:
                # 3. Actualizar formulario existente
                query = f"UPDATE formularios SET {campo} = %s WHERE id = %s RETURNING *"
                cursor.execute(query, (valor, form_actual['id']))
                form_actual = cursor.fetchone()

            # 4. Verificar si el formulario está completo
            datos_actuales = {c: form_actual.get(c) for c in CAMPOS}
            completado = all(datos_actuales.values())

            if completado:
                cursor.execute("UPDATE formularios SET status = 'completed' WHERE id = %s", (form_actual['id'],))
                return {
                    "mensaje": "Formulario completo ✅ Datos guardados. ¿Deseas ver tu resumen?",
                    "formulario_completo": True,
                    "datos": datos_actuales
                }
            else:
                # Devolver el siguiente campo que falta
                for c in CAMPOS:
                    if not datos_actuales.get(c):
                        return {
                            "mensaje": f"{c.replace('_', ' ').capitalize()}:",
                            "formulario_completo": False
                        }

def obtener_formulario_guardado(user_id):
    """Obtiene el último formulario guardado de un usuario desde la base de datos."""
    with get_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT nombre_completo, correo, documento, telefono, programa, semestre
                FROM formularios
                WHERE user_id = %s
                ORDER BY id DESC
                LIMIT 1
            """, (user_id,))
            row = cursor.fetchone()

            if not row:
                return {"mensaje": "No hay formulario guardado para este usuario."}

            datos = {
                "nombre_completo": row[0],
                "correo": row[1],
                "documento": row[2],
                "telefono": row[3],
                "programa": row[4],
                "semestre": row[5]
            }
            return {
                "mensaje": "Formulario recuperado con éxito.",
                "datos": datos
            }

def actualizar_campo_formulario_guardado(user_id, campo, nuevo_valor):
    """Actualiza un campo específico del último formulario guardado de un usuario."""
    if campo not in CAMPOS:
        return {"error": f"El campo '{campo}' no es válido."}

    try:
        with get_conn() as conn:
            with conn.cursor() as cursor:
                # Construcción segura de la consulta. El nombre de la columna está validado
                # con la lista blanca 'CAMPOS', y el valor se pasa como parámetro.
                query = f"""UPDATE formularios SET {campo} = %s
                           WHERE id = (SELECT id FROM formularios WHERE user_id = %s ORDER BY id DESC LIMIT 1)"""
                cursor.execute(query, (nuevo_valor, user_id))
                return {"mensaje": f"Campo '{campo}' actualizado correctamente ✅"}
    except Exception as e:
        return {"error": f"Error al actualizar el formulario: {e}"}
