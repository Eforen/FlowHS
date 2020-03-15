// types.ts

export interface Notification {
    id?: string
    text: string
    closable: boolean
    border: string
    icon: string
    timeout?: number
}

export interface NotificationState {
    notifications: Notification[]
}