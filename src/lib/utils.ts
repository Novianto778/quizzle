import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...classes: ClassValue[]) => {
    return twMerge(clsx(classes));
};

export function formatSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
        return `${remainingSeconds} sec`;
    } else if (remainingSeconds === 0) {
        return `${minutes} min`;
    } else {
        return `${minutes} min ${remainingSeconds} sec`;
    }
}
