from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os

def generar_pdf_formulario(user_id, datos):
    ruta = f"data/formulario_{user_id}.pdf"
    c = canvas.Canvas(ruta, pagesize=letter)
    c.drawString(100, 750, f"Formulario - Usuario: {user_id}")

    y = 720
    for campo, valor in datos.items():
        c.drawString(100, y, f"{campo.replace('_', ' ').capitalize()}: {valor}")
        y -= 20

    c.save()
    return ruta
