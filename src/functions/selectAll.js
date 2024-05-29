const selectAll = () => {
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.rowCheckbox');

    const handleSelectAllChange = () => {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    };

    const handleRowCheckboxChange = (event) => {
        const checkbox = event.target;
        if (!checkbox.checked) {
            selectAllCheckbox.checked = false;
        } else if (Array.from(rowCheckboxes).every(checkbox => checkbox.checked)) {
            selectAllCheckbox.checked = true;
        }
    };

    if (selectAllCheckbox && rowCheckboxes.length > 0) {
        selectAllCheckbox.addEventListener('change', handleSelectAllChange);
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleRowCheckboxChange);
        });
    }

    return () => {
        if (selectAllCheckbox && rowCheckboxes.length > 0) {
            selectAllCheckbox.removeEventListener('change', handleSelectAllChange);
            rowCheckboxes.forEach(checkbox => {
                checkbox.removeEventListener('change', handleRowCheckboxChange);
            });
        }
    };
}

export default selectAll;