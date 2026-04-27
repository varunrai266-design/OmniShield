document.addEventListener('DOMContentLoaded', () => {
    const navText = document.getElementById('nav-text');
    const navUrl = document.getElementById('nav-url');
    const scannerTitle = document.getElementById('scanner-title');
    const scannerDesc = document.getElementById('scanner-desc');
    const scanInput = document.getElementById('scan-input');
    const scanBtn = document.getElementById('scan-btn');
    const btnText = document.querySelector('.btn-text');
    const loader = document.querySelector('.loader');
    
    const resultsPanel = document.getElementById('results-panel');
    const threatBadge = document.getElementById('threat-badge');
    const confidenceScore = document.getElementById('confidence-score');
    const threatType = document.getElementById('threat-type');
    const aiExplanation = document.getElementById('ai-explanation');

    let currentMode = 'text'; // 'text' or 'url'

    navText.addEventListener('click', () => {
        currentMode = 'text';
        navText.classList.add('active');
        navUrl.classList.remove('active');
        scannerTitle.innerText = 'Analyze Text Communications';
        scannerDesc.innerText = 'Check if a message is safe before you reply.';
        scanInput.placeholder = 'Paste the SMS, WhatsApp message, or Email here...';
        resultsPanel.classList.add('hidden');
        scanInput.value = '';
    });

    navUrl.addEventListener('click', () => {
        currentMode = 'url';
        navUrl.classList.add('active');
        navText.classList.remove('active');
        scannerTitle.innerText = 'Analyze Links & URLs';
        scannerDesc.innerText = 'Check if a website link is safe before you click it.';
        scanInput.placeholder = 'Paste the link here (e.g., https://example.com)';
        resultsPanel.classList.add('hidden');
        scanInput.value = '';
    });

    scanBtn.addEventListener('click', async () => {
        const payload = scanInput.value.trim();
        if(!payload) return alert('Please enter something to scan!');

        // UI Loading state
        btnText.innerText = 'Running AI Analysis...';
        loader.classList.remove('hidden');
        scanBtn.style.opacity = '0.8';
        resultsPanel.classList.add('hidden');

        try {
            let result;
            if(currentMode === 'text') {
                const response = await fetch('http://127.0.0.1:8000/scan/text', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: payload, channel: 'SMS' })
                });
                if (!response.ok) throw new Error('Network response was not ok');
                result = await response.json();
            } else {
                const response = await fetch('http://127.0.0.1:8000/scan/url', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: payload })
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const urlResult = await response.json();
                result = {
                    is_fraud: urlResult.is_malicious,
                    confidence: urlResult.confidence,
                    threat_type: urlResult.threat_type,
                    explanation: urlResult.explanation
                };
            }

            // Update UI with results
            threatBadge.innerText = result.is_fraud ? 'CRITICAL THREAT' : 'SAFE / NORMAL';
            threatBadge.className = `badge ${result.is_fraud ? 'danger' : 'safe'}`;
            
            confidenceScore.innerText = `${Math.round(result.confidence * 100)}%`;
            confidenceScore.style.color = result.is_fraud ? 'var(--danger)' : 'var(--success)';
            
            threatType.innerText = result.threat_type;
            aiExplanation.innerText = result.explanation;
            
            resultsPanel.classList.remove('hidden');

        } catch (error) {
            console.error('API Error:', error);
            alert('Failed to connect to OmniShield backend. Please ensure the FastAPI server is running.');
        } finally {
            // Restore UI
            btnText.innerText = 'Run Security Scan';
            loader.classList.add('hidden');
            scanBtn.style.opacity = '1';
        }
    });
});
