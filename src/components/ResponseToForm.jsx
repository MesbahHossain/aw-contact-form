import React from 'react';
import { useSelect } from '@wordpress/data';
import store from '../store/store';

const ResponseToForm = () => {
    const dataResponse = useSelect((select) => {
        return select(store).getResponse().response;
    });
    const parsedResult = JSON.parse(dataResponse);
    
    const formElements = parsedResult.formElements?.map(element => {
        if (element.type === 'text' || element.type === 'email' || element.type === 'tel') {
            return (
                <div>
                    <label>{element.title + (element.required ? " *" : "")}</label>
                    <input
                        type={element.type}
                        placeholder={element.placeHolder}
                        required={element.required}
                    />
                </div>
            );
        }
        return null;
    });

    return (
        <>
        <h3 className="font-bold mb-5">{parsedResult.formName}</h3>
        <div className="form-wrapper flex flex-col gap-5">
            {formElements}
        </div>
        </>
    )
}

export default ResponseToForm;