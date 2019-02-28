var users = [
    {userid: 1, username: "Gilbert", password: "password"},
    {userid: 2, username: "Juan", password: "password1"}
];

module.exports = () => {
    return users;
}

module.exports.findUser = (username, password) => {
    return users.find((user) => {
        return user.username === username && user.password === password;
    });
}