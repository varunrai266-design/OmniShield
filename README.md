# OmniShield AI

OmniShield AI is an advanced threat detection application designed to safeguard users against phishing, social engineering, and malicious links. It provides an intuitive interface to scan SMS messages, emails, and URLs, returning a comprehensive analysis including threat category, confidence score, and a clear explanation.

## Features

*   **Text & SMS Scanner**: Analyzes text communications (SMS, WhatsApp, Emails) for signs of phishing and social engineering like urgent language or suspicious requests.
*   **URL & Link Scanner**: Evaluates URLs to flag potential malicious domains or phishing links, considering factors like domain age.
*   **Clear Insights**: Provides a confidence score, threat categorization (e.g., Safe, Critical Threat), and an AI-generated explanation for the verdict.
*   **History Logging**: (Optional) Analyzes are saved to a Firestore database for record-keeping and further review.

## Tech Stack

*   **Backend**: Python, FastAPI
*   **Frontend**: HTML, CSS (Vanilla), JavaScript
*   **Database**: Firebase Firestore (for storing scan logs)

## Project Structure

```
omnishield/
├── backend/
│   ├── main.py       # FastAPI application and endpoints
│   ├── models.py     # Pydantic models for request/response validation
│   └── db.py         # Firestore database connection (assumed)
└── frontend/
    ├── index.html    # Main UI
    ├── styles.css    # Styling for the application (Glassmorphism UI)
    └── app.js        # Frontend logic and API integration
```

## Getting Started

### Prerequisites

*   Python 3.8+
*   FastAPI & Uvicorn
*   Firebase Admin SDK (if using Firestore logging)

### Installation & Setup

1.  **Clone the repository** (or navigate to the project directory):
    ```bash
    cd omnishield/backend
    ```

2.  **Install backend dependencies**:
    ```bash
    pip install fastapi uvicorn pydantic firebase-admin
    ```
    *(Note: Ensure you have `db.py` configured correctly with your Firebase service account credentials if you want to use the database logging feature.)*

3.  **Run the FastAPI backend**:
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://127.0.0.1:8000`.

4.  **Run the Frontend**:
    Simply open `frontend/index.html` in your web browser. Or, you can serve it using a simple HTTP server:
    ```bash
    cd ../frontend
    python -m http.server 8080
    ```
    Then visit `http://localhost:8080` in your browser.

## API Endpoints

*   `GET /`: Health check endpoint.
*   `POST /scan/text`: Accepts `{"text": "...", "channel": "SMS"}` and returns text threat analysis.
*   `POST /scan/url`: Accepts `{"url": "..."}` and returns URL threat analysis.

## Disclaimer

The current backend implementation contains mock AI response logic to save API credits during development. It uses keyword matching (e.g., "urgent", "bank account", "free", "claim") to determine threat levels. For a production environment, this should be replaced with a real ML model or third-party AI integration.


<img width="1875" height="859" alt="image" src="https://github.com/user-attachments/assets/aea5475b-79f8-43a4-b6f9-4cd2cd07fc9e" />

