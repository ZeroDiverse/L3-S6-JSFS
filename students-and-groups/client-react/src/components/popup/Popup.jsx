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
        <div className={`notification ${props.color} container`} style={{maxWidth: '100%', minWidth: '28rem', position: 'fixed', top: '8rem', left: '50%', transform: 'translate(-50%, 0)', margin: '0 1rem'}}>
            <button className="delete"/>
            {props.children}
        </div>,
        el
    )
}

export default PopUpNotification
