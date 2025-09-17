import { Area, BairroSimples } from "./area.model";


export interface AreaSimples{
    id: number;
    area_Total: number;
    bairro: BairroSimples
}

export class Lote{

    id!: number;
    numero!: number;
    area_Lote!: number;
    area_rel!: AreaSimples
}