(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const L=`<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
    </header>
    
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- Lista de TODOS -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a class="filtro" class="selected" href="#/">Todos</a>
            </li>
            <li>
                <a class="filtro" href="#/active">Pendientes</a>
            </li>
            <li>
                <a class="filtro" href="#/completed">Completados</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>No seas flojo y cumplí con tus tareas &#x1F607;</p>
    <p>Matías Ag. Benítez</p>

</footer>`;let T;const O=new Uint8Array(16);function S(){if(!T&&(T=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!T))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return T(O)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function b(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}const A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),y={randomUUID:A};function C(e,t,i){if(y.randomUUID&&!t&&!e)return y.randomUUID();e=e||{};const r=e.random||(e.rng||S)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=r[o];return t}return b(r)}class h{constructor(t){this.id=C(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"completed",Pending:"pending"},l={todos:[new h("Aprender Vue.js"),new h("Aprender Firebase"),new h("Aprender Node.js"),new h("Aprender Express.js")],filter:a.All},v=()=>{w()},w=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},D=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Completed:return l.todos.filter(t=>t.done);case a.Pending:return l.todos.filter(t=>!t.done);default:throw new Error("Filtro no soportado")}},I=e=>{if(!e)throw new Error("La descripción es requerida");l.todos.push(new h(e)),f()},N=e=>{const t=l.todos.find(i=>i.id===e);t.done=!t.done,f()},P=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},U=()=>{l.todos=l.todos.filter(e=>!e.done),f()},F=(e=a.All)=>{l.filter=e,f()},_=()=>l.filter,c={addTodo:I,initStore:v,loadStore:w,toggleTodo:N,deleteTodo:P,deleteCompletedTodos:U,setFilter:F,getCurrentFilter:_,getTodos:D},x=e=>{if(!e)throw new Error("El todo no puede ser nulo");const{id:t,description:i,done:r}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${r?"checked":""}>
            <label>${i}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",t),r&&n.classList.add("completed"),n};let g;const M=(e,t=[])=>{if(!g&&(g=document.querySelector(e),!g))throw new Error(`No se encontró el elemento con el id ${e}`);g.innerHTML="",t.reverse().forEach(i=>{g.append(x(i))})},m={TODO_LIST:".todo-list",NEW_TODO_INPUT:"#new-todo-input",CLEAR_COMPLETED:".clear-completed",TODO_FILTERS:".filtro",PENDING_COUNT:"#pending-count"},q=e=>{const t=()=>{const d=c.getTodos(c.getCurrentFilter());M(m.TODO_LIST,d),i()},i=()=>{const d=c.getTodos(a.Pending).length;document.querySelector(m.PENDING_COUNT).innerHTML=d};(()=>{const d=document.createElement("div");d.innerHTML=L,document.querySelector(e).append(d),t()})();const r=document.querySelector(m.NEW_TODO_INPUT),o=document.querySelector(m.TODO_LIST),n=document.querySelector(m.CLEAR_COMPLETED),u=document.querySelectorAll(m.TODO_FILTERS);r.addEventListener("keyup",d=>{d.keyCode!==13||r.value.trim()===""||(c.addTodo(d.target.value),r.value="",t())}),o.addEventListener("click",d=>{const p=d.target.closest("[data-id]");p&&(d.target.matches("button")?(c.deleteTodo(p.getAttribute("data-id")),t()):(c.toggleTodo(p.getAttribute("data-id")),t()))}),n.addEventListener("click",()=>{c.deleteCompletedTodos(),t()}),u.forEach(d=>{d.addEventListener("click",p=>{switch(u.forEach(E=>E.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.Completed);break;default:throw new Error("Filtro no soportado")}t()})})};c.initStore();q("#app");
