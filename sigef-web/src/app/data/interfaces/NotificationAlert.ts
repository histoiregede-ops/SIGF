export enum TypesNotificationAlert {
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info'
}

export interface NotificationAlert {
    id?: number;
    type: TypesNotificationAlert;
    description: string; // Renommé de 'message' à 'description' pour correspondre à l'utilisation
    title?: string;
    duration?: number;
}