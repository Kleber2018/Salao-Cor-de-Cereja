export interface Pagamento {
     id?: string,
     cliente: {id: string,nome:string}[],
     data: string,
     servicos: {id:string,nome:string,preco:string}[],
     valor_servicos: string,
     percentual_de_desconto: string,
     valor_pago: string
 } 
 