from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import TextScanRequest, TextScanResponse, UrlScanRequest, UrlScanResponse
from db import db
import logging
app = FastAPI(title="OmniShield AI API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "OmniShield AI is running"}

@app.post("/scan/text", response_model=TextScanResponse)
def scan_text(req: TextScanRequest):
    # Mock AI response logic to save API credits during dev
    lower_text = req.text.lower()
    if "urgent" in lower_text or "bank account" in lower_text or "click here" in lower_text or "password" in lower_text:
        response = TextScanResponse(
            is_fraud=True, 
            confidence=0.92, 
            threat_type="Phishing / Social Engineering", 
            explanation="The text contains urgent language typical of bank-related scams, encouraging immediate action."
        )
    else:
        response = TextScanResponse(
            is_fraud=False, 
            confidence=0.05, 
            threat_type="None", 
            explanation="The text appears to be standard communication."
        )
        
    if db:
        try:
            db.collection("text_scans").add({
                "request_payload": req.model_dump(),
                "ai_result": response.model_dump()
            })
        except Exception as e:
            logging.error(f"Failed to save to Firestore: {e}")

    return response

@app.post("/scan/url", response_model=UrlScanResponse)
def scan_url(req: UrlScanRequest):
    lower_url = req.url.lower()
    if "free" in lower_url or "claim" in lower_url or "bit.ly" in lower_url or "login" in lower_url:
        response = UrlScanResponse(
            is_malicious=True,
            confidence=0.88,
            threat_type="Suspicious Domain / Phishing Link",
            domain_age_days=12,
            explanation="The domain is highly suspicious, recently registered, and uses naming patterns common in phishing."
        )
    else:
        response = UrlScanResponse(
            is_malicious=False,
            confidence=0.1,
            threat_type="None",
            domain_age_days=1500,
            explanation="The domain appears legitimate and has no known fraud reports."
        )
        
    if db:
        try:
            db.collection("url_scans").add({
                "request_payload": req.model_dump(),
                "ai_result": response.model_dump()
            })
        except Exception as e:
            logging.error(f"Failed to save to Firestore: {e}")

    return response
