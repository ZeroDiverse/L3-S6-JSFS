import React, {useEffect, useState} from 'react'
import axios from '../../api/server'
import PopUpNotification from "../popup/Popup";

const Students = () => {

    const [students, setStudents] = useState([])
    const [buttonText, setButtonText] = useState('Create')
    const [student, setStudent] = useState({
        _id: null,
        firstname: '',
        lastname: '',
        studentNumber: ''
    })
    const [isStudentNumberFieldDisable, setIsStudentNumberFieldDisable] = useState(false)
    const [actionDescriptionText, setActionDescriptionText] = useState('')

    useEffect(() => {
        axios.get('/students')
            .then((res) => {
                return res.data
            })
            .then(data => {
                setStudents(data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    const startUpdateProcess = (student) => {
        setButtonText('Update')
        setStudent({
            _id: student._id,
            lastname: student.lastname,
            firstname: student.firstname,
            studentNumber: student.studentNumber
        })
        setIsStudentNumberFieldDisable(true)
    }

    const resetCurrentStudent = () => {
        setStudent({
            _id: null,
            firstname: '',
            lastname: '',
            studentNumber: ''
        })
    }

    const createOrUpdateStudent = async (e) => {
        e.preventDefault()
        if (buttonText === 'Create') {
            try {
                const response = await axios.post('/students', {
                    firstname: student.firstname,
                    lastname: student.lastname,
                    studentNumber: student.studentNumber
                })
                if (response.status === 201) {
                    const tempStudents = [...students, response.data]
                    setStudents(tempStudents)
                    resetCurrentStudent()
                    setActionDescriptionText(`Student ${response.data.firstname} ${response.data.lastname} with student number: ${response.data.studentNumber} CREATED`)
                    setTimeout(() => {
                        setActionDescriptionText('')
                    }, 2000)
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                const response = await axios.patch('/students', {
                    _id: student._id,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    studentNumber: student.studentNumber
                })
                if (response.status === 200) {
                    const index = students.findIndex(item => item._id === response.data._id);
                    const tempStudents = [
                        ...students.slice(0, index),
                        {
                            _id: response.data._id,
                            lastname: response.data.lastname,
                            firstname: response.data.firstname,
                            studentNumber: student.studentNumber
                        },
                        ...students.slice(index + 1, students.length)
                    ]
                    setStudents(tempStudents)
                    resetCurrentStudent()
                    setButtonText('Create')
                    setActionDescriptionText(`Student ${response.data.firstname} ${response.data.lastname} with student number: ${response.data.studentNumber} UPDATED`)
                    setTimeout(() => {
                        setActionDescriptionText('')
                    }, 2000)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    const deleteStudent = async (student) => {
        try {
            const response = await axios.delete(`/students/${student._id}`)
            if (response.status === 204) {
                setStudents(students.filter(s => s._id !== student._id))
                setActionDescriptionText(`Student ${student.firstname} ${student.lastname} with student number: ${student.studentNumber} DELETED`)
                setTimeout(() => {
                    setActionDescriptionText('')
                }, 2000)
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            {
                actionDescriptionText && (
                    <PopUpNotification>
                        <div>
                            {actionDescriptionText}
                        </div>
                    </PopUpNotification>
                )
            }
            <form className="columns box" onSubmit={createOrUpdateStudent}>
                <div className="column">
                    <label className="label">Lastname</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Routier" value={student.lastname}
                               required
                               onChange={(e) => {
                                   setStudent(Object.assign({}, student, {lastname: e.target.value}))
                               }}/>
                    </div>
                </div>

                <div className="column">
                    <label className="label">Firstname</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Mr. Jean Christophe"
                               value={student.firstname}
                               required
                               onChange={(e) => {
                                   setStudent(Object.assign({}, student, {firstname: e.target.value}))
                               }}/>
                    </div>
                </div>

                <div className="column">
                    <label className="label">Student Number</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="1234567890 A" value={student.studentNumber}
                               disabled={isStudentNumberFieldDisable}
                               required
                               onChange={(e) => {
                                   setStudent(Object.assign({}, student, {studentNumber: e.target.value}))
                               }}/>
                    </div>
                </div>
                <div className={'column'}>
                    <label className="label" style={{visibility: 'hidden'}}>Email</label>
                    <div className="control" style={{display: "flex", justifyContent: 'center'}}>
                        <button className="button is-primary" type={'submit'} style={{width: '100%'}}>{buttonText}</button>
                    </div>
                </div>

            </form>
            <table className="table mt-4" style={{overflowX: 'scroll'}}>
                <thead>
                <tr>
                    <th>
                        Lastname
                    </th>
                    <th>
                        Firstname
                    </th>
                    <th>
                        Student Number
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    students.map(student => (
                        <tr key={student._id}>
                            <th>
                                {student.lastname}
                            </th>
                            <th>
                                {student.firstname}
                            </th>
                            <th>
                                {student.studentNumber}
                            </th>
                            <th style={{display: 'flex'}}>
                                <button  style={{width: '100%'}} className="button is-info" onClick={() => startUpdateProcess(student)}>Update
                                </button>
                                <button style={{width: '100%'}} className="button is-danger ml-3"
                                        onClick={() => deleteStudent(student)}>Delete
                                </button>
                            </th>
                        </tr>

                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default Students
