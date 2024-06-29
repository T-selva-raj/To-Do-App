export enum SnackType {
    Success, Info, Warning, Error, Default
}

export interface Snackbar {
    message: string;
    snacktype: SnackType;
    duration?: number,
    class?: string
}