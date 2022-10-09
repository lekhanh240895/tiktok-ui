import { formatDistanceToNow } from 'date-fns';

export default function formatDateAgo(timestamp) {
    const date = formatDistanceToNow(new Date(timestamp));
    return date;
}
