const tableBody = document.querySelector('.table-body')

const createStudentForm = document.querySelector('.create-student')
const firstnameInput = document.querySelector('#firstname')
const lastnameInput = document.querySelector('#lastname')
const studentNumberInput = document.querySelector('#studentNumber')

const createNewStudentRow = async (e) => {
    e.preventDefault()
    const response = await createStudent({
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        studentNumber: studentNumberInput.value
    })
    if (response.status === 201) {
        const createdStudent = await response.json()
        const tr = createTableRow(createdStudent)
        tableBody.appendChild(tr)
        resetInput()
    } else {
        console.log(await response.json())
    }
}


const setupListeners = async () => {
    createStudentForm.addEventListener('submit', createNewStudentRow, true)
    const students = await getStudents()
    students.forEach(student => {
        const tr = createTableRow(student);
        tableBody.appendChild(tr)
    })
}

window.addEventListener('DOMContentLoaded', setupListeners);


// GET
const getStudents = async () => {
    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch(`/students`, requestOptions)
    return await response.json()
}

//CREATE
function createTableRow(student) {
    let tr = document.createElement('tr')
    tr.id = student._id
    let td;
    td = document.createElement('td')
    td.innerText = student.lastname
    tr.appendChild(td)
    td = document.createElement('td')
    td.innerText = student.firstname
    tr.appendChild(td)
    td = document.createElement('td')
    td.innerText = student.studentNumber
    tr.appendChild(td)
    td = document.createElement('td')
    let deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.innerText = 'Delete'
    td.appendChild(deleteButton)
    deleteButton.addEventListener('click', async (e) => {
        const status = await deleteStudent(student._id)
        if (status === 204) {
            tableBody.childNodes.forEach(child => {
                if (child.id === student._id) {
                    tableBody.removeChild(child)
                }
            })
        }
    })
    let updateButton = document.createElement('button')
    updateButton.type = 'button'
    updateButton.innerText = 'Update'
    updateButton.addEventListener('click', async (e) => {
        updateStudentForm(student);
    })
    td.appendChild(updateButton)
    tr.appendChild(td)
    return tr
}

const createStudent = async (student) => {
    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(student)
    };
    return await fetch(`/students`, requestOptions)
}

//UPDATE

const updateTableRow = (student) => {
    tableBody.childNodes.forEach(child => {
        if (child.id === student._id) {
            const updatedRow = createTableRow(student)
            tableBody.replaceChild(updatedRow, child)
        }
    })
}

const updateStudentSubmitAction = async (e, student) => {
    e.preventDefault()
    const response = await updateStudent({
        _id: student._id,
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        studentNumber: studentNumberInput.value
    })
    if (response.status === 200) {
        const createdStudent = await response.json()
        updateTableRow(createdStudent)
        resetInput()
    } else {
        console.log(await response.json())
    }
}

const updateStudentForm = (student) => {
    firstnameInput.value = student.firstname
    lastnameInput.value = student.lastname
    studentNumberInput.value = student.studentNumber
    createStudentForm.removeEventListener('submit', createNewStudentRow, true)
    createStudentForm.addEventListener('submit', async (e) => {
        await updateStudentSubmitAction(e, student)
    })
}

const updateStudent = async (student) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(student)
    };
    return await fetch(`/students`, requestOptions)
}

//DELETE
const deleteStudent = async (studentId) => {
    const requestOptions = {
        method: 'DELETE',
    };
    const response = await fetch(`/students/${studentId}`, requestOptions)
    return response.status
}

const resetInput = () => {
    firstnameInput.value = ''
    lastnameInput.value = ''
    studentNumberInput.value = ''
    createStudentForm.removeEventListener('submit', updateStudentSubmitAction, true)
    createStudentForm.addEventListener('submit', createNewStudentRow, true)
}
