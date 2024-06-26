import './style.css'
import { connetToServer } from './socket-cliente.ts'

// npm install socket.oi-client
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <h2>Websocket Cliente</h2>

<input id="jwt-Token"></input>
<button id="btn-connect">Conectar</button>

<br/>
  <span id="status">offline</span>
  <ul id="clients-ul">
  </ul>

  <form id="message-form">
  <label for="" class="form-label">Mensage</label>
  <input
    type="text"
    class="form-control"
    name="message"
    id="message-input"
    aria-describedby="helpId"
    placeholder=""
  />
</form>

<h3>Mensages</h3>
<ul id="messages">

</ul>
  </div>
`
// connetToServer();
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const jwtToken=document.querySelector<HTMLInputElement>("#jwt-Token")!;
const btnConnect=document.querySelector<HTMLButtonElement>("#btn-connect")!;

btnConnect.addEventListener('click',()=>{
if (jwtToken.value.trim().length<=0) return alert("JWT token invalido")
connetToServer(jwtToken.value.trim())
});
