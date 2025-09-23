import { Bairro } from "./bairro.model";

 export enum PossuiPlanoDiretor {
  SIM = 'Sim',
  NAO = 'Não',
  SEM_INFORMACAO = 'Sem informação'
}

export class Municipio {
  id!: number;
  nome!: string;
  possui_plano_diretor!: PossuiPlanoDiretor; // <- usa o enum
  prefeito?: string | null;
  assessor_responsavel?: string | null;
  bairros!: Bairro[];
}
