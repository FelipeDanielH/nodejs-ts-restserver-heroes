export class TodoEntity{

    constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly completedAt?: Date | null
    ){}

    get isCompleted():boolean{
        return !!this.completedAt
    }

    public static fromObject( obj: {[key: string]:any}):TodoEntity {

        const {id,text,completedAt} = obj;

        if(!id) throw 'id obligatorio'
        if(!text) throw 'texto obligatorio'

        const newCompletedAt = new Date(completedAt);
        if(completedAt && isNaN(newCompletedAt.getTime())) throw 'fecha no valida'

        return new TodoEntity(id, text, completedAt)
    }

}