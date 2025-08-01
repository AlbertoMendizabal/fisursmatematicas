/****************************************************************************
 * UTILIDADES Y CONSTANTES
 ***************************************************************************/
const $ = q => document.querySelector(q);
const rnd = (a,b)=>Math.floor(Math.random()*(b-a+1))+a;

/****************************************************************************
 * TELÉFONO LED NEÓN
 ***************************************************************************/
(()=>{
  const led = $('#ledPhone');
  const palette = ['#00eaff','#ff4dff','#ffca28','#4dabf5','#81c784'];
  const chars="(+52) 56 1088 5357".split('');
  led.innerHTML = chars.map(ch=> ch===' ' ? ch :
      `<span style="color:${palette[rnd(0,palette.length-1)]}">${ch}</span>`).join('');
})();

/****************************************************************************
 * CURSOS Y TIENDA
 ***************************************************************************/
const cursosData=[
  ['CONTAR Y SUMAR Y RESTAR',['Sumas <100','Restas <100','Problemas básicos']],
  ['ARITMÉTICA',['Fracciones','Decimales','Conversión']],
  ['ÁLGEBRA',['Ecuaciones 1º','Factorización','Polinomios']],
  ['GEOMETRÍA',['Áreas','Perímetros','Pitágoras']],
  ['TRIGONOMETRÍA',['Seno/Coseno','Identidades','Aplicaciones']],
  ['GEOMETRÍA ANALÍTICA',['Rectas','Cónicas','Distancias']],
  ['CÁLCULO DIFERENCIAL',['Límites','Derivadas','Aplicaciones']],
  ['CÁLCULO INTEGRAL',['Integrales','Métodos','Área bajo curva']],
  ['ESTADÍSTICA',['Media','Desviación','Distribuciones']],
  ['PROBABILIDAD',['Eventos','Combinatoria','Laplace']],
  ['RESOLUCIÓN DE PROBLEMAS',['Estrategias','Lógica','Heurísticas']],
  ['LISTAS O TAREAS',['Organización','Pomodoro','Seguimiento']],
  ['GRUPO DE TAREAS',['Apoyo escolar','Sesiones','Feedback']],
  ['AJEDREZ PRINCIPIANTES',['Movimientos','Tácticas','Aperturas']],
  ['MULTIPLICACIONES',['Tablas 1-12','Trucos mentales','Velocidad']],
  ['NIVELACIÓN MATEMÁTICA DEDICADA',['Diagnóstico','Plan','Repaso']],
  ['¿EXAMEN DE MATEMÁTICAS MAÑANA?',['Diagnóstico rápido','Revisión express','Simulacro']],
  ['APRENDE A USAR CHAT GPT DE PAGA',['Interfaz','Prompts','Automatización']]
];
const today = new Date('2023-05-23');
const grid = document.getElementById('cursoGrid');

cursosData.forEach((c,i)=>{
  const ins = new Date(today); ins.setDate(ins.getDate()+i*3);
  const ini = new Date(today); ini.setDate(ini.getDate()+14+i*7);
  const fin = new Date(ini);   fin.setDate(fin.getDate()+14);
  const price = (15*200).toLocaleString('es-MX');
  const star  = c[0].startsWith('NIVEL') ? '<span class="gold">★</span>' : '';
  grid.insertAdjacentHTML('beforeend',`
    <article class="card" style="--freq:1s">
      ${star}<h3>${c[0]}</h3>
      <p><strong>Inscripción:</strong> ${ins.getDate()}/${ins.getMonth()+1}</p>
      <p><strong>Inicio:</strong> ${ini.getDate()}/${ini.getMonth()+1}</p>
      <p><strong>Fin:</strong> ${fin.getDate()}/${fin.getMonth()+1}</p>
      <p><strong>${price} MXN</strong></p>
      <button class="temarioBtn">Temario</button>
      <ul class="temario" hidden>${c[1].map(t=>`<li>${t}</li>`).join('')}</ul>
    </article>`);
});

grid.addEventListener('click',e=>{
  if(e.target.classList.contains('temarioBtn')){
    e.target.nextElementSibling.hidden = !e.target.nextElementSibling.hidden;
  }
});

/****************************************************************************
 * DRAG & DROP IMÁGENES EN CONTACTO
 ***************************************************************************/
const drop = $('#dropZone'), preview=$('#preview');
['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{
  e.preventDefault(); drop.classList.add('dragover');
}));
['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{
  e.preventDefault(); drop.classList.remove('dragover');
}));
drop.addEventListener('drop',e=>{
  const file=e.dataTransfer.files[0]; if(!file) return;
  const fr = new FileReader();
  fr.onload = ()=> {
    preview.innerHTML = file.type.startsWith('image')
      ? `<img src="${fr.result}" style="max-width:100%">`
      : `<pre>${fr.result.slice(0,1200)}…</pre>`;
  };
  file.type.startsWith('image') ? fr.readAsDataURL(file) : fr.readAsText(file);
});
drop.addEventListener('click',()=>{
  const inp=document.createElement('input');
  inp.type='file'; inp.accept='image/*';
  inp.onchange=()=> preview.textContent = `Archivo cargado: ${inp.files[0].name}`;
  inp.click();
});

/****************************************************************************
 * JUEGO DE BOMBAS (20 s al suelo, máx 3)
 ***************************************************************************/
const canvas = document.getElementById('game'), ctx=canvas.getContext('2d');
const W=canvas.width, H=canvas.height;
let bombs=[], score=0, lives=5, lastT=performance.now(), nextSpawn=0;

/* operaciones activas */
const activeOps=new Set(['+','-','×','÷','√','^']);
document.querySelectorAll('#opMenu input').forEach(chk=>{
  chk.onchange=e=> chk.checked ? activeOps.add(chk.dataset.op) : activeOps.delete(chk.dataset.op);
});

/* genera problema */
function randomProblem(){
  const op=[...activeOps][rnd(0,activeOps.size-1)];
  let a,b,q,ans;
  switch(op){
    case '+': a=rnd(1,99); b=rnd(1,99-a); ans=a+b; q=`${a}+${b}`; break;
    case '-': b=rnd(1,99); a=rnd(b,99);   ans=a-b; q=`${a}-${b}`; break;
    case '×': a=rnd(2,10); b=rnd(2,10);   ans=a*b; q=`${a}×${b}`; break;
    case '÷': b=rnd(2,10); ans=rnd(2,10); a=b*ans; q=`${a}÷${b}`; break;
    case '√': ans=rnd(2,12); a=ans*ans;   q=`√${a}`;             break;
    case '^': a=rnd(2,9);  ans=a*a;       q=`${a}^2`;            break;
  }
  return {q,ans};
}

/* crea bomba */
function spawnBomb(){
  if(bombs.length>=3) return;
  const p = randomProblem();
  bombs.push({x:rnd(60,W-60), y:-25, vy:(H-25)/20000, r:18, ...p});
}

/* keypad dinámico */
const keypad=document.getElementById('keypad');
['1','2','3','4','5','6','7','8','9','0','⌫','⏎'].forEach(t=>{
  const b=document.createElement('button'); b.textContent=t; keypad.appendChild(b);
});
let answer='';
function commit(){
  const idx=bombs.findIndex(b=>b.ans===+answer);
  if(idx!==-1){ bombs.splice(idx,1); score++; }
  answer=''; updateHUD();
}
keypad.addEventListener('click',e=>{
  const t=e.target.textContent;
  if(t==='⌫') answer=answer.slice(0,-1);
  else if(t==='⏎') commit();
  else answer+=t;
  updateHUD();
});
document.addEventListener('keydown',e=>{
  if(/[0-9]/.test(e.key)){ answer+=e.key; updateHUD();}
  else if(e.key==='Backspace'){ answer=answer.slice(0,-1); updateHUD();}
  else if(e.key==='Enter'){ commit(); }
});

/* HUD */
function updateHUD(){
  $('#hud').textContent=`Aciertos ${score}  Errores ${lives}/5  ▸ ${answer}`;
}

/* bucle */
function update(dt){
  bombs.forEach(b=> b.y+=b.vy*dt);
  bombs=bombs.filter(b=>{ if(b.y-b.r>H){ lives--; return false; } return true; });
  if(performance.now()>nextSpawn){ spawnBomb(); nextSpawn=performance.now()+3500; }
}
function draw(){
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='rgba(255,255,255,.05)';
  for(let i=0;i<40;i++) ctx.fillRect(rnd(0,W),rnd(0,H),2,2);
  ctx.strokeStyle=ctx.fillStyle='white'; ctx.lineWidth=2;
  bombs.forEach(b=>{
    ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(b.x,b.y-b.r); ctx.lineTo(b.x,b.y-b.r-8); ctx.stroke();
    ctx.font='16px Comic Sans MS'; ctx.textAlign='center';
    ctx.fillText(b.q,b.x,b.y+5);
  });
}
function loop(t){
  const dt=t-lastT; lastT=t;
  if(lives>0){ update(dt); draw(); requestAnimationFrame(loop); }
  else{
    ctx.fillStyle='rgba(0,0,0,.7)'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='white'; ctx.font='32px Comic Sans MS'; ctx.textAlign='center';
    ctx.fillText('GAME OVER',W/2,H/2);
  }
  updateHUD();
}

/* inicio */
spawnBomb(); loop(performance.now());
