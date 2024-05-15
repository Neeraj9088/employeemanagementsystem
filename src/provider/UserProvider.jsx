import { useState } from "react"
import { UserContext } from "../context/UserContext"
import Users from "../Users"

export const UserProvider = ({children}) => {

    const [users,setUsers] = useState([
    // {
    //    name:"John",
    //    age:25,
    // },
    ]);
    
    let addUser = (user) =>{
        setUsers([...users,user])
    }

    let deleteUser = (id) =>{
        setUsers(users.filter((user) => user.id !== id))
    }

    let updateUser = (id,name,age) => {
        const affectedUser = users.map((user) =>{
            if(user.id === id){
                return {...user,name:name,age:age}
            }

            return user
        })
        setUsers(affectedUser)
    }

    return (
        <UserContext.Provider value={{users,addUser,updateUser,deleteUser}}>
            {children}
        </UserContext.Provider>
    )
}