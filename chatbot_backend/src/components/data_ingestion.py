# import os
# import PyPDF2
# import chromadb
# import google.generativeai as genai
# from chromadb.utils import embedding_functions

# print("Iniciando el proceso de ingesta de datos...")

# # --- 1. CONFIGURACIÓN ---
# # Directorio donde guardarás los PDFs (manuales, pénsums, etc.)
# DOCS_DIRECTORY = "data/documents"
# # Directorio donde se guardará la base de datos de vectores
# CHROMA_DB_PATH = "db/chroma"
# # Nombre de la colección en la base de datos
# COLLECTION_NAME = "usc_documents"

# # Carga la API Key de Google desde las variables de entorno
# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# if not GOOGLE_API_KEY:
#     raise ValueError("No se ha configurado la GOOGLE_API_KEY en el archivo .env")


# def extract_text_from_pdf(file_path):
#     """Extrae el texto de un archivo PDF."""
#     print(f"  -> Extrayendo texto de: {os.path.basename(file_path)}")
#     with open(file_path, 'rb') as file:
#         reader = PyPDF2.PdfReader(file)
#         text = ""
#         for page in reader.pages:
#             page_text = page.extract_text()
#             if page_text:
#                 text += page_text + "\n"
#     return text

# def split_text_into_chunks(text, chunk_size=1000, chunk_overlap=100):
#     """Divide un texto largo en fragmentos más pequeños con superposición."""
#     if not text:
#         return []
#     chunks = []
#     start = 0
#     while start < len(text):
#         end = start + chunk_size
#         chunks.append(text[start:end])
#         start += chunk_size - chunk_overlap
#     return chunks

# def main():
#     """Función principal para la ingesta de documentos."""
#     # --- 2. INICIALIZAR LA BASE DE DATOS VECTORIAL ---
#     # Usamos PersistentClient para que la base de datos se guarde en disco
#     client = chromadb.PersistentClient(path=CHROMA_DB_PATH)

#     # Usamos la función de embedding de Google directamente
#     google_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(api_key=GOOGLE_API_KEY)

#     # Obtenemos o creamos la colección. Si ya existe, la usaremos.
#     collection = client.get_or_create_collection(
#         name=COLLECTION_NAME,
#         embedding_function=google_ef
#     )

#     # --- 3. PROCESAR Y GUARDAR DOCUMENTOS ---
#     if not os.path.exists(DOCS_DIRECTORY):
#         print(f"❌ El directorio '{DOCS_DIRECTORY}' no existe. Creándolo...")
#         os.makedirs(DOCS_DIRECTORY)
#         print("Por favor, añade tus archivos PDF en esa carpeta y vuelve a ejecutar el script.")
#         return

#     pdf_files = [f for f in os.listdir(DOCS_DIRECTORY) if f.endswith(".pdf")]

#     for pdf_file in pdf_files:
#         file_path = os.path.join(DOCS_DIRECTORY, pdf_file)
        
#         # Extraer y dividir el texto
#         document_text = extract_text_from_pdf(file_path)
#         chunks = split_text_into_chunks(document_text)
        
#         if not chunks:
#             print(f"  -> No se pudo extraer texto de {pdf_file}. Omitiendo.")
#             continue

#         # Crear IDs únicos para cada fragmento
#         ids = [f"{pdf_file}-{i}" for i in range(len(chunks))]
        
#         # Añadir los fragmentos a la colección. ChromaDB se encargará de la vectorización.
#         collection.add(documents=chunks, ids=ids, metadatas=[{"source": pdf_file}] * len(chunks))
#         print(f"✅ {len(chunks)} fragmentos de '{pdf_file}' han sido añadidos a la base de datos.")

#     print("\nProceso de ingesta completado.")
#     print(f"Total de documentos en la colección: {collection.count()}")

# if __name__ == "__main__":
#     main()