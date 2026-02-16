import os
import time
import firebase_admin
from firebase_admin import credentials, firestore
from fpdf import FPDF

# --- THE HANDSHAKE ---
current_dir = os.path.dirname(os.path.abspath(__file__))
key_path = os.path.join(current_dir, "service-account.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(key_path)
    firebase_admin.initialize_app(cred)

db = firestore.client()

# --- THE DESIGNER (Google-Grade Aesthetics) ---
def generate_boardroom_report(data, doc_id):
    print(f"🎨 Designing Publication for: {doc_id}...")
    
    pdf = FPDF()
    pdf.add_page()
    
    # 1. Branding Header
    pdf.set_fill_color(0, 51, 102) # Executive Blue
    pdf.rect(0, 0, 210, 40, 'F')
    pdf.set_font("helvetica", "B", 24)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(0, 20, "EXECUTIVE INTELLIGENCE", ln=True, align='C')
    
    # 2. Body Text
    pdf.ln(30)
    pdf.set_text_color(0, 0, 0)
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, f"Concept Brief: {data.get('title', 'Market Analysis')}", ln=True)
    
    pdf.ln(5)
    pdf.set_font("helvetica", size=11)
    # This pulls the actual text you type into the website
    description = data.get("description", "No brief provided.")
    pdf.multi_cell(0, 8, txt=description)
    
    # 3. Save to Desktop
    output_path = os.path.expanduser(f"~/Desktop/PDF-Builder/Executive_Brief_{doc_id}.pdf")
    pdf.output(output_path)
    print(f"🚀 Report Delivered: {output_path}")

# --- THE LISTENER ---
def start_engine():
    print("👀 Executive Engine is LIVE and listening for website clicks...")
    
    # This loop watches your 'pdf_requests' collection every 5 seconds
    while True:
        docs = db.collection("pdf_requests").where("status", "==", "pending").stream()
        for doc in docs:
            generate_boardroom_report(doc.to_dict(), doc.id)
            doc.reference.update({"status": "completed"}) # Mark as done
        time.sleep(5)

if __name__ == "__main__":
    start_engine()
