import { useState, useEffect } from 'react'
import './App.css'
import StudentList from './StudentList'
import StudentForm from './StudentForm'
function App() {
  const [students, setStudents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState({})
  useEffect(() => {
    fetchStudents()
  }, []);
  const fetchStudents = async () => {
    const response = await fetch("http://192.168.101.247:5000/students")
    const data = await response.json()
    setStudents(data.students);
  };
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentStudent({})
  }
  const openCreateModal = () => {
    if(!isModalOpen) setIsModalOpen(true)
  }
  const openEditModal = (student) =>{
    if (isModalOpen) return 
    setCurrentStudent(student)
    setIsModalOpen(true)
  }
  const onUpdate = () =>{
    closeModal()
    fetchStudents()
  }
  return (
    <>
      <StudentList students={students} updateStudent={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Create New Student</button>
      {
        isModalOpen && <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <StudentForm existingStudent={currentStudent} updateCallback={onUpdate} ></StudentForm>
          </div>
        </div>
      }
    </>
  )
}

export default App;
