redirecciones = {
    "inscripción": "https://sinu.usc.edu.co/inscripcion",
    "matrícula": "https://sinu.usc.edu.co/matricula",
    "pagos": "https://sinu.usc.edu.co/pagos",
    "historial": "https://sinu.usc.edu.co/historial",
    "horarios": "https://sinu.usc.edu.co/horarios",
    "materias": "https://sinu.usc.edu.co/materias"
}

def buscar_url_relacionada(pregunta):
    for clave, url in redirecciones.items():
        if clave in pregunta.lower():
            return url
    return "No encontré una URL relacionada con tu solicitud."
