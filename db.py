import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import logging

db = None

try:
    cred_path = os.path.join(os.path.dirname(__file__), "firebase-credentials.json")
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        logging.info("Firebase initialized successfully.")
    else:
        logging.warning("firebase-credentials.json not found! Firebase database uploads will be skipped.")
except Exception as e:
    logging.error(f"Error initializing Firebase: {e}")
