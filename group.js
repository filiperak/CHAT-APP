export class Group {
    constructor(gn){
        this.groupName = gn;
    }
    set groupName(gn){
        if(gn.trim().length < 3 || gn.trim().length > 15){
            this._groupName = 'default'
        }else{
            this._groupName = gn;
        }
    };
    get groupName(){
        return this._groupName;
    };
    createGroup(){
        db.collection('channels').doc(this.groupName)
        .set({channelNAME : this.groupName})
        .then(() => console.log('radi'))
        .catch((e) => console.log('ne radi',e))
    };

    getGroup() {
        return new Promise((resolve, reject) => {
            const unsubscribe = db.collection('channels')
                .onSnapshot(snapshot => {
                    snapshot.docChanges().forEach(c => {
                        if (c.type === 'added') {
                            const data = c.doc.data();
                            unsubscribe(); 
                            resolve(data);
                        }
                    });
                }, error => {
                    console.error('Error fetching group:', error);
                    reject(error);
                });
        });
    }
}

export const tamplateGroup = (d) => {
    let divC = document.createElement('div');
    divC.classList.add('chatroom')
    divC.setAttribute('id',d.channelNAME);
    divC.innerText = d.channelNAME;
    let delGroup = document.createElement('img');
    delGroup.src = 'img/img1.png';
    delGroup.classList.add('delGroupImg')
    divC.appendChild(delGroup)
    return divC;
}

export const getChannelData = (el) => {
    db.collection('channels')
    .get()
    .then(snapshot => {
        snapshot.forEach(elem => {
            let data = elem.data()
            let tChat = tamplateGroup(data)
            el.appendChild(tChat);
        })
    })
    .catch(e => console.log(e))
}

export const deleteGroup = (groupId) => {
    db.collection('channels').onSnapshot(elem => {
        elem.forEach(doc => {
            if(doc.id == groupId) {
                db.collection('channels')
                    .doc(doc.id)
                    .delete()
                    .then(()=> {
                        window.location.reload(true)
                     
                    })
            }
        })
    })
}
export const scroll = (UL) => {
    UL.scrollTop = UL.scrollHeight;
};
