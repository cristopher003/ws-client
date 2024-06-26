import { Manager, Socket } from "socket.io-client";

let socket:Socket;

export const connetToServer=(jwtToken:string)=>{

    const manager=new Manager('http://localhost:3000/socket.io/socket.io.js',
        {extraHeaders:
            {authentication:jwtToken}}
    );
    
    socket?.removeAllListeners();
    socket=manager.socket('/');

    addListeners();
}

const addListeners=()=>{
    const serverStatus=document.querySelector("#status")!;
    const clientsUl=document.querySelector("#clients-ul")!;
    const messageForm=document.querySelector<HTMLFormElement>("#message-form")!;
    const messageInput=document.querySelector<HTMLInputElement>("#message-input")!;
    const messageUl=document.querySelector<HTMLUListElement>("#messages")!;


    socket.on('connect',()=>{
        serverStatus.innerHTML='conectado';
    });

    socket.on('disconect',()=>{
        serverStatus.innerHTML='desconectado';
    });

    socket.on('clients-update',(client:string[])=>{
     let clientsHTML='';
     client.forEach(client=>{
        clientsHTML+=`<li>${client}</li>`
     });
     clientsUl.innerHTML=clientsHTML;
    });

    messageForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        if (messageInput.value.trim().length<= 0) return;

        socket.emit("message-client",
            {id:"yo",message:messageInput.value}
        );
        messageInput.value="";
    });

    socket.on('message-from-server',(payload:{fullName:string,message:string})=>{
        const newMessage =`
            <li>
                <strong>${ payload.fullName }</strong>
                <span>${ payload.message }</span>
            </li>
        `
        const li=document.createElement('li');
        li.innerHTML=newMessage;
        messageUl.append(li);
    });

}