sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant WhatsAppAPI
    participant Webhook
    participant Database

    Note over User: Envia uma nova mensagem

    User ->> Frontend: Digita e envia mensagem
    Frontend ->> Backend: POST /conversations/:id/messages
    Backend ->> WhatsAppAPI: Envia via API WhatsApp
    WhatsAppAPI -->> Backend: Confirmação de envio
    Backend ->> Database: Salva mensagem (sender: user)
    Backend -->> Frontend: Mensagem enviada

    Note over User: Abre conversa e escuta mensagens em tempo real

    Frontend ->> Backend: GET /conversations/:id/stream (SSE)
    Backend -->> Frontend: Mantém conexão aberta

    Note over WhatsAppAPI: Contato responde

    WhatsAppAPI ->> Webhook: POST /webhook (from, to, message)
    Webhook ->> Backend: Processa mensagem recebida
    Backend ->> Database: Localiza e salva mensagem (sender: contact)
    Backend -->> Frontend: Envia evento SSE com nova mensagem
