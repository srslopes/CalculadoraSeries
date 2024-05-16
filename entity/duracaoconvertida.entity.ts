export class DuracaoConvertida {
    public dias: number;
    public horas: number;
    public minutos: number;

    public constructor(duracao: number) {
        this.minutos = duracao;
        this.dias = Math.trunc(this.minutos / 1440);
        this.minutos = this.minutos % 1440;
        this.horas = Math.trunc(this.minutos / 60);
        this.minutos = this.minutos % 60;
    }
}
