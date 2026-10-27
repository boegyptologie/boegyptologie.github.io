/* BOE submission uploads: private Drive storage, bounded chunks and resumable progress. */
(function () {
  'use strict';
  const BOE_WORKFLOW_URL = 'https://script.google.com/macros/s/AKfycbzmGb9xCPv8fCmQ322E_IcpxlNHgP0Ly-2zF06jjppxwoWoFTZ8famPPqGjhRz69KtM/exec';
  const MIB = 1024 * 1024;
  const MAX_PDF_BYTES = 15 * MIB, MAX_EDITABLE_BYTES = 30 * MIB;
  const MAX_SUPPLEMENTARY_BYTES = 200 * MIB, MAX_SUPPLEMENTARY_FILES = 30;
  const MAX_CHUNK_BYTES = 4 * MIB;
  const EDITABLE_EXTENSIONS = ['odt','docx','doc','tex','rtf','pages'];
  const SUPPLEMENTARY_EXTENSIONS = ['jpg','jpeg','png','tif','tiff','gif','webp','bmp','svg','pdf','csv','tsv','xlsx','xls','ods','json','xml','sql','sqlite','sqlite3','db','mdb','accdb','zip','7z','tar','gz','rar','txt','odt','doc','docx','rtf','npy','npz','h5','hdf5','geojson','gpkg','shp','shx','dbf','prj','kml','kmz','fits','fit'];
  const STORAGE_KEY = 'BOE_SUBMISSION_UPLOAD_V2';
  const form = document.getElementById('submit-form');
  if (!form) return;
  const french = document.documentElement.lang.toLowerCase().startsWith('fr');
  const text = (fr,en) => french ? fr : en;
  const button = document.getElementById('btn-submit');
  const originalButtonText = button.textContent;
  const uploading = document.getElementById('f-uploading');
  let activeSession = null, busy = false, frozenControls = [];
  try { activeSession = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || 'null'); } catch (_) {}
  if (activeSession && (!activeSession.signature || !activeSession.clientRequestId || !activeSession.uploadToken)) activeSession = null;

  function value(id) { return document.getElementById(id)?.value.trim() || ''; }
  function keywords(prefix) { return [1,2,3,4,5,6].map(i=>value(`kw-${prefix}-${i}`)).filter(Boolean); }
  function extension(name) { return String(name).toLowerCase().match(/\.([a-z0-9]+)$/)?.[1] || ''; }
  function randomHex(bytes) {
    const data = new Uint8Array(bytes); window.crypto.getRandomValues(data);
    return Array.from(data,b=>b.toString(16).padStart(2,'0')).join('');
  }
  function saveSession() {
    try {
      if (activeSession) window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(activeSession));
      else window.sessionStorage.removeItem(STORAGE_KEY);
    } catch (_) { /* In-memory retry also works when tab storage is unavailable. */ }
  }
  function freeze() {
    frozenControls = Array.from(form.querySelectorAll('input,select,textarea,button')).map(control=>({control,disabled:control.disabled}));
    frozenControls.forEach(item=>{ item.control.disabled = true; });
  }
  function unfreeze() { frozenControls.forEach(item=>{ item.control.disabled = item.disabled; }); frozenControls = []; }
  function hideError() { const box=document.getElementById('msg-error'); if(box) box.style.display='none'; }
  function fail(error) {
    if (error.code === 'UPLOAD_EXPIRED') { activeSession = null; saveSession(); }
    uploading.style.display = 'none'; unfreeze(); button.disabled = false;
    button.textContent = activeSession ? text('Reprendre l’envoi','Continue upload') : originalButtonText;
    const box = document.getElementById('msg-error');
    if (box) {
      box.style.display = 'block';
      const explanation = error.code === 'UPLOAD_EXPIRED' ? text('La session de transfert a expiré avant la soumission. Relancez l’envoi avec les fichiers sélectionnés.','The upload session expired before submission. Start the upload again with the selected files.') : error.message;
      box.textContent = text('L’envoi n’est pas terminé. ','The upload is not complete. ') + explanation +
        (activeSession ? text(' Vous pouvez reprendre avec les mêmes fichiers et les mêmes informations. Après rechargement de la page, sélectionnez à nouveau vos fichiers.',' You can continue with the same files and information. After reloading the page, select the files again.') : '');
      box.scrollIntoView({behavior:'smooth',block:'center'});
    }
  }
  function progress(offsets,files,label) {
    const total=files.reduce((sum,file)=>sum+file.size,0), sent=offsets.reduce((sum,offset)=>sum+offset,0);
    const percent=total ? Math.min(100,Math.floor(sent*100/total)) : 0;
    let meter=document.getElementById('boe-upload-progress'), status=document.getElementById('boe-upload-status');
    if (!meter || !status) {
      uploading.textContent='';
      meter=document.createElement('progress'); meter.id='boe-upload-progress'; meter.max=100; meter.style.width='100%';
      status=document.createElement('span'); status.id='boe-upload-status'; status.setAttribute('role','status');
      uploading.append(meter,status);
    }
    meter.value=percent;
    const completed=offsets.filter((offset,index)=>offset===files[index].size).length;
    status.textContent=label || text(
      `Envoi : ${(sent/MIB).toFixed(1)} / ${(total/MIB).toFixed(1)} Mo — ${percent} % (${completed}/${files.length} fichiers). Gardez cette page ouverte.`,
      `Uploading: ${(sent/MIB).toFixed(1)} / ${(total/MIB).toFixed(1)} MB — ${percent}% (${completed}/${files.length} files). Keep this page open.`);
    uploading.style.display='block';
  }
  function readChunk(file,start,end) {
    return new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.onload=()=>resolve(String(reader.result).split(',')[1]);
      reader.onerror=()=>reject(new Error(text('Impossible de lire le fichier sélectionné.','The selected file could not be read.')));
      reader.readAsDataURL(file.slice(start,end));
    });
  }
  function request(payload) {
    return new Promise((resolve,reject)=>{
      const nonce=randomHex(24), data=Object.assign({},payload,{request_id:nonce});
      const frame=document.createElement('iframe'); frame.name='boe-upload-'+nonce; frame.hidden=true;
      const transport=document.createElement('form');
      transport.method='POST'; transport.action=BOE_WORKFLOW_URL; transport.target=frame.name; transport.hidden=true;
      const input=document.createElement('input'); input.type='hidden'; input.name='payload'; input.value=JSON.stringify(data);
      transport.appendChild(input);
      let finished=false;
      const timeout=window.setTimeout(()=>finish(new Error(text('Aucune confirmation reçue. Vérifiez votre connexion.','No confirmation was received. Check your connection.')),true),120000);
      function cleanup() { window.clearTimeout(timeout); window.removeEventListener('message',receive); transport.remove(); frame.remove(); }
      function finish(result,failed) {
        if(finished)return; finished=true; cleanup();
        if(failed){result.transportError=true;reject(result);}else resolve(result);
      }
      function receive(event) {
        const trusted=event.origin==='https://script.google.com' || /^https:\/\/[a-z0-9-]+\.googleusercontent\.com$/i.test(event.origin);
        if(!trusted || event.data?.source!=='BOE_WORKFLOW' || event.data?.requestId!==nonce)return;
        if(!event.data.success){
          const error=new Error(event.data.message || text('Le serveur a refusé cet envoi.','The server rejected this upload.'));
          error.code=event.data.errorCode || ''; finished=true;cleanup();reject(error);return;
        }
        finish(event.data,false);
      }
      frame.onerror=()=>finish(new Error(text('Connexion au dépôt interrompue.','The connection to the upload service was interrupted.')),true);
      window.addEventListener('message',receive); document.body.append(frame,transport);
      try{transport.submit();}catch(error){finish(error,true);}
    });
  }
  async function retryTransport(payload) {
    for(let attempt=0;attempt<3;attempt++){
      try{return await request(payload);}catch(error){if(!error.transportError || attempt===2)throw error;}
    }
  }
  function sessionRequest(action,extra) { return Object.assign({action,uploadId:activeSession.uploadId,uploadToken:activeSession.uploadToken},extra || {}); }
  function offsetsFromStatus(status,files) {
    if(!Array.isArray(status.files) || status.files.length!==files.length)throw new Error(text('Le suivi des fichiers est incomplet.','The file progress response is incomplete.'));
    return files.map((file,index)=>{
      const record=status.files.find(item=>item.index===index);
      if(!record || record.size!==file.size || !Number.isInteger(record.offset) || record.offset<0 || record.offset>file.size)throw new Error(text('Le suivi du transfert est incohérent.','The upload progress response is inconsistent.'));
      return record.offset;
    });
  }
  function complete(submissionId,originalAlreadySubmitted) {
    if(!/^BOE-\d{4}-\d+$/.test(String(submissionId || '')))throw new Error(text('La confirmation de soumission est incomplète.','The submission confirmation is incomplete.'));
    activeSession=null;saveSession();unfreeze();form.style.display='none';uploading.style.display='none';
    const ok=document.getElementById('msg-success');ok.style.display='block';
    const first=ok.querySelector('p');
    if(first)first.textContent=text(`✓ La soumission ${submissionId} a bien été reçue.`,`✓ Submission ${submissionId} has been successfully received.`) +
      (originalAlreadySubmitted ? text(' Le premier envoi avait déjà été validé ; vos modifications plus récentes ne lui ont pas été appliquées.',' The first submission had already been confirmed; your more recent edits were not applied to it.') : '');
    ok.scrollIntoView({behavior:'smooth',block:'center'});
  }
  function supplementarySummary() {
    const files=Array.from(document.getElementById('f-supplementary')?.files || []), summary=document.getElementById('f-supplementary-summary');
    if(!summary)return;
    const size=files.reduce((sum,file)=>sum+file.size,0);
    summary.textContent=text(`${files.length}/30 fichier(s) sélectionné(s) — ${(size/MIB).toFixed(1)}/200 Mo au total.`,`${files.length}/30 file(s) selected — ${(size/MIB).toFixed(1)}/200 MB total.`);
  }
  document.getElementById('f-supplementary')?.addEventListener('change',supplementarySummary);
  supplementarySummary();

  form.addEventListener('submit',async function(event){
    event.preventDefault();event.stopImmediatePropagation();if(busy)return;
    if(BOE_WORKFLOW_URL.startsWith('PASTE_')){fail(new Error(text('Le dépôt BOE n’est pas encore configuré.','The BOE upload service is not configured.')));return;}
    const lang=value('f-lang');
    const metadata={
      action:'publicSubmission',honeypot:value('hp'),author_name:value('f-name'),author_email:value('f-email'),affiliation:value('f-affil'),orcid:value('f-orcid'),
      article_title:value('f-title'),manuscript_language:lang,abstract_en:value('f-abstract-en'),abstract_fr:value('f-abstract-fr'),abstract_original:value('f-abstract-lang'),
      keywords_en:keywords('en'),keywords_fr:keywords('fr'),keywords_original:keywords('lang'),statements:value('f-statements'),copyright_accepted:document.getElementById('f-legal')?.checked===true
    };
    const pdf=document.getElementById('f-pdf')?.files[0], editable=document.getElementById('f-editable')?.files[0];
    const supplements=Array.from(document.getElementById('f-supplementary')?.files || []), problems=[];
    if(!metadata.author_name)problems.push(text('Nom complet','Full name'));
    if(!metadata.author_email)problems.push(text('Adresse courriel','Email address'));
    if(!metadata.article_title)problems.push(text('Titre','Title'));
    if(!lang)problems.push(text('Langue du manuscrit','Manuscript language'));
    if(metadata.abstract_en.length<450 || metadata.abstract_en.length>1500)problems.push(text('Résumé anglais de 450 à 1 500 caractères','English abstract (450–1,500 characters)'));
    if(lang==='French' && (metadata.abstract_fr.length<450 || metadata.abstract_fr.length>1500))problems.push(text('Résumé français de 450 à 1 500 caractères','French abstract (450–1,500 characters)'));
    if(lang!=='French' && lang!=='English' && (metadata.abstract_original.length<450 || metadata.abstract_original.length>1500))problems.push(text('Résumé dans la langue du manuscrit','Abstract in the manuscript language'));
    if(metadata.keywords_en.length!==6)problems.push(text('Six mots-clés anglais','Exactly six English keywords'));
    if(lang==='French' && metadata.keywords_fr.length!==6)problems.push(text('Six mots-clés français','Exactly six French keywords'));
    if(lang!=='French' && lang!=='English' && metadata.keywords_original.length!==6)problems.push(text('Six mots-clés dans la langue du manuscrit','Exactly six keywords in the manuscript language'));
    if(!metadata.copyright_accepted)problems.push(text('Déclaration de droits','Copyright declaration'));
    if(!pdf || extension(pdf.name)!=='pdf' || !pdf.size || pdf.size>MAX_PDF_BYTES)problems.push(text('PDF anonymisé non vide, 15 Mo maximum','A non-empty anonymized PDF, 15 MB maximum'));
    if(!editable || !EDITABLE_EXTENSIONS.includes(extension(editable.name)) || !editable.size || editable.size>MAX_EDITABLE_BYTES)problems.push(text('Original éditable non vide dans un format accepté, 30 Mo maximum','A non-empty editable original in an accepted format, 30 MB maximum'));
    if(supplements.length>MAX_SUPPLEMENTARY_FILES)problems.push(text('30 fichiers supplémentaires maximum','At most 30 supplementary files'));
    if(supplements.reduce((sum,file)=>sum+file.size,0)>MAX_SUPPLEMENTARY_BYTES)problems.push(text('200 Mo maximum pour l’ensemble des suppléments','200 MB maximum for all supplementary files combined'));
    supplements.forEach(file=>{if(!file.size || !SUPPLEMENTARY_EXTENSIONS.includes(extension(file.name)))problems.push(text('Fichier supplémentaire vide ou format non accepté : ','Empty supplementary file or unsupported format: ')+file.name);});
    if(problems.length){alert(text('Veuillez corriger :\n\n• ','Please correct:\n\n• ')+problems.join('\n• '));return;}
    const files=[pdf,editable].concat(supplements);
    const manifest=files.map((file,index)=>({index,kind:index===0?'anonymized_pdf':index===1?'editable_original':'supplementary',name:file.name,type:file.type || 'application/octet-stream',size:file.size}));
    busy=true;hideError();freeze();
    try{
      const signatureInput=JSON.stringify({metadata,files:manifest.map((file,index)=>Object.assign({},file,{lastModified:files[index].lastModified}))});
      const digest=await window.crypto.subtle.digest('SHA-256',new TextEncoder().encode(signatureInput));
      const signature=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
      if(activeSession?.uploadId && activeSession.signature!==signature){
        // An uncertain final reply must not become a duplicate merely because the author edited a field.
        progress(files.map(()=>0),files,text('Vérification du précédent envoi avant modification…','Checking the previous upload before applying changes…'));
        try{
          const previous=await retryTransport(sessionRequest('getSubmissionUploadStatus'));
          if(previous.submissionId){complete(previous.submissionId,true);return;}
        }catch(error){
          if(error.code!=='UPLOAD_EXPIRED')throw error;
          activeSession=null;saveSession();
        }
      }
      if(!activeSession || activeSession.signature!==signature){
        activeSession={signature,clientRequestId:randomHex(24),uploadToken:randomHex(32),uploadId:'',expiresAt:''};
        saveSession(); // Save id and secret before START so losing its reply cannot create a duplicate.
      }
      let status;
      if(!activeSession.uploadId){
        progress(files.map(()=>0),files,text('Préparation du dépôt privé…','Preparing the private upload…'));
        status=await retryTransport({action:'startSubmissionUpload',client_request_id:activeSession.clientRequestId,uploadToken:activeSession.uploadToken,metadata,files:manifest});
        if(!status.uploadId || status.uploadToken!==activeSession.uploadToken)throw new Error(text('La session de transfert n’a pas pu être confirmée.','The upload session could not be confirmed.'));
        activeSession.uploadId=status.uploadId;activeSession.expiresAt=status.expiresAt || '';saveSession();
      }else{
        progress(files.map(()=>0),files,text('Vérification des fichiers déjà reçus…','Checking previously received files…'));
        status=await retryTransport(sessionRequest('getSubmissionUploadStatus'));
      }
      if(status.submissionId){complete(status.submissionId);return;}
      let offsets=offsetsFromStatus(status,files);
      const chunkSize=status.chunkSize || MAX_CHUNK_BYTES;
      if(!Number.isInteger(chunkSize) || chunkSize<=0 || chunkSize>MAX_CHUNK_BYTES || chunkSize%(256*1024)!==0)throw new Error(text('La taille de transfert annoncée est invalide.','The announced upload chunk size is invalid.'));
      progress(offsets,files);
      for(let index=0;index<files.length;index++){
        let stalled=0, recoveryAttempts=0, rewinds=0;
        while(offsets[index]<files[index].size){
          const previous=offsets[index], data=await readChunk(files[index],previous,Math.min(previous+chunkSize,files[index].size));
          let received;
          try{received=await request(sessionRequest('uploadSubmissionChunk',{index,offset:previous,data}));}
          catch(error){
            if(!error.transportError)throw error;
            if(++recoveryAttempts>3)throw error;
            progress(offsets,files,text('Connexion interrompue : vérification des fichiers déjà reçus…','Connection interrupted: checking previously received files…'));
            const recovered=await retryTransport(sessionRequest('getSubmissionUploadStatus'));
            if(recovered.submissionId){complete(recovered.submissionId);return;}
            offsets=offsetsFromStatus(recovered,files);
            if(offsets[index]<previous && ++rewinds>2)throw new Error(text('La reprise du transfert nécessite un nouvel essai.','Resuming the upload requires another attempt.'));
            if(offsets[index]===previous && ++stalled>=3)throw error;
            progress(offsets,files);continue;
          }
          if(received.index!==index || received.size!==files[index].size || !Number.isInteger(received.offset) || received.offset<0 || received.offset>files[index].size)throw new Error(text('La confirmation du fichier est incohérente.','The file acknowledgement is inconsistent.'));
          offsets[index]=received.offset;stalled=received.offset===previous?stalled+1:0;
          if(received.offset<previous && ++rewinds>2)throw new Error(text('La reprise du transfert nécessite un nouvel essai.','Resuming the upload requires another attempt.'));
          if(stalled>=3)throw new Error(text('Le transfert ne progresse plus. Vous pouvez reprendre l’envoi.','The upload is no longer progressing. You can continue it.'));
          progress(offsets,files);
        }
      }
      progress(offsets,files,text('Fichiers reçus. Enregistrement définitif de la soumission…','Files received. Finalizing the submission…'));
      let final;
      try{final=await request(sessionRequest('finalizeSubmissionUpload'));}
      catch(error){
        if(!error.transportError)throw error;
        final=await retryTransport(sessionRequest('getSubmissionUploadStatus'));
        if(!final.submissionId)final=await retryTransport(sessionRequest('finalizeSubmissionUpload'));
      }
      complete(final.submissionId);
    }catch(error){fail(error);}
    finally{busy=false;}
  },true);
})();
