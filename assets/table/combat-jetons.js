/* Règles de liaison profil -> combattant -> jeton. Sans accès réseau. */
(function(root, factory){
  if(typeof module === 'object' && module.exports) module.exports = factory();
  else root.TableCombat = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function(){
  'use strict';
  function manquants(ordre, jetons){
    const poses = new Set(Object.values(jetons || {}).filter(Boolean).map(j => j.cid).filter(Boolean));
    const vus = new Set();
    return (ordre || []).filter(c => {
      if(!c || !c.id || poses.has(c.id) || vus.has(c.id)) return false;
      vus.add(c.id); return true;
    });
  }
  function portraitDirect(value){
    const s = String(value || '').trim();
    if(/^https?:\/\//i.test(s) || /^data:image\/(?:png|jpeg|gif|webp|avif);base64,/i.test(s)) return s;
    if(/^(?:\.\/)?gallerie\//i.test(s)) return s.replace(/^\.\//,'');
    return '';
  }
  function pose(c){
    // Le nom privé et les statistiques du profil ne sont pas copiés au jeton.
    const pf = c.pf || '';
    return {cid:c.id, nom:c.pub || '', type:c.fid?'pj':'crea',
      pf:pf, camp:c.camp || '', source:'combat'};
  }
  async function poserManquants(options){
    if(!options.estMJ()) return {poses:0, raison:'mj'};
    if(!options.cartePresente()) return {poses:0, raison:'carte'};
    const candidats = manquants(options.ordre(), options.jetons());
    let poses = 0;
    for(const candidat of candidats){
      if(!options.estMJ()) return {poses,raison:'mj'};
      if(!options.cartePresente()) return {poses,raison:'carte'};
      // Relecture : un combattant peut avoir été retiré pendant l'envoi précédent.
      const actuel = options.ordre().find(c => c.id === candidat.id);
      if(!actuel || !manquants([actuel], options.jetons()).length) continue;
      try { await options.poser(pose(actuel)); poses++; }
      catch(error) { return {poses,raison:'ecriture',error}; }
    }
    return {poses,raison:''};
  }
  return Object.freeze({manquants,portraitDirect,pose,poserManquants});
});
