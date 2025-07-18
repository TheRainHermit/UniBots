import psycopg
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el .env
load_dotenv()

DB_HOST = os.getenv("PG_HOST")
DB_NAME = os.getenv("PG_NAME")
DB_USER = os.getenv("PG_USER")
DB_PASS = os.getenv("PG_PASS")
DB_PORT = os.getenv("PG_PORT", "5432")

def get_conn():
    """
    Establece y devuelve una NUEVA conexión a la base de datos.
    Es responsabilidad del que llama cerrar esta conexión.
    El uso ideal es dentro de un bloque 'with', que la cierra automáticamente.
    """
    try:
        return psycopg.connect(
            host=DB_HOST,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            port=DB_PORT
        )
    except psycopg.OperationalError as e:
        print(f"❌ Error fatal al conectar a PostgreSQL: {e}")
        # Lanzamos la excepción para que la aplicación principal sepa que no puede continuar.
        raise

def create_tables(conn):
    """Crea las tablas si no existen, usando una conexión proporcionada."""
    with conn.cursor() as cur:
        try:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS materias (
                    id SERIAL PRIMARY KEY,
                    codigo VARCHAR(20),
                    nombre TEXT,
                    grupo VARCHAR(20),
                    cupo INTEGER,
                    inscritos INTEGER,
                    docente TEXT,
                    aula TEXT,
                    horario TEXT,
                    programa TEXT,
                    pensum TEXT,
                    sede TEXT,
                    periodo TEXT
                );
            """)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS formularios (
                    id SERIAL PRIMARY KEY,
                    user_id VARCHAR(100),
                    nombre_completo TEXT,
                    correo TEXT,
                    documento TEXT,
                    telefono TEXT,
                    programa TEXT,
                semestre TEXT,
                status VARCHAR(20) DEFAULT 'in_progress' NOT NULL
                );
            """)
            print("📦 Tablas 'materias' y 'formularios' listas.")
        except Exception as e:
            print(f"❌ Error al crear las tablas: {e}")
            raise

def init_db():
    """Inicializa la base de datos: verifica la conexión y crea las tablas."""
    try:
        # Usamos 'with' para asegurar que la conexión se cierre al final
        with get_conn() as conn:
            print("✅ Conexión a PostgreSQL exitosa para inicialización.")
            create_tables(conn)
    except Exception as e:
        print(f"❌ Error al inicializar la base de datos: {e}")
        # Si la BD no está disponible, es mejor detener la aplicación.
        exit("La aplicación no puede iniciar sin una conexión a la base de datos.")
