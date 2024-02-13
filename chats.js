class Chatroom {
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub = false;


        //this.idd;
    }
    
    set room(room){
        this._room = room;
        if(this.unsub){
            this.unsub();
        }
    }
    set username(username){
        if(username.length > 2 && username.length <= 10 && username.trim().length !=0){
            this._username = username;
        }else{
            alert('invalid username')
        }
        if(this.unsub){
            this.unsub();
        }
    }
    get room(){
            return this._room;
    }
    get username(){
        return this._username;
    }
    /*
    uuid() {
        let random = Math.random().toString(16) + Math.random().toString(16);
        return random;
    }
*/
    async addChat(msg){

        //let randomUuid = this.uuid();
        try{
            let docChat = {
                message: msg,
                username: this.username,
                room: this.room,
                created_at: new Date()
            };
            let response = await this.chats.add(docChat);
            return response;
        }
        catch{
            console.error('greska',err);
        }
    }

    getChats(callback){
        this.unsub = this.chats
        .where('room','==',this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    //callback(change.doc.data());
                    let documentData = change.doc.data();
                    let documentId = change.doc.id;
                    documentData.id = documentId;
                    callback(documentData);
                }
            })
        })
    }

    
    //deleteChats(elemID,callback) {
    //    this.unsub = this.chats
    //    this.chats.onSnapshot(elem => {
    //        elem.forEach(doc => {
    //            //console.log(doc.data());
    //            //console.log(doc.id);
    //            if(/*doc.data().message == msg*/doc.id == elemID) {
    //                //console.log(doc.data().message);
    //                this.chats
    //                    .doc(doc.id)
    //                    .delete()
    //                    .then(()=> {
    //                        callback()
    //                    })
    //            }
    //        })
    //    })
    //}
    deleteChats(elemID) {
            this.unsub = this.chats
            this.chats.onSnapshot(elem => {
                elem.forEach(doc => {
                    if(doc.id == elemID) {
                        this.chats
                            .doc(doc.id)
                            .delete()
                            .then(()=> {
                                window.location.reload(true)
                            })
                    }
                })
            })
        }
};


export {Chatroom};
