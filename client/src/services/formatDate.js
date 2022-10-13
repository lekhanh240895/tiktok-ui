const { format } = require('date-fns');

export const formatDate = (timestamp) => {
    const date = format(new Date(timestamp), 'yyyy-MM-dd');
    const thisYear = new Date().getFullYear().toString();
    const newDate = format(new Date(timestamp), 'MM-dd');
    if (date.startsWith(thisYear)) {
        return newDate;
    }
    return date;
};
