🧱 Setup inicial
ts
Copiar
// src/prisma.ts
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
1️⃣ Criar um contato (POST /contacts)
ts
Copiar
// POST /contacts
app.post('/contacts', async (req, res) => {
  const { name, whatsappNumber } = req.body
  const contact = await prisma.contact.create({
    data: { name, whatsappNumber }
  })
  res.json(contact)
})
2️⃣ Iniciar uma conversa (POST /conversations)
ts
Copiar
// POST /conversations
app.post('/conversations', async (req, res) => {
  const { userId, contactId } = req.body

  // Evita duplicar conversas
  const existing = await prisma.conversation.findFirst({
    where: { userId, contactId },
  })

  if (existing) return res.json(existing)

  const conversation = await prisma.conversation.create({
    data: { userId, contactId }
  })

  res.json(conversation)
})
3️⃣ Enviar mensagem (POST /conversations/:id/messages)
ts
Copiar
// POST /conversations/:id/messages
app.post('/conversations/:id/messages', async (req, res) => {
  const { content } = req.body
  const conversationId = req.params.id

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderType: 'user',
      content,
      delivered: true // supondo que a API do WhatsApp confirmou
    }
  })

  res.status(201).json(message)
})
4️⃣ Receber mensagem via webhook (POST /webhooks/whatsapp)
ts
Copiar
// POST /webhooks/whatsapp
app.post('/webhooks/whatsapp', async (req, res) => {
  const { from, to, message } = req.body

  const conversation = await prisma.conversation.findFirst({
    where: {
      contact: { whatsappNumber: from },
      user: { whatsappNumber: to }
    }
  })

  if (!conversation) return res.status(404).json({ error: 'Conversation not found' })

  const created = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderType: 'contact',
      content: message,
      delivered: true
    }
  })

  res.status(200).json(created)
})
5️⃣ Listar mensagens da conversa (GET /conversations/:id/messages)
ts
Copiar
// GET /conversations/:id/messages
app.get('/conversations/:id/messages', async (req, res) => {
  const conversationId = req.params.id

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { sentAt: 'asc' }
  })

  res.json(messages)
})
🧪 Autenticação
Para proteger os endpoints, você pode usar um middleware que extrai o userId do JWT e injeta no req.user, e usar isso em cada endpoint para filtrar os dados.
