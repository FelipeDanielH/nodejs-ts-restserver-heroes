export class CreateTodoDto {
   
    constructor(
        public readonly text: string
    ){}

    static create(props: {[key:string]:any}): [string?, CreateTodoDto?]{
        
        const { text } = props;
        if(!text || text.length === 0) return ['la property text es requerida', undefined];

        const dto = new CreateTodoDto(text);

        return [undefined, dto];
    }

}