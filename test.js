console.log("first")

const func = ({ userdata }) => ({
    getalluser: () => {
        return [{ name: "user1" }, { name: "user2" }]
    },
    getUserById: (id) => {
        return [{ name: "user1" }, { name: "user2" }].find(user => user.name === id)
    }
})

const newobject = {
    hellothere: func({ name: "user1" })
}

console.log(newobject.hellothere.getUserById("user1"))