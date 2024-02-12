import {Chatroom} from './chats.js';
import { chatUI } from './ui.js';
import { groupIdLabel , usernameUpdMsg } from './ui.js';
//DOM
const messageUl = document.querySelector('.msgUl');
const messageInp = document.querySelector('#msg');
const formMsg = document.querySelector('#inputMsg');
const formUpdate = document.querySelector('#inputUpdate');
const usernameInp = document.querySelector('#username');
const chatroomOptions = document.querySelectorAll('.chatroom');
const groupId = document.querySelector('#groupId');
const deleteDiv = document.querySelectorAll('.delimg');
const colorUpdate = document.querySelector('#colorUpdate');
const updUserMsg = document.querySelector('#updUserMsg');


//PROVERA I SET USERNAME U LOCALSTORAGE
const getUserData = () => {
    if(localStorage.getItem('user') == null){
        return localStorage.setItem('user','anonymus')
    }else{
        return localStorage.getItem('user')
    }
}
let usernameStorage = getUserData();

const getUserGroup = () => {
    if(localStorage.getItem('group') == null){
        return localStorage.setItem('group','general')
    }else{
        return localStorage.getItem('group')
    }
}
let userGroup = getUserGroup();
groupIdLabel(groupId,userGroup)

const getuserColor = () => {
    if(localStorage.getItem('color') == null){
        return localStorage.setItem('color','#e1e3e6')
    }else{
        return localStorage.getItem('color')
    }
}
let section1 = document.getElementById('msgSection');
let section2 = document.getElementById('pageContainer');
let colerElems = [section1,section2,messageUl];
let userColor = getuserColor()


//OBJEKTI
let chatroom1 = new Chatroom(userGroup,usernameStorage)
let chatUI1 = new chatUI(messageUl);
//PRIKAZ PORUKA NA STRANICI
chatroom1.getChats(data => {
    chatUI1.tamplateLI(data)
    chatUI1.scrollDown(messageUl)
});
    
    
chatUI1.colorUpdate(colerElems,userColor)

formMsg.addEventListener('submit',(e) => {
    e.preventDefault();
    let msgVal = messageInp.value;
    if(msgVal.trim() != 0){
        chatroom1.addChat(msgVal);
    } 
    formMsg.reset();
});

formUpdate.addEventListener('submit',(e) => {
    e.preventDefault();
    let usernameVal = usernameInp.value
    chatroom1.username = usernameVal;
    localStorage.setItem('user',usernameVal)
    groupIdLabel(groupId,userGroup)
    formUpdate.reset();
    usernameUpdMsg(updUserMsg,usernameVal)
    chatUI1.delete();
    chatroom1.getChats(data => {
        chatUI1.tamplateLI(data)
        chatUI1.scrollDown(messageUl)
    });

});

messageInp.addEventListener('keypress',(e) => {
    if(e.which === 13){
        let msgVal = messageInp.value;
        if(msgVal.trim() != 0){
            chatroom1.addChat(msgVal);
        } 
        formMsg.reset();
    }
   
})

chatroomOptions.forEach(elem => {
    elem.addEventListener('click',(e) => {
        chatUI1.delete();
        let target = e.target.id
        chatroom1.room = target;
        localStorage.setItem('group',target)
        chatroom1.getChats(data => {
            chatUI1.tamplateLI(data)
            chatUI1.scrollDown(messageUl)
        });
        groupIdLabel(groupId,target)
    })
})


/*
messageUl.addEventListener('click', (e) => {

    if (e.target.tagName === 'IMG') {
        let msg = e.target.closest('.liElem').querySelector('div:nth-child(2)').innerText//.trim();
        console.log(msg,e.target);
        chatroom1.deleteChats(String(msg));
        chatroom1.getChats(data => {
            //chatUI1.tamplateLI(data)
            chatUI1.scrollDown(messageUl)
        });
    }
});*/


messageUl.addEventListener('click', (e) => {

    if (e.target.tagName === 'IMG') {
        //let msg = e.target.closest('.liElem').querySelector('div:nth-child(2)').innerText;
        let msg = e.target.closest('.liElem')
        let msg2 = msg.id
        //chatUI1.delete();

        //console.log(msg.length,typeof(msg));
        chatroom1.deleteChats(msg2, () => {
            chatroom1.getChats(data => {
                window.location.reload();
                chatUI1.tamplateLI(data)
                chatUI1.scrollDown(messageUl);
            });
           //console.log(2);
        });
         
    }
});


colorUpdate.addEventListener('submit', (e) => {
    e.preventDefault();
    let colorpicker = document.getElementById('color').value;
    let section1 = document.getElementById('msgSection');
    let section2 = document.getElementById('pageContainer');
    let colerElems = [section1,section2,messageUl];
    chatUI1.colorUpdate(colerElems,colorpicker)
    localStorage.setItem('color',colorpicker)
})