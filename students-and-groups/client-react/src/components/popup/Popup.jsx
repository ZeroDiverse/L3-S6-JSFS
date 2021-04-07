import React, {useEffect} from 'react'
import {createPortal} from 'react-dom'

const PopUpNotification = (props) => {
    const mount = document.getElementById("portal");
    const el = document.createElement("div");

    useEffect(() => {
        mount.appendChild(el);
        return () => mount.removeChild(el);
    }, [el, mount]);

    return createPortal(
        <div className="notification is-info container" style={{maxWidth: '100%', position: 'fixed', top: '8rem', left: '0', right: '0', margin: '0 1rem'}}>
            <button className="delete"/>
            {props.children}
        </div>,
        el
    )
}

export default PopUpNotification
