var UserObj = [];
function User() {
}

User.prototype.registerUser = function (userObj) {
    var isFound = UserObj.findIndex(user => user.email == userObj.email);
    UserObj.push(userObj);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isFound == -1)
                resolve(this.UserObj)
            else
                reject("userFound");

        }, 5000);
    })
}


//module.exports = User; //give @s command_block