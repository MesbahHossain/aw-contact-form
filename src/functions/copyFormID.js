const copyFormID = (formId, setTooltipText) => {
    // return () => {
        navigator.clipboard.writeText(formId).then(() => {
            setTooltipText('Copied!');
            setTimeout(() => {
                setTooltipText('Click to copy');
            }, 3000);
        })
        .catch((err) => {
            console.error('Failed to copy email: ', err);
        });
    // };
};

export default copyFormID;