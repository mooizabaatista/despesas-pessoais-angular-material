export interface Despesa {
  id: string;
  data: Date;
  local: string;
  tipoPagamento: string;
  isPago?: boolean;
  valor: number;
}
