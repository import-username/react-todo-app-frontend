export function isResponseSuccessful(statusCode: number): boolean {
    return statusCode > 199 && statusCode < 300;
}