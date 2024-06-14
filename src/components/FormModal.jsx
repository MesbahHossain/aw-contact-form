import React from 'react';

const FormModal = ({ form, onClose }) => {
    if (!form) return null;

    return (
        <div className="modal-overlay">
        <div className="modal">
            <div className='flex justify-between p-5 pb-[10px]'>
                <h2 className='text-xl font-semibold'>{form.name}</h2>
                <button className='close-btn' onClick={onClose}>&times;</button>
            </div>
            <hr />
            <div className='awcf-form-wrapper form-wrapper p-5 pt-[10px]' dangerouslySetInnerHTML={{ __html: form.form }} />
        </div>
        </div>
    );
};

export default FormModal;
