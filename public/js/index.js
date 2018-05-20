const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createSession', {
    to: 'adithya@example.com',
    text: 'Hey. This is Adithya.',
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('status', (stats) => {
  console.log('Status: ', stats);
});
