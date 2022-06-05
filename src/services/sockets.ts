export const socketsService = (socket: any) => {
  socket.on('new-msg', (data: any) => {
    socket.to(data?.chatId).emit('msg-receive', {
      ...data.payload,
    })
  })

  socket.on('join', (chatId: any) => {
    socket.join(chatId)
  })
}
