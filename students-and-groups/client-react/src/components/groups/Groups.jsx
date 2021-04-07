import React, {useState} from 'react'
import GroupTable from "./group-table/GroupTable";

const Groups = () => {
    const groupNumbers = [0, 1, 2, 3, 4, 5, 6]
    const [groupNumber, setGroupNumber] = useState(0)

    return (
        <div style={{display: 'flex'}}>
            <section className="main-content columns is-fullheight sidebar" style={{minWidth: '15rem', maxWidth: '100%'}}>
                <aside className="column is-narrow-mobile is-fullheight section is-hidden-mobile">
                    <p className="menu-label is-hidden-touch">Group number</p>
                    <ul className="menu-list">
                        {
                            groupNumbers.map(groupNumber => (
                                <li key={groupNumber} onClick={() => setGroupNumber(groupNumber)}>

                                    {
                                        groupNumber === 0 ? (
                                                <a href="#" className=""><span className="icon"><i className="fa fa-user"/></span> No group
                                                </a>
                                            )
                                            :
                                            (
                                                <a href="#" className=""><span className="icon"><i
                                                    className="fa fa-user"/></span> Group {groupNumber}</a>
                                            )
                                    }

                                </li>
                            ))
                        }
                    </ul>
                </aside>
            </section>
            <GroupTable groupNumber={groupNumber}/>
        </div>
    )
}

export default Groups
