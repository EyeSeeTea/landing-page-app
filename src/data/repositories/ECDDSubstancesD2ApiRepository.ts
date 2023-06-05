import _ from "lodash";
import { Instance } from "../../domain/entities/Instance";
import { ECDDSubstancesRepository } from "../../domain/repositories/ECDDSubstancesRepository";
import { getD2APiFromInstance } from "../../utils/d2-api";
import { D2Api } from "../../types/d2-api";
import { NamedRef } from "../../domain/entities/Ref";

export class ECDDSubstancesD2ApiRepository implements ECDDSubstancesRepository {
    private api: D2Api;

    constructor(instance: Instance) {
        this.api = getD2APiFromInstance(instance);
    }

    async get(): Promise<NamedRef[]> {
        try {
            const { categories } = await this.api.metadata
                .get({
                    categories: {
                        fields: {
                            categoryOptions: { id: true, name: true },
                        },
                        filter: {
                            name: { eq: "Substance" },
                        },
                    },
                })
                .getData();

            return _(categories).first()?.categoryOptions ?? [];
        } catch (error) {
            console.debug(error);
            return [];
        }
    }
}
