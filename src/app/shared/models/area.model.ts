import { MunicipioSimples } from "./bairro.model";

export interface BairroSimples{
    id: number;
    nome: string;
    municipio: MunicipioSimples
}

export class Area{
    id!: number;
    area_Total!: number;
    area_Regularizada!: number;
    area_NaoRegularizada!: number;
    area_EmProcessoRegularizacao!: number;
    area_Publica!: boolean;
    area_PreservacaoPermantente!: boolean;
    latitude!: number;
    longitude!: number;
    bairro!: BairroSimples;
}