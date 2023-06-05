import { UseCase } from "../../compositionRoot";
import { NamedRef } from "../entities/Ref";
import { ECDDSubstancesRepository } from "../repositories/ECDDSubstancesRepository";

export class GetECDDSubstancesUseCase implements UseCase {
    constructor(private substancesRepository: ECDDSubstancesRepository) {}

    public async execute(): Promise<NamedRef[]> {
        return this.substancesRepository.get();
    }
}
