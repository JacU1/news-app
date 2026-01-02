export interface INotificationBox {
    type: NotificationTypes | null;
    message: string | null;
    show: boolean
}

export enum NotificationTypes { 
    SUCCES = "success",
    DANGER = "danger",
    WARNING = "warning",
    INFO = "info"
}