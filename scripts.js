/****************************************************************************
 * UTILIDADES Y CONSTANTES
 ****************************************************************************/
const $ = q => document.querySelector(q);          // atajo para document.querySelector
const rnd = (a,b)=>Math.floor(Math.random()*(b-a+1))+a; // número entero aleatorio entre a y b

/****************************************************************************
 * SONIDO AMBIENTAL Y NOTIFICACIONES
 ****************************************************************************/
const music=document.getElementById('bgMusic');
function startMusic(){ if(music) music.play().catch(()=>{}); }
document.addEventListener('click',startMusic,{once:true});
function showBubble(msg){ const c=document.getElementById('notify'); if(!c) return; const b=document.createElement('div'); b.className='bubble'; b.textContent=msg; c.appendChild(b); setTimeout(()=>b.remove(),6000); }
window.addEventListener('load',()=>{ const msgs=JSON.parse(localStorage.getItem('messages')||'[]'); if(msgs.length) showBubble(`Tienes ${msgs.length} contacto(s) pendientes.`); else showBubble('¡Bienvenido! Deja tus datos y archivos para revisión.'); });

/****************************************************************************
 * TELÉFONO LED NEÓN
 ****************************************************************************/
(()=>{                                             // pinta teléfonos en neón
  document.querySelectorAll('.ledPhone').forEach(led=>{
    const palette=['#00eaff','#ff4dff','#ffca28','#4dabf5','#81c784'];
    const chars="(+52) 56 1088 5357".split('');
    led.innerHTML = chars.map(ch=> ch===' ' ? ch :
      `<span style="color:${palette[rnd(0,palette.length-1)]}">${ch}</span>`).join('');
  });
})();

/****************************************************************************
 * CURSOS Y TIENDA
 ****************************************************************************/
const baseTopics = n => Array.from({length:n},(_,i)=>`Tema ${i+1}`); // genera temario largo
const cursosData=[
  ['ARITMÉTICA',baseTopics(15),'LMV'],
  ['ÁLGEBRA',baseTopics(15),'MJ'],
  ['GEOMETRÍA',baseTopics(15),'LMV'],
  ['TRIGONOMETRÍA',baseTopics(15),'MJ'],
  ['GEOMETRÍA ANALÍTICA',baseTopics(15),'LMV'],
  ['CÁLCULO DIFERENCIAL',baseTopics(15),'MJ'],
  ['CÁLCULO INTEGRAL',baseTopics(15),'LMV'],
  ['ÁLGEBRA LINEAL',baseTopics(15),'MJ'],
  ['ECUACIONES DIFERENCIALES',baseTopics(15),'LMV'],
  ['FISURAS MATEMÁTICAS (Nivelación Académica)',baseTopics(15),'MJ'],
  ['AJEDREZ',baseTopics(15),'LMV']
];
const scheduleDays={LMV:[1,3,5],MJ:[2,4]};
const grid=document.getElementById('cursoGrid');
const today=new Date();
function countSessions(start,end,days){
  let c=0,d=new Date(start);
  while(d<=end){ if(days.includes(d.getDay())) c++; d.setDate(d.getDate()+1); }
  return c;
}
if(grid){
  cursosData.forEach((c,i)=>{
    const ini=new Date(); ini.setDate(ini.getDate()+14+i*7); // cursos inician en 2 semanas escalonados
    const fin=new Date(ini); fin.setDate(fin.getDate()+14);  // duran dos semanas
    const sesiones=countSessions(ini,fin,scheduleDays[c[2]]);
    const price=sesiones*2*300;                              // 300 por hora, 2h por sesión
    const delta=Math.ceil((ini-today)/86400000);
    let freq=1.2,tone='#81c784';
    if(delta<=2){freq=0.2;tone='#ff5555';}
    else if(delta<=7){freq=0.5;tone='#ffca28';}
    else if(delta<=14){freq=0.8;tone='#ffca28';}
    const minCal=new Date(); minCal.setDate(minCal.getDate()+14);
    grid.insertAdjacentHTML('beforeend',`
      <article class="card" style="--freq:${freq}s;--tone:${tone}">
        <h3>${c[0]}</h3>
        <p><strong>Inicio:</strong> ${ini.getDate()}/${ini.getMonth()+1}</p>
        <p><strong>Fin:</strong> ${fin.getDate()}/${fin.getMonth()+1}</p>
        <p><strong>Costo:</strong> $${price} MXN</p>
        <button class="temarioBtn">Temario</button>
        <ul class="temario" hidden>${c[1].map(t=>`<li>${t}</li>`).join('')}</ul>
        <button class="fechasBtn">Ver fechas</button>
        <div class="fechas" hidden><input type="date" min="${minCal.toISOString().slice(0,10)}" /></div>
        <button class="agendarBtn">Agendar</button>
        <form class="agendaForm" hidden>
          <input type="date" required />
          <input type="text" placeholder="Nombre" required />
          <input type="tel" placeholder="WhatsApp" required />
          <input type="email" placeholder="Correo" required />
          <button type="submit">Apartar</button>
        </form>
      </article>`);
  });

  grid.addEventListener('click',e=>{                   // escucha clics en el grid
    const card=e.target.closest('article.card');
    if(card && !e.target.closest('button') && !e.target.closest('form') && !e.target.closest('.temario') && !e.target.closest('.fechas')){
      const cf=document.getElementById('contactForm');
      if(cf){ cf.classList.add('highlight'); location.hash='#contacto'; }
    }
    if(e.target.classList.contains('temarioBtn'))      // si se presiona Temario
      e.target.nextElementSibling.hidden = !e.target.nextElementSibling.hidden; // mostrar u ocultar lista
    if(e.target.classList.contains('fechasBtn'))       // mostrar calendario
      e.target.nextElementSibling.hidden = !e.target.nextElementSibling.hidden;
    if(e.target.classList.contains('agendarBtn'))      // si se presiona Agendar
      e.target.nextElementSibling.hidden = !e.target.nextElementSibling.hidden; // mostrar formulario
  });

  grid.addEventListener('submit',e=>{                  // envío de formulario de agenda
    if(e.target.classList.contains('agendaForm')){
      e.preventDefault();
      alert('¡Sesión apartada!');
      e.target.hidden=true;
    }
  });
}
if($('#contactForm')){                               // llena cursos en formulario de contacto
  const sel=$('#contactForm select[name=curso]');
  cursosData.forEach(c=>{ const o=document.createElement('option'); o.value=o.textContent=c[0]; sel.appendChild(o); });
}

/****************************************************************************
 * FORMULARIO DE CONTACTO
 ****************************************************************************/
const contactForm=$('#contactForm');
if(contactForm){
  contactForm.addEventListener('submit',e=>{         // manejo de envío
    e.preventDefault();
    const data=Object.fromEntries(new FormData(contactForm).entries());
    data.fecha=new Date().toISOString();
    data.contactado=false; data.notas='';
    const msgs=JSON.parse(localStorage.getItem('messages')||'[]');
    msgs.push(data); localStorage.setItem('messages',JSON.stringify(msgs));
    alert('Mensaje enviado');
    contactForm.reset();
  });
}

/****************************************************************************
 * LOGIN Y EDICIÓN
 ****************************************************************************/
const loginForm=$('#loginForm');                     // formulario de login
const adminPanel=$('#adminPanel');                   // panel tras autenticación
if(loginForm && adminPanel){
  loginForm.addEventListener('submit',e=>{           // evento submit del login
    e.preventDefault();
    const pwd=$('#pwd').value.trim();
    if(pwd==='2025'||pwd==='1991'){
      loginForm.hidden=true;
      adminPanel.hidden=false;
      renderAdminTable();
      renderFiles();
    }else alert('Contraseña incorrecta');
  });
  $('#saveCourse').addEventListener('click',()=>alert('Datos guardados (simulado)'));
}

function renderAdminTable(){
  const table=$('#msgTable'); if(!table) return;
  const msgs=JSON.parse(localStorage.getItem('messages')||'[]');
  table.innerHTML='<tr><th>Nombre</th><th>WhatsApp</th><th>Correo</th><th>Curso</th><th>Mensaje</th></tr>';
  msgs.forEach(m=>{
    table.insertAdjacentHTML('beforeend',`<tr><td>${m.nombre}</td><td>${m.whatsapp}</td><td>${m.email}</td><td>${m.curso}</td><td>${m.mensaje}</td></tr>`);
  });
}

const adminDrop=$('#adminFiles'), adminList=$('#adminFileList');
function renderFiles(){ if(!adminList) return; const files=JSON.parse(localStorage.getItem('files')||'[]'); adminList.innerHTML=''; files.forEach(f=>{ if(f.type==='application/pdf') adminList.insertAdjacentHTML('beforeend',`<p><a href="${f.data}" target="_blank">${f.name}</a></p>`); else if(f.type.startsWith('image/')) adminList.insertAdjacentHTML('beforeend',`<img src="${f.data}" alt="${f.name}" style="max-width:100px;margin:5px;">`); }); }
function storeFile(file){ const fr=new FileReader(); fr.onload=()=>{ const files=JSON.parse(localStorage.getItem('files')||'[]'); files.push({name:file.name,type:file.type,data:fr.result}); localStorage.setItem('files',JSON.stringify(files)); renderFiles(); }; fr.readAsDataURL(file); }
if(adminDrop){
  ['dragenter','dragover'].forEach(ev=>adminDrop.addEventListener(ev,e=>{e.preventDefault();adminDrop.classList.add('dragover');}));
  ['dragleave','drop'].forEach(ev=>adminDrop.addEventListener(ev,e=>{e.preventDefault();adminDrop.classList.remove('dragover');}));
  adminDrop.addEventListener('drop',e=>{[...e.dataTransfer.files].forEach(storeFile);});
  adminDrop.addEventListener('click',()=>{const inp=document.createElement('input');inp.type='file';inp.multiple=true;inp.onchange=()=>{[...inp.files].forEach(storeFile);};inp.click();});
}

/****************************************************************************
 * MENSAJERÍA PRIVADA
 ****************************************************************************/
const mailLogin=$('#mailLogin'), mailSection=$('#mailSection');
function renderMessages(){
  const list=$('#msgList');
  const msgs=JSON.parse(localStorage.getItem('messages')||'[]');
  list.innerHTML='';
  msgs.forEach((m,i)=>{
    list.insertAdjacentHTML('beforeend',`
      <div class="msg">
        <p><strong>${m.nombre}</strong> (${m.email}) - ${m.curso}</p>
        <p>${m.mensaje}</p>
        <label><input type="checkbox" data-idx="${i}" class="chkContact" ${m.contactado?'checked':''}/> Contactado</label>
        <textarea data-idx="${i}" class="note">${m.notas||''}</textarea>
      </div>`);
  });
}
if(mailLogin){
  mailLogin.addEventListener('submit',e=>{
    e.preventDefault();
    const pwd=$('#mailPwd').value.trim();
    if(pwd==='2025'||pwd==='1991'){
      mailLogin.hidden=true; mailSection.hidden=false; renderMessages();
    }else alert('Contraseña incorrecta');
  });
  document.addEventListener('change',e=>{
    if(e.target.classList.contains('chkContact')||e.target.classList.contains('note')){
      const msgs=JSON.parse(localStorage.getItem('messages')||'[]');
      const idx=e.target.dataset.idx;
      if(e.target.classList.contains('chkContact')) msgs[idx].contactado=e.target.checked;
      else msgs[idx].notas=e.target.value;
      localStorage.setItem('messages',JSON.stringify(msgs));
    }
  });
}

/****************************************************************************
 * DRAG & DROP IMÁGENES EN CONTACTO
 ****************************************************************************/
const drop = $('#dropZone'), preview=$('#preview');  // referencias a zona y vista previa
if(drop && preview){
  ['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{ // eventos de arrastre
    e.preventDefault(); drop.classList.add('dragover');
  }));
  ['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{    // eventos de salida y suelta
    e.preventDefault(); drop.classList.remove('dragover');
  }));
  drop.addEventListener('drop',e=>{                   // al soltar archivo
    const file=e.dataTransfer.files[0]; if(!file) return;
    const fr = new FileReader();
    fr.onload = ()=> {
      preview.innerHTML = file.type.startsWith('image')
        ? `<img src="${fr.result}" style="max-width:100%">`
        : `<pre>${fr.result.slice(0,1200)}…</pre>`;
    };
    file.type.startsWith('image') ? fr.readAsDataURL(file) : fr.readAsText(file);
  });
  drop.addEventListener('click',()=>{                 // al hacer clic en zona
    const inp=document.createElement('input');
    inp.type='file'; inp.accept='image/*';
    inp.onchange=()=> preview.textContent = `Archivo cargado: ${inp.files[0].name}`;
    inp.click();
  });
}

/****************************************************************************
 * JUEGO DE BOMBAS
 ****************************************************************************/
const canvas = document.getElementById('game');
if(canvas){
  const ctx=canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;            // dimensiones del lienzo
  let bombs=[], score=0, lives=5, lastT=performance.now(), nextSpawn=0, gameOver=false; // estado del juego
  let difficulty=1;                                  // nivel de dificultad
  $('#difficulty').oninput=e=>difficulty=+e.target.value; // actualiza dificultad
  const typedDisplay=$('#typedDisplay');             // display de lo escrito
  const beep=new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'); // sonido al acertar
  const boom=new Audio('https://actions.google.com/sounds/v1/explosions/explosion.ogg'); // sonido al fallar

/* operaciones activas */
const activeOps=new Set(['+','-','×','÷','√','^']); // conjunto de operaciones
document.querySelectorAll('#opMenu input[type=checkbox]').forEach(chk=>{ // chequea cada casilla
  chk.onchange=e=> chk.checked ? activeOps.add(chk.dataset.op) : activeOps.delete(chk.dataset.op); // agrega o quita
});

/* genera problema */
function randomProblem(){                          // crea un problema aleatorio
  const op=[...activeOps][rnd(0,activeOps.size-1)]; // elige operación activa
  let a,b,q,ans;                                   // operandos y respuesta
  switch(op){                                      // según la operación
    case '+': a=rnd(1,99); b=rnd(1,99-a); ans=a+b; q=`${a}+${b}`; break; // suma
    case '-': b=rnd(1,99); a=rnd(b,99);   ans=a-b; q=`${a}-${b}`; break; // resta
    case '×': a=rnd(2,10); b=rnd(2,10);   ans=a*b; q=`${a}×${b}`; break; // multiplicación
    case '÷': b=rnd(2,10); ans=rnd(2,10); a=b*ans; q=`${a}÷${b}`; break; // división exacta
    case '√': ans=rnd(2,12); a=ans*ans;   q=`√${a}`;             break; // raíz cuadrada
    case '^': a=rnd(2,9);  ans=a*a;       q=`${a}^2`;            break; // potencia al cuadrado
  }
  return {q,ans};                                  // devuelve pregunta y respuesta
}

/* crea bomba */
function spawnBomb(){                              // genera una nueva bomba
  if(gameOver || bombs.length>=3) return;          // máximo 3 simultáneas
  const p = randomProblem();                       // obtiene problema
  const speed=(H-25)/(20000/difficulty);           // velocidad según dificultad
  const shapes=['circle','missile','diamond'];
  bombs.push({x:rnd(60,W-60), y:-25, vy:speed, r:18, shape:shapes[rnd(0,shapes.length-1)], ...p});
}

/* keypad dinámico */
const keypad=document.getElementById('keypad');    // contenedor de botones
['1','2','3','4','5','6','7','8','9','0','⌫','⏎'].forEach(t=>{ // caracteres del keypad
  const b=document.createElement('button'); b.textContent=t; keypad.appendChild(b); // crea botón
});
let answer='';                                     // texto tecleado
function commit(){                                 // comprueba respuesta
  const idx=bombs.findIndex(b=>b.ans===+answer);   // busca coincidencia
  if(idx!==-1){ bombs.splice(idx,1); score++; beep.cloneNode().play(); } // acierto con sonido
  answer=''; updateHUD();                          // limpia y actualiza
}
keypad.addEventListener('click',e=>{               // clic en keypad
  const t=e.target.textContent;                    // texto del botón
  if(t==='⌫') answer=answer.slice(0,-1);           // borrar
  else if(t==='⏎') commit();                       // enviar
  else answer+=t;                                  // agrega dígito
  updateHUD();                                     // refresca
});
document.addEventListener('keydown',e=>{           // escucha teclado físico
  if(/[0-9]/.test(e.key)){ answer+=e.key; updateHUD();} // dígito
  else if(e.key==='Backspace'){ answer=answer.slice(0,-1); updateHUD();} // borrar
  else if(e.key==='Enter'){ commit(); }            // enviar
});

$('#restartBtn').addEventListener('click',()=>{     // reinicia el juego
  bombs=[]; score=0; lives=5; answer=''; gameOver=false;
  $('#restartBtn').classList.add('hidden');
  spawnBomb(); lastT=performance.now(); loop(lastT);
});

/* HUD */
function updateHUD(){                              // actualiza textos en pantalla
  $('#hud').textContent=`Aciertos ${score}  Errores ${lives}/5`; // puntajes
  typedDisplay.textContent=answer;                 // muestra lo escrito
}

/* bucle */
function update(dt){                               // lógica de movimiento
  bombs.forEach(b=> b.y+=b.vy*dt);                 // mueve cada bomba
  bombs=bombs.filter(b=>{ if(b.y-b.r>H){ lives--; boom.cloneNode().play(); return false; } return true; }); // elimina las que tocan suelo
  if(lives<=0){ gameOver=true; bombs=[]; }
  if(!gameOver && performance.now()>nextSpawn){ spawnBomb(); nextSpawn=performance.now()+3500/difficulty; } // spawns
}
function draw(){                                   // dibuja escena
  ctx.clearRect(0,0,W,H);                          // limpia canvas
  ctx.fillStyle='#0a0a2a'; ctx.fillRect(0,0,W,H);  // fondo oscuro
  ctx.fillStyle='#333';                            // color edificios
  for(let x=0;x<W;x+=50){                          // dibuja ciudad sencilla
    const h=rnd(20,80); ctx.fillRect(x,H-h,40,h);  // edificio
  }
  ctx.strokeStyle=ctx.fillStyle='white'; ctx.lineWidth=2; // estilo bombas
  bombs.forEach(b=>{                               // dibuja cada bomba
    switch(b.shape){                               // distintos cuerpos
      case 'circle':
        ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(b.x,b.y-b.r); ctx.lineTo(b.x,b.y-b.r-8); ctx.stroke();
        break;
      case 'missile':
        ctx.beginPath(); ctx.rect(b.x-10,b.y-20,20,40); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(b.x,b.y-30); ctx.lineTo(b.x-10,b.y-20); ctx.lineTo(b.x+10,b.y-20); ctx.closePath(); ctx.stroke();
        break;
      case 'diamond':
        ctx.beginPath(); ctx.moveTo(b.x,b.y-b.r); ctx.lineTo(b.x+b.r,b.y); ctx.lineTo(b.x,b.y+b.r); ctx.lineTo(b.x-b.r,b.y); ctx.closePath(); ctx.stroke();
        break;
    }
    ctx.font='16px "Share Tech Mono", monospace'; ctx.textAlign='center';
    ctx.fillText(b.q,b.x,b.y+5);                   // pregunta
  });
}
function loop(t){                                  // bucle principal
  const dt=t-lastT; lastT=t;                       // delta de tiempo
  if(!gameOver){ update(dt); draw(); requestAnimationFrame(loop); }
  else{
    ctx.fillStyle='rgba(0,0,0,.8)'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#fff'; ctx.font='48px "Share Tech Mono", monospace'; ctx.textAlign='center';
    ctx.fillText('GAME OVER',W/2,H/2);
  }
  updateHUD();                                     // actualiza HUD
}

/* inicio */
  spawnBomb();
  loop(performance.now());              // comienza el juego
} // fin juego
