const formatDateTime = (inputDateString) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Parse the date string into a Date object
    const date = new Date(inputDateString.replace(' ', 'T') + 'Z');

    const year = date.getUTCFullYear();
    const month = months[date.getUTCMonth()];
    const day = String(date.getUTCDate()).padStart(2, '0');
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 == 0 ? 12 : hours; // the hour '0' should be '12'

    // Format the date and time parts
    return `${month} ${day}, ${year} - ${hours}:${minutes} ${ampm}`;
}

export default formatDateTime;