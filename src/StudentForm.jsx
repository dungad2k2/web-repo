import { useState } from "react";
const StudentForm = ({existingStudent = {}, updateCallback }) => {
    const [fullname, setFullName] = useState(existingStudent.fullname || "");
    const [gender, setGender] = useState(existingStudent.gender || "");
    const [school, setSchool] = useState(existingStudent.school || "");

    const updating = Object.entries(existingStudent).length !== 0

    const onSubmit = async (e) => {
       e.preventDefault()
       
       const data = {
          fullname,
          gender,
          school
       }
       const url = "http://192.168.101.247:5000/" + (updating ? `update_student/${existingStudent.id}` : "create_student")
       const options = {
         method: updating ? "PATCH" : "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
       }
       const response = await fetch(url, options)
       if (response.status !== 201 && response.status !== 200){
         const data = await response.json()
         alert(data.message)
       }
       else{
          updateCallback()
       }
    }
    return( 
    <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="fullName">Full Name:</label>
            <input 
               type="text" 
               id="fullName" 
               value={fullname} 
               onChange={(e) => setFullName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="gender">Gender:</label>
            <input 
               type="text" 
               id="gender" 
               value={gender} 
               onChange={(e) => setGender(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="school">School:</label>
            <input 
               type="text" 
               id="school" 
               value={school} 
               onChange={(e) => setSchool(e.target.value)}/>
        </div>
        <button type="submit">
            {updating ? "Update" : "Create"}
        </button>
    </form>)
}
export default StudentForm