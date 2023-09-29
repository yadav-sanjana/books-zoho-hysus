export function extendDateByDays(originalDate: Date, daysToAdd: number): Date {
    const newDate = new Date(originalDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    return newDate;
}
