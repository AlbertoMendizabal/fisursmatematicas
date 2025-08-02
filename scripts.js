/****************************************************************************
 * UTILIDADES Y CONSTANTES
 ****************************************************************************/
const $ = q => document.querySelector(q);          // atajo para document.querySelector
const rnd = (a,b)=>Math.floor(Math.random()*(b-a+1))+a; // número entero aleatorio entre a y b

/****************************************************************************
 * TELÉFONO LED NEÓN
 ****************************************************************************/
(()=>{
  const led = $('#ledPhone');                      // referencia al contenedor del teléfono
  const palette = ['#00eaff','#ff4dff','#ffca28','#4dabf5','#81c784']; // colores neón
  const chars="(+52) 56 1088 5357".split('');     // número telefónico en arreglo
  led.innerHTML = chars.map(ch=> ch===' ' ? ch :   // para cada carácter
      `<span style="color:${palette[rnd(0,palette.length-1)]}">${ch}</span>`).join(''); // span con color aleatorio
})();

/****************************************************************************
 * CURSOS Y TIENDA
 ****************************************************************************/
const cursosData=[                                  // listado de cursos y temas
  ['ARITMÉTICA',['Naturales','Fracciones','Decimales','Proporciones']],
  ['ÁLGEBRA',['Ecuaciones','Factorización','Polinomios','Inecuaciones']],
  ['GEOMETRÍA',['Ángulos','Áreas','Volúmenes','Pitágoras']],
  ['TRIGONOMETRÍA',['Razones','Identidades','Leyes de senos y cosenos']],
  ['GEOMETRÍA ANALÍTICA',['Recta','Cónicas','Distancia y pendiente']],
  ['CÁLCULO DIFERENCIAL',['Límites','Derivadas','Aplicaciones']],
  ['CÁLCULO INTEGRAL',['Integrales indefinidas','Métodos','Área bajo curva']],
  ['ÁLGEBRA LINEAL',['Vectores','Matrices','Determinantes']],
  ['ECUACIONES DIFERENCIALES',['Primer orden','Segundo orden','Modelos']],
  ['FISURAS MATEMÁTICAS (Nivelación Académica)',['Diagnóstico','Repaso','Técnicas de estudio']],
  ['AJEDREZ',['Movimientos','Tácticas básicas','Estrategia']]
];
const today = new Date('2025-08-02');               // fecha de referencia actual
const grid = document.getElementById('cursoGrid');   // contenedor de tarjetas

cursosData.forEach((c,i)=>{                         // para cada curso
  const ini = new Date('2025-08-18');               // fecha base de inicio
  ini.setDate(ini.getDate()+i*7);                   // cada curso inicia una semana después
  const ins = new Date(ini); ins.setDate(ins.getDate()-14); // inscripción 2 semanas antes
  const fin = new Date(ini); fin.setDate(fin.getDate()+14); // fin dos semanas después
  const price = 600;                                 // precio por sesión de 2h
  const delta = Math.ceil((ini - today)/86400000);  // días hasta el inicio
  let freq;                                         // frecuencia de vibración
  if(delta<=2) freq=0.2;                            // muy cercano = vibración rápida
  else if(delta<=4) freq=0.5;                       // a 4 días
  else if(delta<=6) freq=0.8;                       // a 6 días
  else freq=1.2;                                    // lejos = vibración lenta
  grid.insertAdjacentHTML('beforeend',`            
    <article class="card" style="--freq:${freq}s">
      <h3>${c[0]}</h3>
      <p><strong>Inscripción:</strong> ${ins.getDate()}/${ins.getMonth()+1}</p>
      <p><strong>Inicio:</strong> ${ini.getDate()}/${ini.getMonth()+1}</p>
      <p><strong>Fin:</strong> ${fin.getDate()}/${fin.getMonth()+1}</p>
      <p><strong>$${price} MXN</strong></p>
      <button class="temarioBtn">Temario</button>
      <ul class="temario" hidden>${c[1].map(t=>`<li>${t}</li>`).join('')}</ul>
      <button class="agendarBtn">Agendar</button>
      <form class="agendaForm" hidden>
        <input type="date" required />
        <input type="text" placeholder="Nombre" required />
        <input type="tel" placeholder="WhatsApp" required />
        <input type="email" placeholder="Correo" required />
        <button type="submit">Apartar</button>
      </form>
    </article>`);                                   // inserta tarjeta
});

grid.addEventListener('click',e=>{                   // escucha clics en el grid
  if(e.target.classList.contains('temarioBtn'))      // si se presiona Temario
    e.target.nextElementSibling.hidden = !e.target.nextElementSibling.hidden; // mostrar u ocultar lista
  if(e.target.classList.contains('agendarBtn'))      // si se presiona Agendar
    e.target.nextElementSibling.hidden = !e.target.nextElementSibling.hidden; // mostrar formulario
});

grid.addEventListener('submit',e=>{                  // envío de formulario de agenda
  if(e.target.classList.contains('agendaForm')){     // verifica que sea el formulario correcto
    e.preventDefault();                              // evita recarga
    alert('¡Sesión apartada!');                      // mensaje simple
    e.target.hidden=true;                            // oculta formulario
  }
});

/****************************************************************************
 * FORMULARIO DE CONTACTO
 ****************************************************************************/
$('#contactForm').addEventListener('submit',e=>{     // manejo de envío
  e.preventDefault();                                // evita recarga
  alert('Mensaje enviado');                          // aviso
  e.target.reset();                                  // limpia campos
});

/****************************************************************************
 * LOGIN Y EDICIÓN
 ****************************************************************************/
const loginForm=$('#loginForm');                     // formulario de login
const adminForm=$('#adminForm');                     // formulario de edición
loginForm.addEventListener('submit',e=>{             // evento submit del login
  e.preventDefault();                                // evita recarga
  const pwd=$('#pwd').value.trim();                  // obtiene contraseña
  if(pwd==='2025'||pwd==='1991'){                    // contraseñas válidas
    loginForm.hidden=true;                           // oculta login
    adminForm.hidden=false;                          // muestra edición
  }else alert('Contraseña incorrecta');              // aviso de error
});
$('#saveCourse').addEventListener('click',()=>{      // botón guardar
  alert('Datos guardados (simulado)');               // simulación de guardado
});

/****************************************************************************
 * DRAG & DROP IMÁGENES EN CONTACTO
 ****************************************************************************/
const drop = $('#dropZone'), preview=$('#preview');  // referencias a zona y vista previa
['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{ // eventos de arrastre
  e.preventDefault(); drop.classList.add('dragover');             // evita abrir archivo y agrega estilo
}));
['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{    // eventos de salida y suelta
  e.preventDefault(); drop.classList.remove('dragover');          // quita estilo
}));
drop.addEventListener('drop',e=>{                   // al soltar archivo
  const file=e.dataTransfer.files[0]; if(!file) return; // toma primer archivo
  const fr = new FileReader();                     // lector de archivos
  fr.onload = ()=> {                               // cuando termina de leer
    preview.innerHTML = file.type.startsWith('image') // si es imagen
      ? `<img src="${fr.result}" style="max-width:100%">`      // muestra imagen
      : `<pre>${fr.result.slice(0,1200)}…</pre>`;   // o texto
  };
  file.type.startsWith('image') ? fr.readAsDataURL(file) : fr.readAsText(file); // lee según tipo
});
drop.addEventListener('click',()=>{                 // al hacer clic en zona
  const inp=document.createElement('input');        // crea input file
  inp.type='file'; inp.accept='image/*';            // solo imágenes
  inp.onchange=()=> preview.textContent = `Archivo cargado: ${inp.files[0].name}`; // muestra nombre
  inp.click();                                      // dispara selector
});

/****************************************************************************
 * JUEGO DE BOMBAS
 ****************************************************************************/
const canvas = document.getElementById('game'), ctx=canvas.getContext('2d'); // canvas y contexto
const W=canvas.width, H=canvas.height;            // dimensiones del lienzo
let bombs=[], score=0, lives=5, lastT=performance.now(), nextSpawn=0; // estado del juego
let difficulty=1;                                  // nivel de dificultad
$('#difficulty').oninput=e=>difficulty=+e.target.value; // actualiza dificultad
const typedDisplay=$('#typedDisplay');             // display de lo escrito
const beep=new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'); // sonido al acertar

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
  if(bombs.length>=3) return;                      // máximo 3 simultáneas
  const p = randomProblem();                       // obtiene problema
  const speed=(H-25)/(20000/difficulty);           // velocidad según dificultad
  bombs.push({x:rnd(60,W-60), y:-25, vy:speed, r:18, ...p}); // añade bomba
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

/* HUD */
function updateHUD(){                              // actualiza textos en pantalla
  $('#hud').textContent=`Aciertos ${score}  Errores ${lives}/5`; // puntajes
  typedDisplay.textContent=answer;                 // muestra lo escrito
}

/* bucle */
function update(dt){                               // lógica de movimiento
  bombs.forEach(b=> b.y+=b.vy*dt);                 // mueve cada bomba
  bombs=bombs.filter(b=>{ if(b.y-b.r>H){ lives--; return false; } return true; }); // elimina las que tocan suelo
  if(performance.now()>nextSpawn){ spawnBomb(); nextSpawn=performance.now()+3500/difficulty; } // spawns
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
    ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.stroke(); // cuerpo
    ctx.beginPath(); ctx.moveTo(b.x,b.y-b.r); ctx.lineTo(b.x,b.y-b.r-8); ctx.stroke(); // mecha
    ctx.font='16px Comic Sans MS'; ctx.textAlign='center';
    ctx.fillText(b.q,b.x,b.y+5);                   // pregunta
  });
}
function loop(t){                                  // bucle principal
  const dt=t-lastT; lastT=t;                       // delta de tiempo
  if(lives>0){ update(dt); draw(); requestAnimationFrame(loop); } // continúa
  else{                                            // game over
    ctx.fillStyle='rgba(0,0,0,.7)'; ctx.fillRect(0,0,W,H);       // fondo oscuro
    ctx.fillStyle='white'; ctx.font='32px Comic Sans MS'; ctx.textAlign='center';
    ctx.fillText('GAME OVER',W/2,H/2);             // mensaje final
  }
  updateHUD();                                     // actualiza HUD
}

/* inicio */
spawnBomb(); loop(performance.now());              // comienza el juego
