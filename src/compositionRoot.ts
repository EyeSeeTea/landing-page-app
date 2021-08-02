import { Instance } from "./data/entities/Instance";
import { InstanceD2ApiRepository } from "./data/repositories/InstanceD2ApiRepository";
import { NotificationsD2ApiRepository } from "./data/repositories/NotificationsD2ApiRepository";
import { CreateNotificationUseCase } from "./domain/usecases/CreateNotificationUseCase";
import { GetCurrentUserUseCase } from "./domain/usecases/GetCurrentUserUseCase";
import { GetInstanceVersionUseCase } from "./domain/usecases/GetInstanceVersionUseCase";
import { ListAllNotificationsUseCase } from "./domain/usecases/ListAllNotificationsUseCase";
import { ListUserNotificationsUseCase } from "./domain/usecases/ListUserNotificationsUseCase";
import { SearchUsersUseCase } from "./domain/usecases/SearchUsersUseCase";
import { UpdateNotificationsUseCase } from "./domain/usecases/UpdateNotificationsUseCase";

export function getCompositionRoot(instance: Instance) {
    const instanceRepository = new InstanceD2ApiRepository(instance);
    const notificationsRepository = new NotificationsD2ApiRepository(instance, instanceRepository);

    return {
        usecases: {
            notifications: getExecute({
                list: new ListUserNotificationsUseCase(notificationsRepository),
                listAll: new ListAllNotificationsUseCase(notificationsRepository),
                update: new UpdateNotificationsUseCase(notificationsRepository),
                create: new CreateNotificationUseCase(notificationsRepository),
            }),
            instance: getExecute({
                getCurrentUser: new GetCurrentUserUseCase(instanceRepository),
                searchUsers: new SearchUsersUseCase(instanceRepository),
                getVersion: new GetInstanceVersionUseCase(instanceRepository),
            }),
        },
    };
}

export type CompositionRoot = ReturnType<typeof getCompositionRoot>;

function getExecute<UseCases extends Record<Key, UseCase>, Key extends keyof UseCases>(
    useCases: UseCases
): { [K in Key]: UseCases[K]["execute"] } {
    const keys = Object.keys(useCases) as Key[];
    const initialOutput = {} as { [K in Key]: UseCases[K]["execute"] };

    return keys.reduce((output, key) => {
        const useCase = useCases[key];
        const execute = useCase.execute.bind(useCase) as UseCases[typeof key]["execute"];
        output[key] = execute;
        return output;
    }, initialOutput);
}

export interface UseCase {
    execute: Function;
}
