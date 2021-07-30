import { Notification } from "../entities/Notification";

export interface NotificationsRepository {
    list(): Promise<Notification[]>;
    listAll(): Promise<Notification[]>;
    update(notifications: Notification[]): Promise<void>;
    create(content: string, recipients: string[]): Promise<void>;

}
