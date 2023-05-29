import React from 'react';
import { BASE_URL } from '../../apiConfig'

const Modal = ({selectedImg}) => {

    return (
        <div className="backdrop">
            <img src="selectedImg" alt="enlarged pic"/>

        </div>
    )

}

export default Modal