from database.connection import get_conn

def obtener_materias_por_programa(programa):
    """Obtiene todas las materias de un programa, manejando la conexión de forma segura."""
    with get_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT codigo, nombre, grupo, docente, horario, aula, cupo, inscritos
                FROM materias
                WHERE programa ILIKE %s
            """, (f"%{programa}%",))
            
            # Usamos una comprensión de listas para un código más conciso
            materias = [
                {
                    "codigo": row[0], "nombre": row[1], "grupo": row[2],
                    "docente": row[3], "horario": row[4], "aula": row[5],
                    "cupo": row[6], "inscritos": row[7]
                }
                for row in cursor.fetchall()
            ]
            return materias

def obtener_materias_con_cupo(programa):
    """Obtiene materias con cupo disponible, manejando la conexión de forma segura."""
    with get_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT codigo, nombre, grupo, docente, horario, aula, cupo, inscritos
                FROM materias
                WHERE programa ILIKE %s AND inscritos < cupo
            """, (f"%{programa}%",))
            
            materias = [
                {
                    "codigo": row[0], "nombre": row[1], "grupo": row[2],
                    "docente": row[3], "horario": row[4], "aula": row[5],
                    "cupo": row[6], "inscritos": row[7]
                }
                for row in cursor.fetchall()
            ]
            return materias
