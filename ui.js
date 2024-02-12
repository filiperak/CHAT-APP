export class chatUI {
    constructor(l){
        this.list = l;
    }
    set list(l){
        this._list = l;
    }
    get list(){
        return this._list
    }
    //formatDate = (date) => `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}. ${date.getHours()}:${date.getMinutes()}`

    formatDate = (date) => {
        const currentDate = new Date();
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        //const currentDay = currentDate.getDate();
    
        if (date.toDateString() === currentDate.toDateString()) {
            return `${hours}:${minutes}`;
        } else {
            return `${day}.${month}.${year}. - ${hours}:${minutes}`;
        }
    };

    tamplateLI(dt){
        let liElem = document.createElement('li');
        liElem.classList.add('liElem')
        let liDiv = document.createElement('div');
        liDiv.classList.add('liDiv');
        let usernameDiv = document.createElement('div')
        usernameDiv.innerHTML = `${dt.username}:`
        let firstDiv = document.createElement('div');
        firstDiv.innerHTML = ` ${dt.message}`;
        let secondDiv = document.createElement('div');
        let imgContainer = document.createElement('div')
        imgContainer.classList.add('imgDiv')
        let delImg = document.createElement('img');
        delImg.src = 'img/img1.png';
        delImg.classList.add('delimg')

        secondDiv.innerHTML = `${this.formatDate(dt.created_at.toDate())}`;

        const getUserData = () => {
            if(localStorage.getItem('user') == null){
                return localStorage.setItem('user','anonymus')
            }else{
                return localStorage.getItem('user')
            }
        }
        let usernameStorage = getUserData();

        if(dt.username == usernameStorage){
            liElem.classList.add('localUser')
        }else{
            liElem.classList.add('forignUser')
        }

        imgContainer.appendChild(delImg)
        secondDiv.appendChild(imgContainer)
        liDiv.append(usernameDiv,firstDiv,secondDiv)
        liElem.appendChild(liDiv)
        return this.list.append(liElem)
    
    }
    delete(){
        this.list.innerHTML = '';
    }
    scrollDown(UL){
        UL.scrollTop = UL.scrollHeight;
    };
    colorUpdate(e,cv){
        e.forEach(elem => {
            elem.style.backgroundColor = cv;
            document.body.style.backgroundColor = cv;
        });
    }


}

export const groupIdLabel = (g,t) => g.innerHTML = `Channel: ${t}`;

export const usernameUpdMsg = (el,u) => {
    el.innerHTML = `Username changed to : ${u}`
    el.classList.remove('hidden')
    setTimeout(() => el.classList.add('hidden'),3000);

}