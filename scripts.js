// utilidades
const $ = q => document.querySelector(q);
const rnd = (a,b)=>Math.floor(Math.random()*(b-a+1))+a;

// navegación por pestañas
const tabs=document.querySelectorAll('[role="tab"]');
const panels=document.querySelectorAll('[role="tabpanel"]');
tabs.forEach(t=>{
  t.addEventListener('click',()=>{
    tabs.forEach(tb=>tb.setAttribute('aria-selected','false'));
    panels.forEach(p=>p.hidden=true);
    t.setAttribute('aria-selected','true');
    document.getElementById(t.getAttribute('aria-controls')).hidden=false;
  });
});

// catálogo de cursos simple
autoRenderCursos();
function autoRenderCursos(){
  const cursos=["Aritmética","Álgebra","Geometría","Trigonometría","Cálculo diferencial","Cálculo integral","Probabilidad","Estadística"];
  const grid=document.getElementById('cursoGrid');
  if(!grid) return;
  cursos.forEach(c=>{
    const art=document.createElement('article');
    art.className='curso-card';
    art.innerHTML=`<h3>${c}</h3><p>Clases personalizadas</p>`;
    grid.appendChild(art);
  });
}

// formulario de contacto
const form=document.getElementById('contactForm');
const drop=document.getElementById('dropZone');
const fileBtn=document.getElementById('fileBtn');
const fileInput=document.createElement('input');
fileInput.type='file';fileInput.multiple=true;
const fileList=document.getElementById('fileList');
let files=[];
function updateFileList(){
  fileList.innerHTML='';
  files.forEach(f=>{
    const li=document.createElement('li');
    li.textContent=f.name;
    fileList.appendChild(li);
  });
}
fileBtn?.addEventListener('click',()=>fileInput.click());
fileInput.addEventListener('change',()=>{files=[...fileInput.files];updateFileList();});
['dragenter','dragover'].forEach(ev=>drop?.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('drag');}));
['dragleave','drop'].forEach(ev=>drop?.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('drag');}));
drop?.addEventListener('drop',e=>{files=[...e.dataTransfer.files];updateFileList();});
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const status=document.getElementById('formStatus');
  const fd=new FormData(form);
  if(files.length) files.forEach(f=>fd.append('archivos[]',f));
  status.textContent='enviando…';
  fetch('save.php',{method:'POST',body:fd}).then(r=>r.json()).then(r=>{
    status.textContent=r.ok?'recibido':(r.error||'error al enviar');
    if(r.ok){form.reset();files=[];updateFileList();}
  }).catch(()=>status.textContent='error al enviar');
});

// código del juego
/****************************************************************************
 * JUEGO DE BOMBAS
****************************************************************************/
const canvas = document.getElementById('game');
if(canvas){
  const ctx=canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;            // dimensiones del lienzo
  let bombs=[], score=0, lives=5, lastT=performance.now(), nextSpawn=0, gameOver=false; // estado del juego
  let difficulty=1, fallSpeed=3;                     // dificultad y velocidad
  $('#difficulty').oninput=e=>difficulty=+e.target.value; // actualiza dificultad
  $('#speed').oninput=e=>fallSpeed=+e.target.value;       // actualiza velocidad
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
  let a,b,q,ans,limit=20*difficulty;               // operandos y respuesta
  switch(op){                                      // según la operación
    case '+': a=rnd(1,limit); b=rnd(1,limit); ans=a+b; q=`${a}+${b}`; break; // suma
    case '-': a=rnd(1,limit); b=rnd(1,a);   ans=a-b; q=`${a}-${b}`; break; // resta
    case '×': a=rnd(2,10*difficulty); b=rnd(2,10*difficulty); ans=a*b; q=`${a}×${b}`; break; // multiplicación
    case '÷': b=rnd(2,10*difficulty); ans=rnd(2,10*difficulty); a=b*ans; q=`${a}÷${b}`; break; // división exacta
    case '√': ans=rnd(2,12*difficulty); a=ans*ans; q=`√${a}`; break; // raíz cuadrada
    case '^': a=rnd(2,9); b=rnd(2,Math.min(4,difficulty+1)); ans=a**b; q=`${a}^${b}`; break; // potencias
  }
  return {q,ans};
}

/* crea bomba */
function spawnBomb(){                              // genera una nueva bomba
  if(gameOver || bombs.length>=3) return;          // máximo 3 simultáneas
  const p = randomProblem();                       // obtiene problema
  const base=(H-25)/20000;                         // velocidad base
  const speed=base*fallSpeed;                      // ajusta por slider
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
