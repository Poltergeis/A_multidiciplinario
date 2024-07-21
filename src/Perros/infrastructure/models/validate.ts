import sanitizeHtml from "sanitize-html";

export function stringValidator(value: string):boolean {
    const sanitizedValue = sanitizeHtml(value).trim();
    return value === sanitizedValue;
}

export function edadValidator(edad: number): boolean {
    return (edad >= 0 && edad <= 32);
}