(function(){
  var c=document.getElementById('heroMotion'); if(!c) return;
  var PAL=[{g:'244,214,140',c:'255,236,176'},{g:'244,214,140',c:'255,236,176'},{g:'244,214,140',c:'255,236,176'},{g:'110,200,165',c:'175,238,212'},{g:'110,200,165',c:'175,238,212'},{g:'236,142,100',c:'252,192,160'},{g:'236,142,100',c:'252,192,160'},{g:'104,166,214',c:'170,212,242'},{g:'104,166,214',c:'170,212,242'}];
  var ctx=c.getContext('2d'), dpr=Math.min(window.devicePixelRatio||1,2), W=0,H=0, parts=[], t0=performance.now();
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function resize(){
    var r=c.getBoundingClientRect(); W=r.width; H=r.height;
    c.width=W*dpr; c.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.round(Math.min(70,Math.max(26,W/20))); parts=[];
    for(var i=0;i<n;i++) parts.push({k:PAL[Math.floor(Math.random()*PAL.length)],x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+.8,
      v:Math.random()*.16+.05,a:Math.random()*.55+.2,p:Math.random()*6.28,s:Math.random()*.6+.3});
  }
  function glow(x,y,rad,col,al){
    var g=ctx.createRadialGradient(x,y,0,x,y,rad);
    g.addColorStop(0,'rgba('+col+','+al+')'); g.addColorStop(1,'rgba('+col+',0)');
    ctx.fillStyle=g; ctx.fillRect(x-rad,y-rad,rad*2,rad*2);
  }
  function frame(now){
    var t=(now-t0)/1000;
    ctx.fillStyle='#1E2226'; ctx.fillRect(0,0,W,H);
    var m=Math.max(W,H);
    glow(W*(.25+.08*Math.sin(t*.11)),H*(.35+.1*Math.cos(t*.09)),m*.62,'52,60,68',.7);
    glow(W*(.78+.07*Math.cos(t*.10)),H*(.62+.09*Math.sin(t*.12)),m*.55,'209,162,67',.30);
    glow(W*(.5+.1*Math.sin(t*.07)),H*(.1+.06*Math.cos(t*.08)),m*.45,'209,162,67',.2);
    // drifting gold particles
    for(var i=0;i<parts.length;i++){
      var p=parts[i]; p.y-=p.v; p.x+=Math.sin(t*.25+p.p)*.12; if(p.y<-6){p.y=H+6;p.x=Math.random()*W;}
      var tw=.55+.45*Math.sin(t*p.s*2+p.p);
      glow(p.x,p.y,p.r*9,p.k.g,p.a*.35*tw);
      ctx.fillStyle='rgba('+p.k.c+','+(p.a*tw)+')'; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.283); ctx.fill();
    }
    if(!reduce) requestAnimationFrame(frame);
  }
  resize(); window.addEventListener('resize',resize);
  if(reduce){ frame(performance.now()); } else { requestAnimationFrame(frame); }
})();
