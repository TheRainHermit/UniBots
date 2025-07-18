import json
from database.connection import get_conn

def cargar_materias_desde_json():
    try:
        with get_conn() as conn:
            with conn.cursor() as cursor:
                print("Limpiando la tabla de materias...")
                cursor.execute("TRUNCATE TABLE materias RESTART IDENTITY;")

                with open('data/materias.json', 'r', encoding='utf-8') as file:
                    materias = json.load(file)

                print(f"Insertando {len(materias)} materias...")
                for m in materias:
                    cursor.execute("""
                        INSERT INTO materias (
                            codigo, nombre, grupo, cupo, inscritos,
                            docente, aula, horario, programa, pensum, sede, periodo
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (
                        m.get('codigo'), m.get('nombre'), m.get('grupo'), m.get('cupo'), m.get('inscritos'),
                        m.get('docente'), m.get('aula'), m.get('horario'), m.get('programa'),
                        m.get('pensum'), m.get('sede'), m.get('periodo')
                    ))
        print("✅ Materias insertadas correctamente.")
    except FileNotFoundError:
        print("❌ Error: No se encontró el archivo 'data/materias_usc.json'.")
    except Exception as e:
        print(f"❌ Ocurrió un error: {e}")

if __name__ == '__main__':
    cargar_materias_desde_json()
