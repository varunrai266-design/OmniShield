from pydantic import BaseModel

class TextScanRequest(BaseModel):
    text: str
    channel: str = "SMS" # Email, SMS, WhatsApp

class TextScanResponse(BaseModel):
    is_fraud: bool
    confidence: float
    threat_type: str
    explanation: str

class UrlScanRequest(BaseModel):
    url: str

class UrlScanResponse(BaseModel):
    is_malicious: bool
    confidence: float
    threat_type: str
    domain_age_days: int
    explanation: str
