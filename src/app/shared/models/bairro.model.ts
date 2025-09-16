export enum TipoReurb {
    REURB_S = "REURB-S",
    REURB_E = "REURB-E",
    SEM_INFORMACAO = "Sem Informação"
}

export enum SituacaoReurb {
    REGULARIZADO = "Regularizado",
    EM_REGULARIZACAO = "Em Regularização",
    NAO_INICIADA = "Não Iniciada",
    SEM_INFORMACAO = "Sem Informação",
    ESTAGNADO = "Estagnado"
}

export interface MunicipioSimples {

    id: number;
    nome: string;
}

export class Bairro {
    id!: number;
    nome!: string;
    municipio!: MunicipioSimples;
    tipo_reurb!: TipoReurb;
    situacao_reurb!: SituacaoReurb
}