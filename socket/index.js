const { Server } = require('socket.io');
const PORT = process.env.PORT || 8900;
const io = new Server({
    cors: {
        origin: ['http://localhost:3000', 'https://tiktok-lekhanh.web.app'],
    },
});

let users = [];

const addUser = (userID, socketID) => {
    !users.some((user) => user.userID === userID) &&
        users.push({ userID, socketID });
};

const removeUser = (socketID) => {
    users = users.filter((user) => user.socketID !== socketID);
};

const getUser = (userID) => {
    return users.find((user) => user.userID === userID);
};

io.on('connection', (socket) => {
    // When connected
    console.log('a user connected');
    // Take userID & socketID
    socket.on('addUser', (userID) => {
        addUser(userID, socket.id);
        io.emit('getUsers', users);
    });

    // When disconnected
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });

    // Send and get message
    socket.on('sendMessage', ({ receiver, ...other }) => {
        const user = getUser(receiver);
        if (user) {
            io.to(user.socketID).emit('getMessage', other);
        }
    });

    // Send and get notifications
    socket.on('sendNotification', (data) => {
        const user = getUser(data.receiver);
        const isNotOwn = data.receiver !== data.sender._id;

        if (user && isNotOwn) {
            io.to(user.socketID).emit('getNotification', data);
        }
    });
});

io.listen(PORT);
