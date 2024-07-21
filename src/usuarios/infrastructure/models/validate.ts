import sanitizeHtml from "sanitize-html";

export function stringValidator(value: string):boolean {
    const sanitizedValue = sanitizeHtml(value).trim();
    return value === sanitizedValue;
}

export function gmailValidator(gmail: string):boolean {
    if (!stringValidator(gmail)) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    return regex.test(gmail);
}