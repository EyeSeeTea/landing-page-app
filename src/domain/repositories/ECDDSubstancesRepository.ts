import { NamedRef } from "../entities/Ref";

export interface ECDDSubstancesRepository {
    get(): Promise<NamedRef[]>;
}
