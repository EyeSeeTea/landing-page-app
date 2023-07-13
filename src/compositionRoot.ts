import { ConfigD2ApiRepository } from "./data/repositories/ConfigD2ApiRepository";
import { InstanceD2ApiRepository } from "./data/repositories/InstanceD2ApiRepository";
import { NotificationsD2ApiRepository } from "./data/repositories/NotificationsD2ApiRepository";
import { Instance } from "./domain/entities/Instance";
import { DHIS2MessageCountUseCase } from "./domain/usecases/DHIS2MessageCountUseCase";
import { DeleteNotificationsUseCase } from "./domain/usecases/DeleteNotificationsUseCase";
import { GetConfigUseCase } from "./domain/usecases/GetConfigUseCase";
import { GetCurrentUserUseCase } from "./domain/usecases/GetCurrentUserUseCase";
import { GetInstanceVersionUseCase } from "./domain/usecases/GetInstanceVersionUseCase";
import { ListAllNotificationsUseCase } from "./domain/usecases/ListAllNotificationsUseCase";
import { ListUserNotificationsUseCase } from "./domain/usecases/ListUserNotificationsUseCase";
import { SaveNotificationsUseCase } from "./domain/usecases/SaveNotificationsUseCase";
import { SearchUsersUseCase } from "./domain/usecases/SearchUsersUseCase";

export function getCompositionRoot(instance: Instance) {
    const instanceRepository = new InstanceD2ApiRepository(instance);
    const notificationsRepository = new NotificationsD2ApiRepository(instance, instanceRepository);
    const configRepository = new ConfigD2ApiRepository(instance);

    return {
        usecases: {
            notifications: getExecute({
                list: new ListUserNotificationsUseCase(notificationsRepository),
                listAll: new ListAllNotificationsUseCase(notificationsRepository),
                dhis2MessageCount: new DHIS2MessageCountUseCase(notificationsRepository),
                save: new SaveNotificationsUseCase(notificationsRepository),
                delete: new DeleteNotificationsUseCase(notificationsRepository),
            }),
            instance: getExecute({
                getCurrentUser: new GetCurrentUserUseCase(instanceRepository),
                searchUsers: new SearchUsersUseCase(instanceRepository),
                getVersion: new GetInstanceVersionUseCase(instanceRepository),
            }),
            config: getExecute({
                get: new GetConfigUseCase(configRepository),
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
