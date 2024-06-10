import React from "react";
const StudentList = ({students, updateStudent, updateCallback}) => {
    const onDelete = async(id) => {
        try{
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://192.168.101.247:5000/delete_student/${id}`, options)
            if (response.status === 200){
                updateCallback()
            }else{
                console.error("Failed to delete")
            }
        } catch (error){
            alert(error)
        }
    }
    return <div>
        <h2>Students List </h2>
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>School</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.fullname}</td>
                        <td>{student.gender}</td>
                        <td>{student.school}</td>
                        <td>
                            <button onClick={() => updateStudent(student)}>Update</button>
                            <button onClick={() => onDelete(student.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}
export default StudentList
