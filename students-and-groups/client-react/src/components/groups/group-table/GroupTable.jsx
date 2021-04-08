import React, { useEffect, useState } from 'react';
import axios from '../../../api/server';
import PopUpNotification from '../../popup/Popup';

const GroupTable = ({ groupNumber }) => {
  const [students, setStudents] = useState([]);
  const groupNumbers = [1, 2, 3, 4, 5, 6];
  const [actionDescriptionText, setActionDescriptionText] = useState('');

  const setStudentToGroupNumber = async (student, groupNumber) => {
    try {
      const response = await axios.post(
        `/groups/${groupNumber}/students/${student._id}`
      );
      if (response.status === 201) {
        setStudents(students.filter((s) => s._id !== student._id));
        setActionDescriptionText(
          `Student ${student.firstname} ${student.lastname} with student number: ${student.studentNumber} ASSIGNED to group ${groupNumber}`
        );
        setTimeout(() => {
          setActionDescriptionText('');
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const unAssignStudentFromGroup = async (student) => {
    try {
      const response = await axios.patch(`/groups/students/${student._id}`);
      if (response.status === 200) {
        setStudents(students.filter((s) => s._id !== student._id));
        setActionDescriptionText(
          `Student ${student.firstname} ${student.lastname} with student number: ${student.studentNumber} REMOVED from group ${groupNumber}`
        );
        setTimeout(() => {
          setActionDescriptionText('');
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setStudents([]);
    if (groupNumber === 0) {
      axios
        .get('/groups/students')
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          console.log(data);
          setStudents(data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios
        .get(`/groups/${groupNumber}/students`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          console.log(data);
          setStudents(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [groupNumber]);

  return (
    <>
      {actionDescriptionText && (
        <PopUpNotification>
          <div>{actionDescriptionText}</div>
        </PopUpNotification>
      )}
      <table className='table mt-4'>
        <thead>
          <tr>
            <th>Lastname</th>
            <th>Firstname</th>
            <th>Student Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <th>{student.lastname}</th>
              <th>{student.firstname}</th>
              <th>{student.studentNumber}</th>
              {groupNumber === 0 ? (
                <th>
                  {groupNumbers.map((groupNumber) => (
                    <button
                      className='button'
                      key={groupNumber}
                      style={{ borderRadius: '50%', marginRight: '1rem' }}
                      onClick={() => {
                        setStudentToGroupNumber(student, groupNumber);
                      }}
                    >
                      <span className='icon is-small'>{groupNumber}</span>
                    </button>
                  ))}
                </th>
              ) : (
                <th>
                  <button
                    className='button is-danger'
                    onClick={() => unAssignStudentFromGroup(student)}
                  >
                    <span className='icon is-small'>
                      <i className='fas fa-times-circle' />
                    </span>
                  </button>
                </th>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GroupTable;
