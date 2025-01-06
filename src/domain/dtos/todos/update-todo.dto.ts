export class UpdateTodoDto {

    constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date
    ) { }

    get values() {

        const returnObj: {[key:string]:any} = { };

        if(this.text) returnObj.text = this.text;
        if(this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj
    }

    static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { id, text, completedAt } =  props;
        if(isNaN(id)|| !id) return ['id no valido', undefined];

        const fecha = new Date(completedAt);
        if (isNaN(fecha.getTime())) return ['fecha invalida', undefined];

        const dto = new UpdateTodoDto(id,text,fecha);

        return [undefined, dto];
    }

}