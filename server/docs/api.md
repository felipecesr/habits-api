## 📘 Visão Geral da API

Principais recursos:

- users: os usuários autenticados do sistema
- contacts: os contatos com número de WhatsApp
- conversations: ligação entre user e contact
- messages: mensagens trocadas em uma conversa

## 🗂️ Endpoints REST

### 🔹 Usuários
> (gerenciados via autenticação, então podem ser omitidos da API pública se necessário)

### 🔹 Contacts

GET    /contacts                      → Lista contatos do usuário
POST   /contacts                      → Cria um novo contato
GET    /contacts/:id                  → Detalhes de um contato
PUT    /contacts/:id                  → Atualiza um contato
DELETE /contacts/:id                  → Remove um contato

### 🔹 Conversations
http
Copiar
GET    /conversations                 → Lista conversas do usuário (ex: sidebar do chat)
POST   /conversations                 → Inicia uma conversa com um contato
GET    /conversations/:id             → Detalhes de uma conversa
DELETE /conversations/:id             → (opcional) Arquiva ou deleta conversa

### 🔹 Messages
http
Copiar
GET    /conversations/:id/messages    → Lista mensagens da conversa (com paginação)
POST   /conversations/:id/messages    → Envia uma nova mensagem
Payload para POST /conversations/:id/messages:

```json
{
  "content": "Olá, tudo bem?"
}
```

### 🔹 Webhook (mensagens recebidas)

```
POST /webhooks/whatsapp               → Recebe mensagens de resposta dos contatos
```
Payload esperado do WhatsApp (exemplo):

```
{
  "whatsapp_number": "+5511999999999",
  "message": "Oi, tudo bem?",
  "timestamp": "2025-06-05T18:15:00Z"
}
```

## 🔐 Autenticação

Todos os endpoints (exceto webhook) devem exigir um Authorization: Bearer <token> no header.

## 📌 Considerações Técnicas

As mensagens devem registrar o sender_type (user ou contact).

O GET /conversations/:id/messages deve permitir ordenação por sent_at e paginação (?page=2&limit=20).

Pode-se adicionar filtros extras no futuro: mensagens não lidas, por palavra-chave, etc.

O webhook precisa localizar a conversation com base no número do contato + usuário associado (isso pode exigir mapeamento inverso do número para o contato).


Se dois usuários diferentes cadastrarem o mesmo número de WhatsApp como contato, o sistema terá duas conversas diferentes com o mesmo número, e o webhook que recebe apenas o número não saberá automaticamente de qual usuário se trata.

🧠 Problema
O WhatsApp Webhook traz só o número do remetente e a mensagem:

```json
{
  "whatsapp_number": "+5511999999999",
  "message": "Oi, tudo bem?"
}
```
Mas não informa para qual usuário essa mensagem deveria ser associada, e isso é um problema se o número estiver associado a mais de um usuário.

✅ Soluções possíveis
✅ 1. Amarrar o número do remetente ao usuário via número do destinatário (melhor abordagem)
A maioria das APIs de WhatsApp (como Twilio, Z-API, 360Dialog etc.) envia no webhook não só o número do remetente (contato), mas também o número do destinatário (nosso número do sistema) — ou seja, o número do WhatsApp do "usuário da nossa aplicação" que recebeu a mensagem.

Exemplo de payload mais completo:
json
Copiar
{
  "from": "+5511999999999",       // número do contato
  "to": "+5547988887777",         // número do nosso sistema (do usuário)
  "message": "Olá, tudo bem?"
}
👉 Com isso, você consegue localizar a conversation correta com:

sql
Copiar
SELECT * FROM conversations
WHERE contact.whatsapp_number = '+5511999999999'
  AND user.whatsapp_number = '+5547988887777'
LIMIT 1;
✅ Essa é a forma ideal e segura de resolver o problema.
