export type FullDescriptionAdDTO = {
    id: string;
    marca: string;
    modelo: string;
    ano: string;
    versao: string;
    combustivel: string;
    portas: string;
    transmissao: string;
    motor: string;
    quilometros: string;
    direcao: string;

    ar_condicionado: boolean;
    computador_de_bordo: boolean;
    vidros_eletricos: boolean;
    alarme: boolean;
    freio_abs: boolean;
    air_bag: boolean;
    sensor_de_estacionamento: boolean;
    limpador_traseiro: boolean;
    bancos_em_couro: boolean;
    piloto_automatico: boolean;

    com_garantia_de_fabrica: boolean;
    com_garantia_mecanica: boolean;
    unico_dono: boolean;
    preco_negociavel: boolean;
    aceita_troca: boolean;
    com_ipva_pago: boolean;

}