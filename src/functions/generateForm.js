const generateForm = (parsedResult) => {
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
    return formElements;
}

export default generateForm;