export interface Profissional {
    id? : string;
    nome : string;
    cpf : string;
    email : string;
    tel1 : string;
    tel2 : string;
    genero : string;
    logradouro : string;
    nr : string;
    bairro : string;
    complemento : string;
    cidade : string;
    uf : string;
    funcao: {id:string,nome:string}[],
    cep : string;
    longitude: any;
    latitude: any;
    nivel: string;
}