class MessageService{
    
    constructor(repository){
        this.repository = repository
    }

    async create_message(message){
        try{
            const response = await this.repository.create_message(message)
            return response
        }catch(err){
            console.log('erro', err)
            throw err
        }
    }

    async get_all_messages(){
        try{
            const response = await this.repository.get_all_messages()
            return response
        }catch(err){
            console.log('erro', err)
            throw err
        }
    }
}

module.exports = MessageService;