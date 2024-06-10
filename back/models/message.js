class Message{
    constructor(text, type, created_at){
        this.text = text
        this.type = type
        this.created_at = created_at || null
    }
}

module.exports = Message