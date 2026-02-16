import firebase_admin
from firebase_admin import credentials, firestore

# 1. SETUP: Replace 'service-account.json' with your actual filename
try:
    # Ensure this JSON file is in the same folder as this script!
    cred = credentials.Certificate("service-account.json") 
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("✅ Handshake successful!")
except Exception as e:
    print(f"❌ Error: {e}")

# 2. AI GENERATED TEST FUNCTION
def create_test_doc():
    doc_ref = db.collection('ai_tests').document('first_ping')
    doc_ref.set({
        'status': 'success',
        'message': 'Python is building now!',
        'user': 'kuyaantwon-stacks',
        'timestamp': firestore.SERVER_TIMESTAMP
    })
    print("🚀 Data sent to Firebase!")

if __name__ == "__main__":
    create_test_doc()
