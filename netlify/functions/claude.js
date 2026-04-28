<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Desafios da Aceleração Digital — Agentes IA</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #ffffff; --bg2: #f7f7f5; --bg3: #f0efe9;
    --text: #1a1a18; --text2: #5a5a56; --text3: #8a8a84;
    --border: rgba(0,0,0,0.10); --border2: rgba(0,0,0,0.18); --border3: rgba(0,0,0,0.25);
    --info-bg: #e6f1fb; --info-text: #185fa5;
    --radius-md: 8px; --radius-lg: 12px;
    --font: 'Segoe UI', system-ui, -apple-system, sans-serif;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #1c1c1a; --bg2: #252522; --bg3: #2e2e2b;
      --text: #f0efe9; --text2: #a8a89e; --text3: #6a6a62;
      --border: rgba(255,255,255,0.10); --border2: rgba(255,255,255,0.18); --border3: rgba(255,255,255,0.25);
      --info-bg: #0c3a6a; --info-text: #85b7eb;
    }
  }
  body { font-family: var(--font); background: var(--bg3); color: var(--text); min-height: 100vh; display: flex; flex-direction: column; }
  header { background: var(--bg); border-bottom: 0.5px solid var(--border); padding: 14px 24px; display: flex; align-items: center; gap: 14px; }
  .header-icon { width: 36px; height: 36px; border-radius: 10px; background: #1a1a18; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .header-icon svg { width: 20px; height: 20px; }
  .header-text h1 { font-size: 15px; font-weight: 500; color: var(--text); }
  .header-text p { font-size: 12px; color: var(--text2); margin-top: 1px; }
  .main { display: flex; flex: 1; }
  .sidebar { width: 220px; flex-shrink: 0; background: var(--bg); border-right: 0.5px solid var(--border); padding: 20px 14px; display: flex; flex-direction: column; gap: 4px; }
  .sidebar-label { font-size: 10px; font-weight: 500; color: var(--text3); text-transform: uppercase; letter-spacing: 0.6px; padding: 0 8px; margin-bottom: 6px; margin-top: 8px; }
  .sidebar-label:first-child { margin-top: 0; }
  .phase-btn { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: var(--radius-md); cursor: pointer; border: none; background: transparent; color: var(--text2); font-size: 13px; font-family: var(--font); text-align: left; width: 100%; transition: all 0.15s; }
  .phase-btn:hover { background: var(--bg2); color: var(--text); }
  .phase-btn.active { background: var(--bg2); color: var(--text); font-weight: 500; }
  .phase-num { width: 22px; height: 22px; border-radius: 50%; border: 0.5px solid var(--border2); display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; color: var(--text3); }
  .phase-btn.active .phase-num { background: var(--text); color: var(--bg); border-color: var(--text); }
  .content { flex: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; max-width: 760px; }
  .phase-header { background: var(--bg2); border-radius: var(--radius-lg); padding: 14px 18px; font-size: 13px; color: var(--text2); line-height: 1.6; border: 0.5px solid var(--border); }
  .phase-header strong { color: var(--text); }
  .agents-row { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
  @media (max-width: 600px) { .agents-row { grid-template-columns: 1fr; } }
  .agent-card { background: var(--bg); border-radius: var(--radius-lg); border: 0.5px solid var(--border); padding: 14px 15px; cursor: pointer; transition: all 0.15s; position: relative; }
  .agent-card:hover { border-color: var(--border3); }
  .agent-card.selected { border: 1.5px solid var(--info-text); }
  .agent-card.disabled { opacity: 0.38; cursor: not-allowed; pointer-events: none; }
  .agent-top { display: flex; align-items: center; gap: 10px; margin-bottom: 7px; }
  .agent-av { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; flex-shrink: 0; }
  .agent-name { font-size: 14px; font-weight: 500; color: var(--text); }
  .agent-role { font-size: 11px; color: var(--text2); margin-top: 1px; }
  .agent-desc { font-size: 12px; color: var(--text2); line-height: 1.5; }
  .avail-badge { position: absolute; top: 10px; right: 10px; font-size: 10px; padding: 2px 8px; border-radius: 10px; background: var(--info-bg); color: var(--info-text); }
  .chat-panel { background: var(--bg); border-radius: var(--radius-lg); border: 0.5px solid var(--border); overflow: hidden; }
  .chat-head { padding: 12px 16px; border-bottom: 0.5px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .chat-head-av { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; flex-shrink: 0; }
  .chat-head-name { font-size: 14px; font-weight: 500; color: var(--text); }
  .chat-head-sub { font-size: 12px; color: var(--text2); }
  .messages { padding: 16px; min-height: 240px; max-height: 400px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
  .msg { display: flex; gap: 8px; }
  .msg.user { flex-direction: row-reverse; }
  .bubble { max-width: 76%; padding: 10px 13px; border-radius: 12px; font-size: 13px; line-height: 1.6; color: var(--text); background: var(--bg2); border: 0.5px solid var(--border); }
  .msg.user .bubble { background: var(--bg); border-color: var(--border2); }
  .msg-av { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; margin-top: 2px; background: var(--bg2); border: 0.5px solid var(--border); color: var(--text2); }
  .typing { display: flex; align-items: center; gap: 4px; padding: 4px 2px; }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text3); animation: blink 1.2s infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink { 0%,80%,100%{opacity:0.2} 40%{opacity:1} }
  .input-row { display: flex; gap: 8px; padding: 10px 12px; border-top: 0.5px solid var(--border); }
  .msg-input { flex: 1; border: 0.5px solid var(--border2); border-radius: var(--radius-md); padding: 8px 12px; font-size: 13px; background: var(--bg2); color: var(--text); resize: none; font-family: var(--font); line-height: 1.5; }
  .msg-input:focus { outline: none; border-color: var(--border3); }
  .send-btn { padding: 8px 18px; border-radius: var(--radius-md); font-size: 13px; background: var(--bg); color: var(--text); border: 0.5px solid var(--border2); cursor: pointer; font-family: var(--font); white-space: nowrap; transition: all 0.15s; }
  .send-btn:hover { border-color: var(--border3); }
  .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .synth-section { display: flex; flex-direction: column; gap: 8px; }
  .synth-title { font-size: 14px; font-weight: 500; color: var(--text); }
  .synth-box { background: var(--bg2); border: 0.5px solid var(--border); border-radius: var(--radius-md); padding: 13px 15px; min-height: 80px; }
  .synth-text { font-size: 13px; color: var(--text2); line-height: 1.65; white-space: pre-wrap; }
  .synth-placeholder { font-size: 13px; color: var(--text3); font-style: italic; }
  .synth-btn { align-self: flex-start; padding: 7px 16px; border-radius: var(--radius-md); font-size: 13px; background: var(--bg); color: var(--text); border: 0.5px solid var(--border2); cursor: pointer; font-family: var(--font); transition: all 0.15s; }
  .synth-btn:hover { border-color: var(--border3); }
  .synth-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .empty-state { text-align: center; padding: 3rem 1rem; color: var(--text3); font-size: 13px; line-height: 1.7; }
  @media (max-width: 640px) {
    .main { flex-direction: column; }
    .sidebar { width: 100%; flex-direction: row; flex-wrap: wrap; border-right: none; border-bottom: 0.5px solid var(--border); padding: 12px; }
    .sidebar-label { display: none; }
    .phase-btn { width: auto; }
    .content { padding: 16px; }
  }
</style>
</head>
<body>
<header>
  <div class="header-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  </div>
  <div class="header-text">
    <h1>Desafios da Aceleração Digital</h1>
    <p>MBA Executivo — Simulação com agentes de IA</p>
  </div>
</header>
<div class="main">
  <nav class="sidebar">
    <div class="sidebar-label">Jornada</div>
    <button class="phase-btn active" onclick="setPhase(0)" id="pb0"><span class="phase-num">0</span>Contexto</button>
    <button class="phase-btn" onclick="setPhase(1)" id="pb1"><span class="phase-num">1</span>Imersão</button>
    <button class="phase-btn" onclick="setPhase(2)" id="pb2"><span class="phase-num">2</span>Diagnóstico</button>
    <button class="phase-btn" onclick="setPhase(3)" id="pb3"><span class="phase-num">3</span>Solução</button>
    <button class="phase-btn" onclick="setPhase(4)" id="pb4"><span class="phase-num">4</span>Validação</button>
  </nav>
  <div class="content" id="content"></div>
</div>
<script>
const PHASES = [
  { id:0, short:"Contexto", agents:[0,1,2,3], desc:"<strong>Antes de começar:</strong> apresente sua empresa para os agentes. Cada um vai fazer perguntas do seu ponto de vista para entender o negócio, o setor e o momento de transformação digital." },
  { id:1, short:"Imersão", agents:[0,3], desc:"<strong>Fase 1 — Imersão no problema:</strong> interaja com o Cliente Externo e o Time. O objetivo é entender o problema pela lente de quem sente o impacto lá fora e de quem vive o dia a dia dentro da empresa." },
  { id:2, short:"Diagnóstico", agents:[1,2], desc:"<strong>Fase 2 — Diagnóstico estratégico:</strong> leve o problema identificado para o Head de RH e o Head de Tecnologia. Eles vão provocar, questionar e ajudar o grupo a enquadrar melhor o desafio." },
  { id:3, short:"Solução", agents:[1,2], desc:"<strong>Fase 3 — Construção da solução:</strong> volte ao Head de RH e ao Head de Tech, agora como co-criadores. O objetivo é estruturar a solução com viabilidade estratégica, humana e técnica." },
  { id:4, short:"Validação", agents:[0,3], desc:"<strong>Fase 4 — Validação final:</strong> apresente a solução para o Cliente Externo e o Time. Eles vão checar se resolve o que realmente importa — pela visão de fora e de dentro da organização." }
];
const AGENTS = [
  { id:0, name:"Cliente Externo", role:"Voz do mercado", desc:"Avalia o valor real entregue. Não se importa com processos internos — só com o que mudou para ele.", bg:"#B5D4F4", fg:"#0C447C", initials:"CE",
    prompt(ctx,phase,synth){return `Você é um cliente externo de uma empresa no Brasil em processo de transformação digital. Representa o mercado, clientes finais e usuários.\n\nCONTEXTO DA EMPRESA:\n${ctx||"Ainda não fornecido. Pergunte ao grupo."}\n\nSÍNTESES ANTERIORES:\n${synth||"Nenhuma ainda."}\n\nFASE ATUAL: ${PHASES[phase].short}\n\n${phase===0?`ONBOARDING: Faça 2-3 perguntas para entender a empresa pelo olhar do cliente. Como é a experiência hoje? O que frustra? O que espera? Seja curioso e levemente exigente.`:phase===1?`IMERSÃO: Provoque com sua perspectiva de cliente. O que ainda está offline? Onde a experiência decepciona? O que concorrentes digitais já fazem melhor?`:`VALIDAÇÃO: Avalie a solução como cliente crítico. Isso muda sua experiência de verdade? Onde ainda vê lacunas?`}\n\nResponda em português do Brasil. Faça uma pergunta por vez. Máximo 160 palavras.`;}
  },
  { id:1, name:"Head de RH", role:"Parceiro estratégico", desc:"Pensa em cultura, capacidades e jornada do colaborador. Questiona tudo que é só projeto de TI.", bg:"#9FE1CB", fg:"#085041", initials:"RH",
    prompt(ctx,phase,synth){return `Você é Head de RH Estratégico, parceiro de negócio. Conhece Rogers (dados, clientes, concorrentes, inovação, valor) e ADKAR.\n\nCONTEXTO DA EMPRESA:\n${ctx||"Ainda não fornecido."}\n\nSÍNTESES ANTERIORES:\n${synth||"Nenhuma ainda."}\n\nFASE ATUAL: ${PHASES[phase].short}\n\n${phase===0?`ONBOARDING: Pergunte sobre maturidade de RH: como o RH é percebido, maiores dores das pessoas, se o RH tem assento nas decisões digitais.`:phase===2?`DIAGNÓSTICO: Questione o enquadramento. Sintoma ou causa raiz? Qual dimensão de Rogers está sendo ignorada? Onde o RH pode ser protagonista?`:phase===3?`CO-CRIAÇÃO: Ajude a estruturar a solução. Como construir jornada das pessoas? Quais capacidades desenvolver? Como engajar parceiros estratégicos internos?`:`VALIDAÇÃO: A solução considera a experiência do colaborador? Existe plano de gestão da mudança? O RH é protagonista ou executor?`}\n\nResponda em português do Brasil. Faça uma pergunta por vez. Máximo 160 palavras.`;}
  },
  { id:2, name:"Head de Tecnologia", role:"Viabilidade técnica", desc:"Foco em dados, plataformas e escalabilidade. Sem arquitetura certa, tudo vira gambiarra.", bg:"#F5C4B3", fg:"#712B13", initials:"TI",
    prompt(ctx,phase,synth){return `Você é Head de Tecnologia (CTO/CDO) com visão de negócio digital. Conhece as 5 dimensões de Rogers. Questiona soluções sem viabilidade técnica.\n\nCONTEXTO DA EMPRESA:\n${ctx||"Ainda não fornecido."}\n\nSÍNTESES ANTERIORES:\n${synth||"Nenhuma ainda."}\n\nFASE ATUAL: ${PHASES[phase].short}\n\n${phase===0?`ONBOARDING: Entenda a maturidade digital: quais sistemas o RH usa, se há cultura de dados, qual o maior gargalo tecnológico.`:phase===2?`DIAGNÓSTICO: Questione pelo ângulo técnico. Quais dados existem ou faltam? O problema é de tecnologia, processo ou mindset? Qual dimensão de Rogers está sendo negligenciada?`:phase===3?`CO-CRIAÇÃO: Qual a menor versão que já gera valor? Quais plataformas já existem? Como escalar sem criar silos? Como medir com dados?`:`VALIDAÇÃO: A solução é tecnicamente realizável? Os dados necessários existem? Risco de criar mais um sistema legado?`}\n\nResponda em português do Brasil. Faça uma pergunta por vez. Máximo 160 palavras.`;}
  },
  { id:3, name:"Time", role:"Voz do colaborador", desc:"Chão de fábrica. Medo, resistência, sobrecarga. Na prática, as coisas não funcionam como planejado.", bg:"#F4C0D1", fg:"#72243E", initials:"TM",
    prompt(ctx,phase,synth){return `Você representa o time — colaboradores que vivem o dia a dia. Cético, mas com esperança quando as coisas fazem sentido.\n\nCONTEXTO DA EMPRESA:\n${ctx||"Ainda não fornecido."}\n\nSÍNTESES ANTERIORES:\n${synth||"Nenhuma ainda."}\n\nFASE ATUAL: ${PHASES[phase].short}\n\n${phase===0?`ONBOARDING: Pergunte como é trabalhar nessa empresa: como o time percebe as mudanças digitais, o que causa mais ansiedade, o que nunca foi perguntado ao time.`:phase===1?`IMERSÃO: Traga o chão de fábrica. O que na teoria funciona mas na prática não? Onde a liderança está desconectada? Quais mudanças foram empurradas sem escuta?`:`VALIDAÇÃO: Avalie com o olhar de quem vai implementar. Isso muda minha rotina para melhor ou pior? Quem me preparou? Onde vejo que não vai funcionar na prática?`}\n\nResponda em português do Brasil. Use linguagem direta e coloquial. Faça uma pergunta por vez. Máximo 150 palavras.`;}
  }
];

let currentPhase=0, selectedAgent=null, companyContext="", conversations={}, syntheses={}, isLoading=false;
function key(p,a){return `${p}_${a}`;}
function getHistory(p,a){return conversations[key(p,a)]||[];}
function addMsg(p,a,role,content){const k=key(p,a);if(!conversations[k])conversations[k]=[];conversations[k].push({role,content});if(role==="user"&&p===0)companyContext+="\n"+content;}
function synthText(){return Object.entries(syntheses).map(([k,v])=>`${PHASES[+k].short}:\n${v}`).join("\n\n");}

async function callAPI(system, messages) {
  const resp = await fetch("/.netlify/functions/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system, messages })
  });
  if (!resp.ok) throw new Error("Erro " + resp.status);
  const data = await resp.json();
  return data.text || "";
}

function render(){
  PHASES.forEach(p=>{const b=document.getElementById(`pb${p.id}`);b.className="phase-btn"+(currentPhase===p.id?" active":"");});
  const active=PHASES[currentPhase].agents;
  const agent=selectedAgent!==null?AGENTS[selectedAgent]:null;
  const history=agent?getHistory(currentPhase,selectedAgent):[];
  document.getElementById("content").innerHTML=`
    <div class="phase-header">${PHASES[currentPhase].desc}</div>
    <div class="agents-row">${AGENTS.map(a=>{const on=active.includes(a.id),sel=selectedAgent===a.id;return `<div class="agent-card ${sel?"selected":""} ${!on?"disabled":""}" onclick="pickAgent(${a.id})"><div class="avail-badge">${on?"disponível":"indisponível"}</div><div class="agent-top"><div class="agent-av" style="background:${a.bg};color:${a.fg}">${a.initials}</div><div><div class="agent-name">${a.name}</div><div class="agent-role">${a.role}</div></div></div><div class="agent-desc">${a.desc}</div></div>`;}).join("")}</div>
    ${!agent?`<div class="empty-state">Selecione um agente acima para iniciar a conversa.</div>`:`
    <div class="chat-panel">
      <div class="chat-head"><div class="chat-head-av" style="background:${agent.bg};color:${agent.fg}">${agent.initials}</div><div><div class="chat-head-name">${agent.name}</div><div class="chat-head-sub">${agent.role} · Fase ${currentPhase} — ${PHASES[currentPhase].short}</div></div></div>
      <div class="messages" id="msgArea">
        ${history.length===0?`<div class="empty-state" style="padding:2rem 1rem">${currentPhase===0?`Apresente sua empresa para ${agent.name}.`:`${agent.name} está pronto. Inicie a conversa.`}</div>`:history.map(m=>bubbleHTML(m,agent)).join("")}
        ${isLoading?`<div class="msg"><div class="msg-av" style="background:${agent.bg};color:${agent.fg}">${agent.initials[0]}</div><div class="bubble"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>`:""}
      </div>
      <div class="input-row"><textarea class="msg-input" id="msgInput" rows="2" placeholder="Digite sua mensagem... (Enter para enviar)" onkeydown="handleKey(event)"></textarea><button class="send-btn" onclick="sendMsg()" ${isLoading?"disabled":""}>Enviar</button></div>
    </div>
    <div class="synth-section">
      <div class="synth-title">Síntese desta fase</div>
      <div class="synth-box">${syntheses[currentPhase]?`<div class="synth-text">${syntheses[currentPhase]}</div>`:`<div class="synth-placeholder">Clique em "Gerar síntese" ao terminar de conversar com os agentes disponíveis nesta fase.</div>`}</div>
      <button class="synth-btn" id="synthBtn" onclick="genSynth()">Gerar síntese desta fase ↗</button>
    </div>`}
  `;
  setTimeout(()=>{const a=document.getElementById("msgArea");if(a)a.scrollTop=a.scrollHeight;},40);
}

function bubbleHTML(m,agent){
  if(m.role==="user")return `<div class="msg user"><div class="msg-av">U</div><div class="bubble">${esc(m.content)}</div></div>`;
  return `<div class="msg"><div class="msg-av" style="background:${agent.bg};color:${agent.fg}">${agent.initials[0]}</div><div class="bubble">${esc(m.content)}</div></div>`;
}
function esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>");}

function setPhase(id){currentPhase=id;selectedAgent=PHASES[id].agents[0];render();if(getHistory(currentPhase,selectedAgent).length===0)triggerOpener(selectedAgent);}
function pickAgent(id){if(!PHASES[currentPhase].agents.includes(id))return;selectedAgent=id;render();if(getHistory(currentPhase,id).length===0)triggerOpener(id);}

async function triggerOpener(agentId){
  const agent=AGENTS[agentId];isLoading=true;render();
  try{const reply=await callAPI(agent.prompt(companyContext,currentPhase,synthText()),[{role:"user",content:"Olá, somos um grupo do MBA e queremos iniciar nossa conversa com você."}]);addMsg(currentPhase,agentId,"assistant",reply);}
  catch(e){addMsg(currentPhase,agentId,"assistant","Olá! Estou pronto para conversar. Como posso ajudar nesta fase?");}
  isLoading=false;render();
}
function handleKey(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMsg();}}
async function sendMsg(){
  const input=document.getElementById("msgInput");
  const text=input?.value?.trim();
  if(!text||isLoading||selectedAgent===null)return;
  input.value="";addMsg(currentPhase,selectedAgent,"user",text);isLoading=true;render();
  const agent=AGENTS[selectedAgent];
  try{const reply=await callAPI(agent.prompt(companyContext,currentPhase,synthText()),getHistory(currentPhase,selectedAgent).map(m=>({role:m.role,content:m.content})));addMsg(currentPhase,selectedAgent,"assistant",reply);}
  catch(e){addMsg(currentPhase,selectedAgent,"assistant","Erro na conexão. Tente novamente.");}
  isLoading=false;render();
}
async function genSynth(){
  const btn=document.getElementById("synthBtn");if(btn){btn.disabled=true;btn.textContent="Gerando síntese...";}
  const convs=PHASES[currentPhase].agents.map(id=>{const h=getHistory(currentPhase,id);if(!h.length)return null;return `--- ${AGENTS[id].name} ---\n`+h.map(m=>`${m.role==="user"?"Grupo":AGENTS[id].name}: ${m.content}`).join("\n");}).filter(Boolean).join("\n\n");
  if(!convs){if(btn){btn.disabled=false;btn.textContent="Gerar síntese desta fase ↗";}return;}
  try{
    const reply=await callAPI(`Você é facilitador de MBA. Analise as conversas e gere síntese em português do Brasil com: 1. Principais tensões identificadas (máximo 3). 2. Insights para a próxima fase. 3. Perguntas em aberto. Direto, claro, máximo 280 palavras.`,[{role:"user",content:`Fase: ${PHASES[currentPhase].short}\n\n${convs}`}]);
    syntheses[currentPhase]=reply;
  }catch(e){syntheses[currentPhase]="Erro ao gerar síntese. Tente novamente.";}
  if(btn){btn.disabled=false;btn.textContent="Gerar síntese desta fase ↗";}render();
}
render();
</script>
</body>
</html>exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

 const API_KEY = process.env.ANTHROPIC_API_KEY;;

  try {
    const { system, messages } = JSON.parse(event.body);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system,
        messages
      })
    });

    const text = await response.text();
    console.log("Anthropic raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch(e) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "JSON parse failed", raw: text })
      };
    }

    if (data.error) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: data.error.message })
      };
    }

    const replyText = data?.content?.[0]?.text || "";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: replyText })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message })
    };
  }
};

