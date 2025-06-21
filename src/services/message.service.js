const createMessage = async (req, res) => {
  await prisma.message.create({
    data: {
      conversationId: 'convo123',
      senderType: 'user',
      content: 'Olá, tudo bem?',
      delivered: true,
    },
  })
}
