(function(){
  var MIN_SHOW_MS = 3200; // 最少顯示咁耐，確保睇得清楚（加多兩秒）
  var startTime = Date.now();
  function hideSplash(){
    var s = document.getElementById('ccmv-splash');
    if(!s) return;
    var elapsed = Date.now() - startTime;
    var wait = Math.max(0, MIN_SHOW_MS - elapsed);
    setTimeout(function(){
      s.style.opacity = '0';
      setTimeout(function(){ s.remove(); }, 400);
    }, wait);
  }
  var fallback = setTimeout(hideSplash, 4500);
  window.addEventListener('load', function(){
    clearTimeout(fallback);
    hideSplash();
  });
})();

const tripData = window.CCMV_TRIP_DATA || { planId:"ccmv-saigon-2026", title:"CCMV Journey Planner", subtitle:"Vietnam 2026", reviewers:[{id:"Christal",name:"Christal",emoji:"🧸"},{id:"Crystal",name:"Crystal",emoji:"👓"},{id:"Mero",name:"Mero",emoji:"✝️"},{id:"Vivian",name:"Vivian",emoji:"👟"}] };

const CCMV_SUPABASE={
  url:'https://dafgbqygccvctifrevpa.supabase.co',
  anonKey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZmdicXlnY2N2Y3RpZnJldnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNTQyOTksImV4cCI6MjA5ODgzMDI5OX0.9dB6WV8BldV6rGze3QuisIaj3qnUV7zSzdo_eGPBbrA',
  planId:tripData.planId||'ccmv-saigon-2026',
  table:'planner_reviews'
};
let supabaseClient=null;
let supabaseReady=false;
let supabaseChannel=null;
function isSupabaseConfigured(){return Boolean(CCMV_SUPABASE.url && CCMV_SUPABASE.anonKey && CCMV_SUPABASE.url.startsWith('https://'));}
function setSyncStatus(text,mode='offline'){
  const el=document.querySelector('[data-sync-status]');
  if(!el) return;
  el.textContent=text;
  el.className='sync-pill '+(mode==='online'?'online':mode==='warn'?'warn':'');
}
function loadScript(src){return new Promise((resolve,reject)=>{const existing=[...document.scripts].find(s=>s.src===src); if(existing) return resolve(); const script=document.createElement('script'); script.src=src; script.onload=resolve; script.onerror=reject; document.head.appendChild(script);});}
function remoteItemId(kind,id){return kind==='activity'?id:`${kind}:${id}`;}
function formatRemoteTime(value){
  if(!value) return stamp();
  try{return new Date(value).toLocaleTimeString([], {hour:'numeric', minute:'2-digit'});}
  catch(e){return stamp();}
}
function applyRemoteReview(row){
  if(!row || !row.item_id || !row.reviewer) return;
  if(!row.reaction && !row.comment) return;
  const item=String(row.item_id);
  const person=row.reviewer;
  const time=formatRemoteTime(row.updated_at);
  if(item.startsWith('wrap:')){
    const id=item.replace(/^wrap:/,'');
    if(row.reaction) localStorage.setItem(reviewKey('wrap-status',id,person),row.reaction);
    localStorage.setItem(reviewKey('wrap-comment',id,person),row.comment||'');
    localStorage.setItem(reviewKey('wrap-comment-edited',id,person),time);
    setSyncNote('wrap',id,'Synced to Supabase',person);
    return;
  }
  if(item.startsWith('planner:')){
    const id=item.replace(/^planner:/,'');
    localStorage.setItem(reviewKey('planner-note',id,'Planner'),row.comment||'');
    localStorage.setItem(reviewKey('planner-note-edited',id,'Planner'),time);
    return;
  }
  if(item.startsWith('overall:')){
    const id=item.replace(/^overall:/,'');
    if(row.reaction) localStorage.setItem(reviewKey('overall-status',id,person),row.reaction);
    localStorage.setItem(reviewKey('overall-comment',id,person),row.comment||'');
    localStorage.setItem(reviewKey('overall-comment-edited',id,person),time);
    setSyncNote('overall',id,'Synced to Supabase',person);
    return;
  }
  if(row.reaction) localStorage.setItem(reviewKey('reaction',item,person),row.reaction);
  localStorage.setItem(reviewKey('comment',item,person),row.comment||'');
  localStorage.setItem(reviewKey('comment-edited',item,person),time);
  setSyncNote('activity',item,'Synced to Supabase',person);
}
async function loadSupabaseReviews(){
  if(!supabaseClient) return;
  const {data,error}=await supabaseClient
    .from(CCMV_SUPABASE.table)
    .select('trip_id,item_id,reviewer,reaction,comment,updated_at')
    .eq('trip_id',CCMV_SUPABASE.planId);
  if(error) throw error;
  (data||[]).forEach(applyRemoteReview);
}
async function upsertSupabaseReview(kind,id,{reaction=null,comment=null}={}){
  if(!supabaseReady || !supabaseClient) return false;
  const item_id=remoteItemId(kind,id);
  try{
    setSyncStatus('Syncing…','warn');
    const payload={
      trip_id:CCMV_SUPABASE.planId,
      item_id,
      reviewer:currentReviewer,
      reaction:reaction||null,
      comment:comment==null?'':comment,
      updated_at:new Date().toISOString()
    };
    const {error}=await supabaseClient
      .from(CCMV_SUPABASE.table)
      .upsert(payload,{onConflict:'trip_id,item_id,reviewer'});
    if(error) throw error;
    setSyncStatus('✓ Supabase synced','online');
    return true;
  }catch(err){
    console.warn('CCMV Supabase sync failed:',err);
    setSyncStatus('Saved offline · sync failed','warn');
    return false;
  }
}

function subscribeSupabaseRealtime(){
  if(!supabaseReady || !supabaseClient || supabaseChannel) return;
  try{
    supabaseChannel=supabaseClient
      .channel('ccmv-planner-reviews')
      .on('postgres_changes',{event:'*',schema:'public',table:CCMV_SUPABASE.table,filter:`trip_id=eq.${CCMV_SUPABASE.planId}`},payload=>{
        if(payload.new) applyRemoteReview(payload.new);
        renderAll();
        setSyncStatus('✓ Realtime updated','online');
      })
      .subscribe(status=>{
        if(status==='SUBSCRIBED') setSyncStatus('Supabase connected · realtime paused','online');
      });
  }catch(err){
    console.warn('CCMV realtime setup failed:',err);
  }
}
function syncNoteKey(kind,id,person=currentReviewer){return `ccmv10:sync-note:${kind}:${id}:${person}`;}
function setSyncNote(kind,id,text,person=currentReviewer){
  const key=syncNoteKey(kind,id,person);
  if(text) localStorage.setItem(key,text); else localStorage.removeItem(key);
}
async function initSupabaseReadiness(){
  if(!isSupabaseConfigured()){setSyncStatus('Offline mode · localStorage active'); return;}
  try{
    setSyncStatus('Connecting Supabase…','warn');
    await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
    supabaseClient=window.supabase.createClient(CCMV_SUPABASE.url,CCMV_SUPABASE.anonKey);
    const {error}=await supabaseClient.from(CCMV_SUPABASE.table).select('id').eq('trip_id',CCMV_SUPABASE.planId).limit(1);
    if(error){setSyncStatus('Supabase connected · table/policy issue','warn'); console.warn('CCMV Supabase schema check:',error.message); return;}
    supabaseReady=true;
    await loadSupabaseReviews();
    renderAll();
    /* Build 11.3: realtime paused by design; refresh-based sync only. */
    setSyncStatus('Supabase connected · refresh sync','online');
  }catch(err){
    console.warn('CCMV Supabase readiness failed:',err);
    setSyncStatus('Offline fallback · Supabase unavailable','warn');
  }
}
const reviewers=(tripData.reviewers||[]).reduce((acc,r)=>{acc[r.id]=`${r.emoji} ${r.name}`;return acc;}, {Christal:'🧸 Christal',Crystal:'👓 Crystal',Mero:'✝️ Mero',Vivian:'👟 Vivian'});
const reviewerNames=Object.keys(reviewers);
let currentReviewer=localStorage.getItem('ccmv:reviewer')||'Crystal';
let currentFilter=localStorage.getItem('ccmv:reviewFilter')||'All';
const pages=[...document.querySelectorAll('[data-page]')];
const esc=s=>(s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const stamp=()=>new Date().toLocaleTimeString([], {hour:'numeric', minute:'2-digit'});
const LEGACY_ID_MAP = {
  'pho-sol-day1':'day1-pho-sol',
  'activity-1-1':'day1-classic-landmarks',
  'nha-suga-premium':'day1-nha-suga-premium',
  'omakase-tiger':'day1-omakase-tiger',
  'c-m-t-m-m-c':'day2-com-tam-moc',
  'saigon-cooking-class':'day2-saigon-cooking-class',
  'm-c-kim-spa':'day2-moc-kim-spa',
  'l-ne':'day2-lune',
  'quan-thuy-94-day3':'day3-quan-thuy-94',
  'pink-church-day3':'day3-pink-church',
  'afternoon-tea':'day3-afternoon-tea',
  'm-c-h-ng-wellness':'day3-moc-huong-wellness',
  'little-bear':'day3-little-bear',
  'the-running-bean':'day4-the-running-bean',
  'pizza-4p-s':'day4-pizza-4ps',
  'temple-leaf-spa-land':'day4-temple-leaf-spa-land',
  'quince':'day4-quince',
  'ph-vi-t-nam':'day5-pho-viet-nam',
  'b-p-m-n':'day5-bep-me-in',
  'h-spa':'day5-h-spa',
  'day1':'day1-wrap',
  'day2':'day2-wrap',
  'day3':'day3-wrap',
  'day4':'day4-wrap',
  'day5':'day5-wrap',
  'journey':'trip-overall-review'
};
function safeCardKey(card){
  const key=card?.dataset?.card;
  if(!key){
    console.warn('Missing stable data-card id on review item:', card);
    return 'missing-review-id';
  }
  return key;
}
function reviewKey(type,id,person=currentReviewer){return `ccmv09:${type}:${id}:${person}`;}
function pendingKey(type,id,person=currentReviewer){return `ccmv09:pending:${type}:${id}:${person}`;}
function hasSavedActivity(id,person=currentReviewer){return !!(localStorage.getItem(reviewKey('reaction',id,person))||localStorage.getItem(reviewKey('comment-edited',id,person))||localStorage.getItem(reviewKey('comment',id,person)));}
function hasSavedWrap(id,person=currentReviewer){return !!(localStorage.getItem(reviewKey('wrap-status',id,person))||localStorage.getItem(reviewKey('wrap-comment-edited',id,person))||localStorage.getItem(reviewKey('wrap-comment',id,person)));}
function ensureCommentControls(box,kind='activity'){
  const actions=box.querySelector('.comment-actions');
  if(!actions) return;
  let save=actions.querySelector(kind==='activity'?'[data-save]':kind==='wrap'?'[data-wrap-save]':'[data-overall-save]');
  if(!save){ save=document.createElement('button'); save.textContent='Save'; save.setAttribute(kind==='activity'?'data-save':kind==='wrap'?'data-wrap-save':'data-overall-save',''); actions.prepend(save); }
  if(!actions.querySelector('[data-edit]')){ const b=document.createElement('button'); b.textContent='Edit'; b.setAttribute('data-edit',''); actions.insertBefore(b, save.nextSibling); }
  if(!actions.querySelector('[data-cancel]')){ const b=document.createElement('button'); b.textContent='Cancel'; b.setAttribute('data-cancel',''); actions.insertBefore(b, actions.querySelector('[data-clear]')||actions.querySelector('[data-status]')||actions.querySelector('[data-wrap-note]')||actions.querySelector('[data-overall-note]')||null); }
  if(!actions.querySelector('[data-clear]')){ const b=document.createElement('button'); b.textContent='Clear'; b.setAttribute('data-clear',''); actions.insertBefore(b, actions.querySelector('[data-status]')||actions.querySelector('[data-wrap-note]')||actions.querySelector('[data-overall-note]')||actions.querySelector('[data-planner-note]')||null); }
  if(!actions.querySelector('[data-status]') && !actions.querySelector('[data-wrap-note]') && !actions.querySelector('[data-overall-note]')){ const s=document.createElement('span'); s.setAttribute('data-status',''); actions.appendChild(s); }
}
function setupCommentBox(box,{saved,editedAt,saveSelector,statusSelector,placeholderSaved,syncNote}){
  ensureCommentControls(box, box.closest('[data-day-wrap]')?'wrap':box.closest('[data-overall-review]')?'overall':'activity');
  const ta=box.querySelector('textarea');
  const save=box.querySelector(saveSelector);
  const edit=box.querySelector('[data-edit]');
  const cancel=box.querySelector('[data-cancel]');
  const clear=box.querySelector('[data-clear]');
  const status=box.querySelector(statusSelector)||box.querySelector('[data-status]');
  const isEditing=box.dataset.editing==='true';
  const hasSavedRecord=Boolean((saved||'').trim() || editedAt || box.dataset.savedForce==='true');
  let view=box.querySelector('.saved-review-view');
  if(!view){
    view=document.createElement('div');
    view.className='saved-review-view';
    ta.insertAdjacentElement('afterend',view);
  }
  const shouldShowTextareaValue = isEditing || !hasSavedRecord;
  if(document.activeElement!==ta) ta.value=shouldShowTextareaValue ? (saved||'') : '';
  ta.dataset.original=saved||'';
  if(hasSavedRecord && !isEditing){
    box.classList.add('is-saved');
    ta.readOnly=true;
    ta.placeholder=placeholderSaved||'Saved comment';
    view.hidden=false;
    const meta=[];
    if(editedAt) meta.push(`Last edited ${editedAt}`);
    if(syncNote) meta.push(syncNote);
    const commentHtml=(saved||'').trim()?esc(saved):'<span class="muted">No written comment</span>';
    view.innerHTML=`<p>${commentHtml}</p><small>${meta.join(' · ')||`Saved for ${reviewers[currentReviewer]}`}</small>`;
    save.hidden=true;
    edit.hidden=false;
    cancel.hidden=true;
    if(clear) clear.hidden=false;
    if(status) status.textContent=syncNote||'';
  }else{
    box.classList.remove('is-saved');
    view.hidden=true;
    ta.readOnly=false;
    save.hidden=false;
    save.textContent=hasSavedRecord?'Update':'Save';
    save.disabled=hasSavedRecord && ta.value.trim()===(saved||'');
    edit.hidden=true;
    cancel.hidden=!hasSavedRecord;
    if(clear) clear.hidden=!hasSavedRecord;
    if(status) status.textContent=syncNote || (hasSavedRecord?'Editing saved comment':'Not saved yet');
  }
}
function forcePageTop(){
  document.documentElement.scrollTop=0;
  document.body.scrollTop=0;
  window.scrollTo({top:0,left:0,behavior:'auto'});
}
function showPage(id){
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  document.querySelectorAll('.topnav button').forEach(b=>b.classList.toggle('active',b.dataset.open===id));
  renderAll();
  if(location.hash.replace('#','')!==id) history.replaceState(null,'','#'+id);
  forcePageTop();
  requestAnimationFrame(forcePageTop);
  setTimeout(forcePageTop,60);
  setTimeout(forcePageTop,180);
}
function setReviewer(name){
  currentReviewer=reviewers[name]?name:'Crystal';
  localStorage.setItem('ccmv:reviewer',currentReviewer);
  document.querySelectorAll('.comment-box,[data-day-wrap],[data-overall-review]').forEach(b=>delete b.dataset.editing);
  renderAll();
}
function renderReviewer(){
  document.querySelector('[data-current-reviewer-label]').textContent=reviewers[currentReviewer];
  document.querySelectorAll('[data-reviewer]').forEach(btn=>btn.classList.toggle('selected',btn.dataset.reviewer===currentReviewer));
}
function reactionLabel(r){return r?({keep:'Keep',discuss:'Discuss',replace:'Replace'}[r]||r):'Comment';}
function reactionIcon(r){return ({keep:'🟢',discuss:'🟡',replace:'🔴'}[r]||'⚪');}
function cardTitle(card){return (card.querySelector('h4')?.textContent||'Review item').trim();}
function filterAllows(name){return currentFilter==='All'||currentFilter===name;}
function renderFilter(){document.querySelectorAll('[data-filter-reviewer]').forEach(btn=>btn.classList.toggle('selected',btn.dataset.filterReviewer===currentFilter));}
function setupCollapsibleWhy(){
  document.querySelectorAll('.activity').forEach(card=>{
    if(card.querySelector('.why-toggle')) return;
    const p=[...card.children].find(el=>el.tagName==='P');
    const chips=[...card.children].find(el=>el.classList?.contains('chips'));
    const reaction=card.querySelector('.reaction');
    if(!p || !reaction) return;
    const details=document.createElement('details');
    details.className='why-toggle';
    const summary=document.createElement('summary');
    summary.textContent='Why this plan';
    const body=document.createElement('div');
    body.className='why-body';
    body.appendChild(p);
    if(chips) body.appendChild(chips);
    details.appendChild(summary);
    details.appendChild(body);
    reaction.parentNode.insertBefore(details,reaction);
  });
}
function dayLabelFor(el){
  const page=el.closest('.page');
  return page?.id?.replace('day','Day ') || 'Plan';
}

function renderActivity(card){
  const id=safeCardKey(card);
  const box=card.querySelector('.comment-box');
  const savedReaction=localStorage.getItem(reviewKey('reaction',id));
  const pendingReaction=localStorage.getItem(pendingKey('reaction',id));
  const activeReaction=(box && box.dataset.editing==='true') ? (pendingReaction||savedReaction) : savedReaction;
  card.querySelectorAll('[data-reaction]').forEach(b=>b.classList.toggle('selected',activeReaction===b.dataset.reaction));
  const saved=localStorage.getItem(reviewKey('comment',id));
  const editedAt=localStorage.getItem(reviewKey('comment-edited',id));
  const hasReaction=!!localStorage.getItem(reviewKey('reaction',id));
  card.classList.toggle('review-open', !!(saved || (box && box.dataset.editing==='true')));
  if(box){ box.dataset.savedForce=hasSavedActivity(id)?'true':'false'; setupCommentBox(box,{saved,editedAt,saveSelector:'[data-save]',statusSelector:'[data-status]',placeholderSaved:'Saved comment / 已儲存，可按 Edit 修改',syncNote:localStorage.getItem(syncNoteKey('activity',id))}); }
  let badge=card.querySelector('[data-approval-badge]');
  if(!badge){ badge=document.createElement('div'); badge.setAttribute('data-approval-badge',''); badge.className='review-badge'; const reactionBox=card.querySelector('.reaction'); if(reactionBox) reactionBox.insertAdjacentElement('afterend',badge); }
  const keepCount=reviewerNames.filter(name=>localStorage.getItem(reviewKey('reaction',id,name))==='keep').length;
  const reviewedCount=reviewerNames.filter(name=>localStorage.getItem(reviewKey('reaction',id,name))).length;
  badge.className='review-badge'+(keepCount===reviewerNames.length?' approved':'');
  badge.textContent=keepCount===reviewerNames.length?'✅ Approved by everyone · 4 / 4 Keep':`${reviewedCount} / 4 reviewed · ${keepCount} Keep`;
  const thread=card.querySelector('[data-thread]');
  if(thread){
    const items=reviewerNames.map(name=>{
      const reaction=localStorage.getItem(reviewKey('reaction',id,name));
      const comment=localStorage.getItem(reviewKey('comment',id,name));
      const time=localStorage.getItem(reviewKey('comment-edited',id,name));
      if(!reaction && !comment) return '';
      if(!filterAllows(name)) return '';
      return `<div class="thread-item"><b>${reviewers[name]} · ${reactionIcon(reaction)} ${reactionLabel(reaction)}</b>${comment?`<p>${esc(comment)}</p>`:''}${time?`<p><small>Last edited ${time}</small></p>`:''}</div>`;
    }).join('');
    thread.innerHTML=items||`<div class="thread-item"><b>No ${currentFilter==='All'?'comments':currentFilter+' comments'} yet</b><p>選好 reviewer 後留下第一個 comment。</p></div>`;
  }
}
function renderWrap(box){
  ensureCommentControls(box,'wrap');
  const day=box.dataset.dayWrap;
  const savedStatus=localStorage.getItem(reviewKey('wrap-status',day));
  const pendingStatus=localStorage.getItem(pendingKey('wrap-status',day));
  const statusValue=(box.dataset.editing==='true')?(pendingStatus||savedStatus):savedStatus;
  box.querySelectorAll('[data-wrap-status]').forEach(b=>b.classList.toggle('selected',b.dataset.wrapStatus===statusValue));
  const saved=localStorage.getItem(reviewKey('wrap-comment',day));
  const editedAt=localStorage.getItem(reviewKey('wrap-comment-edited',day));
  box.dataset.savedForce=hasSavedWrap(day)?'true':'false';
  setupCommentBox(box,{saved,editedAt,saveSelector:'[data-wrap-save]',statusSelector:'[data-wrap-note]',placeholderSaved:'Saved day wrap-up / 已儲存，可按 Edit 修改',syncNote:localStorage.getItem(syncNoteKey('wrap',day))});
}
function renderDashboard(){
  renderFilter();
  const grids=[...document.querySelectorAll('[data-progress-grid]')];
  const summaries=[...document.querySelectorAll('[data-dashboard-summary]')];
  const cards=[...document.querySelectorAll('.activity')];
  const wraps=[...document.querySelectorAll('[data-day-wrap]')];
  const totalSteps=cards.length+wraps.length;
  const totalPossible=totalSteps*reviewerNames.length;
  const allReactions=[];
  cards.forEach(c=>reviewerNames.forEach(name=>{ const r=localStorage.getItem(reviewKey('reaction',safeCardKey(c),name)); if(r) allReactions.push(r); }));
  const wrapDone=wraps.reduce((sum,w)=>sum+reviewerNames.filter(name=>localStorage.getItem(reviewKey('wrap-status',w.dataset.dayWrap,name))||localStorage.getItem(reviewKey('wrap-comment',w.dataset.dayWrap,name))).length,0);
  const done=allReactions.length+wrapDone;
  const pct=totalPossible?Math.round(done/totalPossible*100):0;
  const keep=allReactions.filter(r=>r==='keep').length, discuss=allReactions.filter(r=>r==='discuss').length, replace=allReactions.filter(r=>r==='replace').length;
  const approved=cards.filter(c=>reviewerNames.every(name=>localStorage.getItem(reviewKey('reaction',safeCardKey(c),name))==='keep')).length;
  const pending=cards.filter(c=>reviewerNames.some(name=>!localStorage.getItem(reviewKey('reaction',safeCardKey(c),name)))).slice(0,4);
  const summaryHtml=`<div class="summary-card"><strong>${pct}%</strong><span>Overall ready score</span><div class="mini">${done}/${totalPossible} review steps completed · ${approved}/${cards.length} items fully approved</div><div class="progress-meter"><i style="width:${pct}%"></i></div></div><div class="summary-card"><strong>${allReactions.length}</strong><span>Total item reviews</span><div class="progress-breakdown"><span>🟢 ${keep} Keep</span><span>🟡 ${discuss} Discuss</span><span>🔴 ${replace} Replace</span></div>${pending.length?`<div class="mini">${pending.length} item groups still need responses.</div>`:`<div class="mini">All review items have at least one response.</div>`}</div>`;
  summaries.forEach(summary=>summary.innerHTML=summaryHtml);
  if(!grids.length) return;
  const gridHtml=reviewerNames.map(name=>{
    const reactions=cards.filter(c=>localStorage.getItem(reviewKey('reaction',safeCardKey(c),name))).length;
    const dayDone=wraps.filter(w=>localStorage.getItem(reviewKey('wrap-status',w.dataset.dayWrap,name))||localStorage.getItem(reviewKey('wrap-comment',w.dataset.dayWrap,name))).length;
    const done=reactions+dayDone;
    const personPct=totalSteps?Math.round(done/totalSteps*100):0;
    const personKeep=cards.filter(c=>localStorage.getItem(reviewKey('reaction',safeCardKey(c),name))==='keep').length;
    const personDiscuss=cards.filter(c=>localStorage.getItem(reviewKey('reaction',safeCardKey(c),name))==='discuss').length;
    const personReplace=cards.filter(c=>localStorage.getItem(reviewKey('reaction',safeCardKey(c),name))==='replace').length;
    return `<div class="progress-card"><b>${reviewers[name]}</b><span>${done}/${totalSteps} review steps · ${personPct}%</span><div class="progress-meter"><i style="width:${personPct}%"></i></div><div class="progress-breakdown"><span>🟢 ${personKeep}</span><span>🟡 ${personDiscuss}</span><span>🔴 ${personReplace}</span></div></div>`;
  }).join('');
  grids.forEach(grid=>grid.innerHTML=gridHtml);
}
/* Decision status bucketing shared by activity cards and day-wraps.
   Buckets: 'all-good' | 'discuss' | 'replace' | 'none'
   Rule: any 'replace' wins → Replacement Requested.
         else any 'discuss', or partially-reviewed-but-not-all-keep → Needs Discussion.
         else fully reviewed & all keep → All Good.
         else nobody has reviewed yet → Not Reviewed. */
function computeCardStatus(card){
  const id=safeCardKey(card);
  const states=reviewerNames.map(name=>localStorage.getItem(reviewKey('reaction',id,name)));
  const reviewedCount=states.filter(Boolean).length;
  if(reviewedCount===0) return 'none';
  if(states.includes('replace')) return 'replace';
  if(states.includes('discuss')) return 'discuss';
  if(reviewedCount===reviewerNames.length && states.every(s=>s==='keep')) return 'all-good';
  return 'discuss';
}
function computeWrapStatus(day){
  const states=reviewerNames.map(name=>localStorage.getItem(reviewKey('wrap-status',day,name)));
  const reviewedCount=states.filter(Boolean).length;
  if(reviewedCount===0) return 'none';
  if(states.includes('replace')) return 'replace';
  if(states.includes('discuss')) return 'discuss';
  if(reviewedCount===reviewerNames.length && states.every(s=>s==='keep')) return 'all-good';
  return 'discuss';
}
const statusLabel={'all-good':'✅ All Good',discuss:'🤔 Needs Discussion',replace:'🔁 Replacement Requested',none:'⚪ Not Reviewed'};
function renderDaySummary(container){
  const section=container.closest('section[data-page]');
  if(!section) return;
  const cards=[...section.querySelectorAll('.activity')];
  if(!cards.length){ container.innerHTML=''; return; }
  const rows=cards.map(card=>{
    const title=card.querySelector('h4')?.textContent.trim()||'Activity';
    const pills=reviewerNames.map(name=>{
      const r=localStorage.getItem(reviewKey('reaction',safeCardKey(card),name));
      return `<span class="day-summary-pill" title="${reviewers[name]} · ${reactionLabel(r)}">${reactionIcon(r)}</span>`;
    }).join('');
    const status=computeCardStatus(card);
    const comments=reviewerNames.map(name=>{
      const cm=localStorage.getItem(reviewKey('comment',safeCardKey(card),name));
      if(!cm || !filterAllows(name)) return '';
      return `<div class="day-summary-comment-item"><b>${reviewers[name]}</b>${esc(cm)}</div>`;
    }).filter(Boolean).join('');
    const commentCount=(comments.match(/day-summary-comment-item/g)||[]).length;
    return `<div class="day-summary-row">
<div class="day-summary-row-head"><b>${esc(title)}</b><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><div class="day-summary-pills">${pills}</div><span class="day-summary-status status-${status}">${statusLabel[status]}</span></div></div>
${commentCount?`<details class="day-summary-comments"><summary>${commentCount} comment${commentCount>1?'s':''}</summary>${comments}</details>`:''}
</div>`;
  }).join('');
  container.innerHTML=`<p class="eyebrow">Clear Summary</p><h3>邊個話咗乜嘢</h3><p class="muted" style="margin-top:2px">四人對呢一日每個活動嘅即時 reaction；有 comment 嘅可以撳開睇。</p><div class="day-summary-table">${rows}</div>`;
}
function renderDecisionStatus(){
  const el=document.querySelector('[data-decision-status]');
  if(!el) return;
  const cards=[...document.querySelectorAll('.activity')];
  const buckets={'all-good':0,discuss:0,replace:0,none:0};
  cards.forEach(c=>{ buckets[computeCardStatus(c)]++; });
  el.innerHTML=`<div class="decision-status-card status-all-good"><b>${buckets['all-good']}</b><span>✅ All Good</span></div><div class="decision-status-card status-discuss"><b>${buckets.discuss}</b><span>🤔 Needs Discussion</span></div><div class="decision-status-card status-replace"><b>${buckets.replace}</b><span>🔁 Replacement Requested</span></div><div class="decision-status-card status-none"><b>${buckets.none}</b><span>⚪ Not Reviewed</span></div>`;
}
function renderSummaryActivities(){
  const list=document.querySelector('[data-summary-activity-list]');
  if(!list) return;
  const cards=[...document.querySelectorAll('.activity')];
  const bucketOrder=['replace','discuss','none','all-good'];
  const bucketTitle={replace:'🔁 Replacement Requested',discuss:'🤔 Needs Discussion',none:'⚪ Not Reviewed', 'all-good':'✅ All Good'};
  const bucketHint={replace:'需要優先決定是否更換。',discuss:'有人按 Discuss，或未達四人一致 Keep。',none:'暫時未有人 review。', 'all-good':'四人一致 Keep；預設收起，減少雜訊。'};
  const buckets={replace:[],discuss:[],none:[], 'all-good':[]};
  cards.forEach(card=>{
    const id=safeCardKey(card);
    const day=card.closest('.page')?.id?.replace('day','Day ')||'Plan';
    const title=card.querySelector('h4')?.textContent.trim()||'Activity';
    const status=computeCardStatus(card);
    const chips=reviewerNames.map(name=>{
      const r=localStorage.getItem(reviewKey('reaction',id,name));
      return `<span class="summary-chip">${reviewers[name]} ${reactionIcon(r)}</span>`;
    }).join('');
    const comments=reviewerNames.map(name=>{
      const cm=localStorage.getItem(reviewKey('comment',id,name));
      if(!cm) return '';
      return `<div class="summary-comment"><b>${reviewers[name]}</b>${esc(cm)}</div>`;
    }).filter(Boolean).join('');
    buckets[status].push(`<div class="summary-row status-${status}"><div class="summary-row-head"><b>${esc(day)} · ${esc(title)}</b><span class="day-summary-status status-${status}">${statusLabel[status]}</span></div><div class="summary-chipline">${chips}</div>${comments?`<details class="summary-comments compact-comments"><summary>${(comments.match(/summary-comment/g)||[]).length} comment${(comments.match(/summary-comment/g)||[]).length>1?'s':''}</summary>${comments}</details>`:`<div class="summary-empty">No comments yet.</div>`}</div>`);
  });
  const groups=bucketOrder.map(status=>{
    const rows=buckets[status];
    const open=status==='replace'||status==='discuss';
    return `<details class="summary-bucket status-${status}" ${open?'open':''}><summary><span>${bucketTitle[status]}</span><b>${rows.length}</b></summary><p class="summary-empty">${bucketHint[status]}</p><div class="summary-list-inner">${rows.length?rows.join(''):'<div class="summary-row"><div class="summary-empty">No items in this bucket.</div></div>'}</div></details>`;
  }).join('');
  list.innerHTML=cards.length?groups:'<div class="summary-row"><b>No activity cards found.</b></div>';
}
function renderFinal(){
  const list=document.querySelector('[data-final-review-list]');
  if(!list) return;
  const days=[...document.querySelectorAll('[data-day-wrap]')].map(w=>w.dataset.dayWrap);
  const items=days.map(day=>{
    const rows=reviewerNames.map(name=>{
      const st=localStorage.getItem(reviewKey('wrap-status',day,name));
      const cm=localStorage.getItem(reviewKey('wrap-comment',day,name));
      if(!st && !cm) return '';
      return `<div class="summary-comment"><b>${reviewers[name]} ${st?`· ${reactionIcon(st)} ${reactionLabel(st)}`:'· Comment'}</b>${cm?esc(cm):'No comment text.'}</div>`;
    }).filter(Boolean).join('');
    const status=computeWrapStatus(day);
    const dayName=day.replace('-wrap','').toUpperCase();
    const count=(rows.match(/summary-comment/g)||[]).length;
    return `<details class="summary-bucket day-wrap-summary status-${status}" ${status==='replace'||status==='discuss'?'open':''}><summary><span>${dayName} · ${statusLabel[status]}</span><b>${count}</b></summary>${rows?`<div class="summary-comments">${rows}</div>`:`<div class="summary-empty">No Day Wrap-up submitted yet.</div>`}</details>`;
  }).join('');
  list.innerHTML=items||`<div class="summary-row"><b>Day Wrap-up Summary</b><div class="summary-empty">Submitted day summaries will appear here.</div></div>`;
}

function renderPlannerSummary(){
  const list=document.querySelector('[data-planner-summary-list]'); if(!list) return;
  const rows=[1,2,3,4,5].map(n=>{
    const id=`day${n}-planner-notes`;
    const cm=localStorage.getItem(reviewKey('planner-note',id,'Planner'));
    const time=localStorage.getItem(reviewKey('planner-note-edited',id,'Planner'));
    if(!cm) return '';
    return `<div class="summary-row"><b>DAY ${n}</b><p>${esc(cm)}</p>${time?`<small>Last edited ${time}</small>`:''}</div>`;
  }).filter(Boolean).join('');
  list.innerHTML=rows||'<div class="summary-empty">No planner notes yet.</div>';
}
function renderOverallSummary(){
  const list=document.querySelector('[data-overall-summary-list]');
  if(!list) return;
  const id='trip-overall-review';
  const rows=reviewerNames.map(name=>{
    const st=localStorage.getItem(reviewKey('overall-status',id,name));
    const cm=localStorage.getItem(reviewKey('overall-comment',id,name));
    if(!st && !cm) return '';
    return `<div class="summary-row"><div class="summary-row-head"><b>${reviewers[name]}</b><span class="summary-chip">${st?reactionIcon(st)+' '+reactionLabel(st):'Comment'}</span></div>${cm?`<div class="summary-comments"><div class="summary-comment">${esc(cm)}</div></div>`:`<div class="summary-empty">No comment text.</div>`}</div>`;
  }).filter(Boolean).join('');
  list.innerHTML=rows||'<div class="summary-row"><b>No Overall Review notes yet.</b><div class="summary-empty">Go to Overall Review to submit final whole-trip comments.</div></div>';
}
function renderOverall(){
  const box=document.querySelector('[data-overall-review]');
  if(!box) return;
  ensureCommentControls(box,'overall');
  const id=box.dataset.overallReview;
  const saved=localStorage.getItem(reviewKey('overall-comment',id));
  const editedAt=localStorage.getItem(reviewKey('overall-comment-edited',id));
  box.dataset.savedForce=Boolean((saved||'').trim()||editedAt)?'true':'false';
  setupCommentBox(box,{saved,editedAt,saveSelector:'[data-overall-save]',statusSelector:'[data-overall-note]',placeholderSaved:'Saved overall comment / 已儲存，可按 Edit 修改',syncNote:localStorage.getItem(syncNoteKey('overall',id))});
  const thread=box.querySelector('[data-overall-thread]');
  if(thread){
    const items=reviewerNames.map(name=>{
      const st=localStorage.getItem(reviewKey('overall-status',id,name));
      const cm=localStorage.getItem(reviewKey('overall-comment',id,name));
      const time=localStorage.getItem(reviewKey('overall-comment-edited',id,name));
      if(!st && !cm) return '';
      if(!filterAllows(name)) return '';
      return `<div class="thread-item"><b>${reviewers[name]} · ${st||'Comment'}</b>${cm?`<p>${esc(cm)}</p>`:''}${time?`<p><small>Last edited ${time}</small></p>`:''}</div>`;
    }).join('');
    thread.innerHTML=items||'<div class="thread-item"><b>No overall comments yet</b><p>選好 reviewer 後留下整體 comment。</p></div>';
  }
}
function renderAll(){setupCollapsibleWhy();renderReviewer();document.querySelectorAll('.activity').forEach(renderActivity);document.querySelectorAll('[data-day-wrap]').forEach(renderWrap);document.querySelectorAll('[data-day-summary]').forEach(renderDaySummary);renderDashboard();renderDecisionStatus();renderSummaryActivities();renderFinal();renderOverall();renderOverallSummary();renderPlannerNotes();renderPlannerSummary();}
function closeIOSKeyboard(){
  const active=document.activeElement;
  if(active && /^(TEXTAREA|INPUT|SELECT)$/.test(active.tagName)) active.blur();
  setTimeout(()=>{
    if(window.visualViewport && window.visualViewport.scale && window.visualViewport.scale!==1){
      window.scrollTo({top:window.scrollY,left:0,behavior:'auto'});
    }
  },80);
}

/* Build 10.2.7: iPhone comment focus visibility fix
   Real issue: when the iOS keyboard opens, Safari can place the active
   textarea underneath the keyboard/toolbar. We do NOT try to freeze the
   page position anymore. Instead, while editing, keep the active comment
   box inside the visible viewport above the keyboard. */
let ccmvActiveInputBox=null;
let ccmvActiveTextarea=null;
let ccmvSuppressBlurRestore=false;
function getStickyBottom(){
  const header=document.querySelector('header');
  const reviewer=document.querySelector('.reviewer-bar');
  let bottom=0;
  [header,reviewer].forEach(el=>{
    if(!el) return;
    const r=el.getBoundingClientRect();
    if(r.bottom>0) bottom=Math.max(bottom,r.bottom);
  });
  return bottom;
}
function keepActiveCommentVisible(extra=28){
  const ta=ccmvActiveTextarea;
  if(!ta || !document.body.contains(ta)) return;
  const box=ccmvActiveInputBox && document.body.contains(ccmvActiveInputBox) ? ccmvActiveInputBox : ta;
  const vv=window.visualViewport;
  const visibleTop=(vv?vv.offsetTop:0) + getStickyBottom() + 10;
  const visibleBottom=(vv?(vv.offsetTop+vv.height):window.innerHeight) - extra;
  const rect=box.getBoundingClientRect();
  let delta=0;
  if(rect.bottom > visibleBottom){
    delta = rect.bottom - visibleBottom;
  }else if(rect.top < visibleTop){
    delta = rect.top - visibleTop;
  }
  if(Math.abs(delta)>4){
    window.scrollBy({top:delta,left:0,behavior:'auto'});
  }
}
function scheduleActiveCommentVisible(){
  requestAnimationFrame(()=>keepActiveCommentVisible(34));
  setTimeout(()=>keepActiveCommentVisible(40),120);
  setTimeout(()=>keepActiveCommentVisible(46),320);
  setTimeout(()=>keepActiveCommentVisible(52),650);
}
document.addEventListener('focusin',e=>{
  const ta=e.target.closest?.('textarea');
  if(!ta) return;
  ccmvActiveTextarea=ta;
  ccmvActiveInputBox=ta.closest('.comment-box,[data-day-wrap],[data-overall-review]') || ta;
  document.body.classList.add('keyboard-editing');
  scheduleActiveCommentVisible();
});
document.addEventListener('input',e=>{
  if(e.target && e.target===ccmvActiveTextarea) scheduleActiveCommentVisible();
});
document.addEventListener('focusout',e=>{
  const ta=e.target.closest?.('textarea');
  if(!ta) return;
  setTimeout(()=>{
    if(document.activeElement!==ccmvActiveTextarea){
      document.body.classList.remove('keyboard-editing');
      ccmvActiveInputBox=null;
      ccmvActiveTextarea=null;
    }
  },80);
});
if(window.visualViewport){
  window.visualViewport.addEventListener('resize',()=>{
    if(ccmvActiveTextarea) scheduleActiveCommentVisible();
  });
  window.visualViewport.addEventListener('scroll',()=>{
    if(ccmvActiveTextarea) scheduleActiveCommentVisible();
  });
}
async function saveActivity(card){
  const id=safeCardKey(card), box=card.querySelector('.comment-box'), ta=box.querySelector('textarea');
  const comment=ta.value.trim();
  const reaction=localStorage.getItem(pendingKey('reaction',id)) || localStorage.getItem(reviewKey('reaction',id));
  const status=box.querySelector('[data-status]');
  if(!reaction){ if(status) status.textContent='Please choose Keep / Discuss / Replace first.'; return; }
  if((reaction==='discuss'||reaction==='replace') && !comment){ if(status) status.textContent='Discuss / Replace needs a comment.'; ta.focus(); return; }
  ccmvSuppressBlurRestore=true; closeIOSKeyboard(); setTimeout(()=>{ccmvSuppressBlurRestore=false;},500);
  localStorage.setItem(reviewKey('reaction',id),reaction);
  localStorage.removeItem(pendingKey('reaction',id));
  localStorage.setItem(reviewKey('comment',id),comment);
  localStorage.setItem(reviewKey('comment-edited',id),stamp());
  setSyncNote('activity',id,'Saving…');
  delete box.dataset.editing; renderAll();
  const ok=await upsertSupabaseReview('activity',id,{reaction,comment});
  setSyncNote('activity',id,ok?'Synced to Supabase':'Saved offline');
  closeIOSKeyboard(); renderAll();
}
async function saveWrap(box){
  const id=box.dataset.dayWrap, ta=box.querySelector('textarea');
  const comment=ta.value.trim();
  const reaction=localStorage.getItem(pendingKey('wrap-status',id)) || localStorage.getItem(reviewKey('wrap-status',id));
  const status=box.querySelector('[data-wrap-note]');
  if(!reaction){ if(status) status.textContent='Please choose Keep / Discuss / Replace first.'; return; }
  if((reaction==='discuss'||reaction==='replace') && !comment){ if(status) status.textContent='Discuss / Replace needs a comment.'; ta.focus(); return; }
  ccmvSuppressBlurRestore=true; closeIOSKeyboard(); setTimeout(()=>{ccmvSuppressBlurRestore=false;},500);
  localStorage.setItem(reviewKey('wrap-status',id),reaction);
  localStorage.removeItem(pendingKey('wrap-status',id));
  localStorage.setItem(reviewKey('wrap-comment',id),comment);
  localStorage.setItem(reviewKey('wrap-comment-edited',id),stamp());
  setSyncNote('wrap',id,'Saving…');
  delete box.dataset.editing; renderAll();
  const ok=await upsertSupabaseReview('wrap',id,{reaction,comment});
  setSyncNote('wrap',id,ok?'Synced to Supabase':'Saved offline');
  closeIOSKeyboard(); renderAll();
}
async function saveOverall(box){
  const id=box.dataset.overallReview, ta=box.querySelector('textarea');
  const comment=ta.value.trim();
  const reaction=localStorage.getItem(reviewKey('overall-status',id));
  ccmvSuppressBlurRestore=true;
  closeIOSKeyboard();
  setTimeout(()=>{ccmvSuppressBlurRestore=false;},500);
  localStorage.setItem(reviewKey('overall-comment',id),comment);
  localStorage.setItem(reviewKey('overall-comment-edited',id),stamp());
  setSyncNote('overall',id,'Saving…');
  delete box.dataset.editing; renderAll();
  const ok=await upsertSupabaseReview('overall',id,{reaction,comment});
  setSyncNote('overall',id,ok?'Synced to Supabase':'Saved offline');
  closeIOSKeyboard();
  renderAll();
}

async function savePlannerNotes(box){
  const id=box.dataset.plannerNotes, ta=box.querySelector('textarea');
  const comment=ta.value.trim();
  ccmvSuppressBlurRestore=true; closeIOSKeyboard(); setTimeout(()=>{ccmvSuppressBlurRestore=false;},500);
  localStorage.setItem(reviewKey('planner-note',id,'Planner'),comment);
  localStorage.setItem(reviewKey('planner-note-edited',id,'Planner'),stamp());
  const note=box.querySelector('[data-planner-note]'); if(note) note.textContent='Saving…';
  delete box.dataset.editing; renderPlannerNotes();
  const ok=await upsertSupabaseReview('planner',id,{reaction:'note',comment});
  if(note) note.textContent=ok?'Synced to Supabase':'Saved offline';
  renderPlannerNotes();
}
function renderPlannerNotes(){
  document.querySelectorAll('[data-planner-notes]').forEach(box=>{
    const id=box.dataset.plannerNotes, ta=box.querySelector('textarea');
    const saved=localStorage.getItem(reviewKey('planner-note',id,'Planner'))||'';
    const editedAt=localStorage.getItem(reviewKey('planner-note-edited',id,'Planner'));
    box.dataset.savedForce=Boolean(saved||editedAt)?'true':'false';
    setupCommentBox(box,{saved,editedAt,saveSelector:'[data-planner-save]',statusSelector:'[data-planner-note]',placeholderSaved:'Saved planner notes / 已儲存，可按 Edit 修改',syncNote:''});
  });
}
document.addEventListener('click',async e=>{
  const open=e.target.closest('[data-open]'); if(open){ showPage(open.dataset.open); return; }
  const toggleReviewer=e.target.closest('[data-reviewer-toggle]'); if(toggleReviewer){ document.querySelector('.reviewer-bar')?.classList.toggle('open'); return; }
  const reviewer=e.target.closest('[data-reviewer]'); if(reviewer){ setReviewer(reviewer.dataset.reviewer); document.querySelector('.reviewer-bar')?.classList.remove('open'); return; }
  const filter=e.target.closest('[data-filter-reviewer]'); if(filter){ currentFilter=filter.dataset.filterReviewer; localStorage.setItem('ccmv:reviewFilter',currentFilter); renderAll(); return; }
  const edit=e.target.closest('[data-edit]');
  if(edit){ const box=edit.closest('.comment-box')||edit.closest('[data-day-wrap]')||edit.closest('[data-overall-review]')||edit.closest('[data-planner-notes]'); box.dataset.editing='true'; renderAll(); setTimeout(()=>box.querySelector('textarea')?.focus(),0); return; }
  const cancel=e.target.closest('[data-cancel]');
  if(cancel){ const box=cancel.closest('.comment-box')||cancel.closest('[data-day-wrap]')||cancel.closest('[data-overall-review]')||cancel.closest('[data-planner-notes]'); delete box.dataset.editing; renderAll(); return; }
  const rb=e.target.closest('[data-reaction]');
  if(rb){ const card=rb.closest('.activity'); const id=safeCardKey(card); const box=card.querySelector('.comment-box'); localStorage.setItem(pendingKey('reaction',id),rb.dataset.reaction); if(box) box.dataset.editing='true'; renderAll(); if(box && (rb.dataset.reaction==='discuss'||rb.dataset.reaction==='replace')) setTimeout(()=>box.querySelector('textarea')?.focus(),80); return; }
  const save=e.target.closest('[data-save]'); if(save){ await saveActivity(save.closest('.activity')); return; }
  const clear=e.target.closest('[data-clear]');
  if(clear){
    const activity=clear.closest('.activity'); const wrapBox=clear.closest('[data-day-wrap]'); const overallBox=clear.closest('[data-overall-review]'); const plannerBox=clear.closest('[data-planner-notes]');
    if(activity){ const id=safeCardKey(activity); ['reaction','comment','comment-edited'].forEach(t=>localStorage.removeItem(reviewKey(t,id))); localStorage.removeItem(pendingKey('reaction',id)); setSyncNote('activity',id,''); await deleteSupabaseReview('activity',id); delete activity.querySelector('.comment-box').dataset.editing; }
    else if(wrapBox){ const id=wrapBox.dataset.dayWrap; ['wrap-status','wrap-comment','wrap-comment-edited'].forEach(t=>localStorage.removeItem(reviewKey(t,id))); localStorage.removeItem(pendingKey('wrap-status',id)); setSyncNote('wrap',id,''); await deleteSupabaseReview('wrap',id); delete wrapBox.dataset.editing; }
    else if(overallBox){ const id=overallBox.dataset.overallReview; ['overall-status','overall-comment','overall-comment-edited'].forEach(t=>localStorage.removeItem(reviewKey(t,id))); setSyncNote('overall',id,''); await deleteSupabaseReview('overall',id); delete overallBox.dataset.editing; }
    else if(plannerBox){ const id=plannerBox.dataset.plannerNotes; localStorage.removeItem(reviewKey('planner-note',id,'Planner')); localStorage.removeItem(reviewKey('planner-note-edited',id,'Planner')); await deleteSupabaseReview('planner',id); delete plannerBox.dataset.editing; }
    renderAll(); return;
  }
  const wrap=e.target.closest('[data-wrap-status]');
  if(wrap){ const box=wrap.closest('[data-day-wrap]'); const id=box.dataset.dayWrap; localStorage.setItem(pendingKey('wrap-status',id),wrap.dataset.wrapStatus); box.dataset.editing='true'; renderAll(); if(wrap.dataset.wrapStatus==='discuss'||wrap.dataset.wrapStatus==='replace') setTimeout(()=>box.querySelector('textarea')?.focus(),80); return; }
  const wrapSave=e.target.closest('[data-wrap-save]'); if(wrapSave){ await saveWrap(wrapSave.closest('[data-day-wrap]')); return; }
  const overall=e.target.closest('[data-overall-status]');
  if(overall){ const box=overall.closest('[data-overall-review]'); const id=box.dataset.overallReview; localStorage.setItem(reviewKey('overall-status',id),overall.dataset.overallStatus); upsertSupabaseReview('overall',id,{reaction:overall.dataset.overallStatus,comment:localStorage.getItem(reviewKey('overall-comment',id))||''}); renderAll(); return; }
  const overallSave=e.target.closest('[data-overall-save]'); if(overallSave){ await saveOverall(overallSave.closest('[data-overall-review]')); return; }
  const plannerSave=e.target.closest('[data-planner-save]'); if(plannerSave){ await savePlannerNotes(plannerSave.closest('[data-planner-notes]')); return; }
});
document.addEventListener('input',e=>{
  const ta=e.target.closest('textarea'); if(!ta) return;
  const box=ta.closest('.comment-box')||ta.closest('[data-day-wrap]')||ta.closest('[data-overall-review]')||ta.closest('[data-planner-notes]');
  const save=box?.querySelector('[data-save],[data-wrap-save],[data-overall-save],[data-planner-save]');
  if(save && ta.dataset.original!==undefined) save.disabled=ta.value.trim()===ta.dataset.original.trim();
});
function migrateStableReviewIds(){
  if(localStorage.getItem('ccmv10:stable-id-migration')==='done') return;
  const copyIfMissing=(type,oldId,newId,person)=>{
    const oldKey=reviewKey(type,oldId,person);
    const newKey=reviewKey(type,newId,person);
    const value=localStorage.getItem(oldKey);
    if(value!==null && localStorage.getItem(newKey)===null) localStorage.setItem(newKey,value);
  };
  reviewerNames.forEach(person=>{
    Object.entries(LEGACY_ID_MAP).forEach(([oldId,newId])=>{
      ['reaction','comment','comment-edited','wrap-status','wrap-comment','wrap-comment-edited','overall-status','overall-comment','overall-comment-edited'].forEach(type=>copyIfMissing(type,oldId,newId,person));
    });
  });
  localStorage.setItem('ccmv10:stable-id-migration','done');
}
function validateStableIds(){
  const ids=[...document.querySelectorAll('.activity')].map(el=>el.dataset.card);
  const missing=ids.filter(Boolean).length!==ids.length;
  const duplicates=ids.filter((id,i)=>id && ids.indexOf(id)!==i);
  if(missing||duplicates.length) console.warn('CCMV stable id issue',{missing,duplicates});
}
function initTripDataBindings(){
  if(!tripData.title) return;
  document.querySelector('.brand b').textContent=tripData.title;
  document.querySelector('.brand span').textContent=tripData.subtitle||tripData.destination||'';
}
initTripDataBindings();
migrateStableReviewIds();
validateStableIds();
showPage(location.hash?location.hash.replace('#',''):'home');
window.addEventListener('load',forcePageTop);
window.addEventListener('hashchange',()=>showPage(location.hash?location.hash.replace('#',''):'home'));
initSupabaseReadiness();

/* Build 11.2: single source of truth for reviewer dropdown open/close,
   click-outside-to-close, no competing touchend/click handlers. */
document.addEventListener('click',(ev)=>{
  const bar=document.querySelector('.reviewer-bar');
  if(!bar) return;
  if(!bar.contains(ev.target)) bar.classList.remove('open');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => console.warn('CCMV PWA service worker not registered', err));
  });
}