export interface Pacote {
    id?: string,
    nome: string,
    validade: string,
    servicos: {id:string,nome:string,preco:string}[],
    valor_pacote: string,
    percentual_de_desconto: string,
    valor_pacote_com_desconto: string
} 
