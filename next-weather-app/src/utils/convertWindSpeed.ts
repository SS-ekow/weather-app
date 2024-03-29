/** @format */

export function convertWindSpeed(speed: number): string{
    const kmPerHour = speed * 3.6;

    return `${kmPerHour.toFixed(0)} km/h`;
}