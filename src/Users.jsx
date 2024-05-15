import React, { useContext, useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container,Form,Button,Table } from 'react-bootstrap'
import { UserContext } from './context/UserContext'

function Users() {

    let {users,addUser,deleteUser,updateUser} = useContext(UserContext);

    const [update,setUpdate] = useState(false);

    const [currentId,setCurrentId] = useState(null)
    const [currentName,setCurrentName] = useState(null)
    const [currentAge,setCurrentAge] = useState(null)

    let [name,setName] = useState(null);
    let [age,setAge] = useState(null);
    let nameRef = useRef(null);
    let ageRef = useRef(null);

    let handleUsers = (e) => {
        e.preventDefault()

        let id = Date.now()
        let user ={
            id,
            name,
            age
        }
        addUser(user)
        nameRef.current.value = ""
        ageRef.current.value = ""
    };

    let handleEdit = (user) =>{
        setUpdate(true)
        setCurrentId(user.id)
        setCurrentName(user.name)
        setCurrentAge(user.age)
        nameRef.current.value = user.name
        ageRef.current.value = user.age
    };

    let handleUpdate = (e) =>{
        e.preventDefault()

        updateUser(currentId,currentName,currentAge)
        setCurrentId(null)
        setCurrentAge(null)
        setCurrentName(null)
        setName(null)
        setAge(null)
        setUpdate(false)

        nameRef.current.value = ""
        ageRef.current.value = ""
    }

  return (
    <Container>
        <h1 className='text-center'>Employee Management System</h1>

        {update ? (
            <Form onSubmit={handleUpdate}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='text' 
                onChange={(e) => setCurrentName(e.target.value)}
                ref={nameRef} placeholder='Enter employee name' required
                />

                <Form.Label>Id</Form.Label>
                <Form.Control
                type='number'
                onChange={(e) => setCurrentAge(e.target.value)} 
                ref={ageRef} placeholder='Enter employee id' required
                />
                <br/>
                <Button type="submit">
                    Update User
                </Button>
            </Form.Group>
            </Form>
        ):(
        <Form onSubmit={handleUsers}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='text' 
                onChange={(e) => setName(e.target.value)}
                ref={nameRef} placeholder='Enter employee name' required
                />

                <Form.Label>Id</Form.Label>
                <Form.Control
                type='number'
                onChange={(e) => setAge(e.target.value)} 
                ref={ageRef} placeholder='Enter employee id' required
                />
                <br/>
                <Button type="submit">
                    Add User
                </Button>
            </Form.Group>
        </Form>
        )}

        
        <Table striped bordered hover>
           <thead>
                <tr>
                    <th>Name</th>
                    <th>Id</th>
                    <th>Edit User</th>
                    <th>Delete User</th>
                </tr>
           </thead>
            <tbody>
                {users && users.map((u)=>(
                    <tr>
                        <td>{u.name}</td>
                        <td>{u.age}</td>
                        <td>
                            <Button onClick={() => handleEdit(u)}>Edit User</Button>
                        </td>
                        <td>
                            <Button onClick={()=> deleteUser(u.id)}>Delete User</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Container>
  )
}

export default Users