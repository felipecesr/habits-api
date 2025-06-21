await prisma.conversation.findFirst({
  where: {
    contact: { whatsappNumber: "+5511999999999" }, // from
    user: { whatsappNumber: "+5547988887777" },    // to
  },
})
