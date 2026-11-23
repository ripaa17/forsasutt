var $=function(i){return document.getElementById(i)};
function go(id){document.querySelectorAll('.scene').forEach(function(s){s.classList.remove('on')});$(id).classList.add('on');if(id==='s3'){startBalloons();preloadSong()}if(id==='s4')confetti(120)}

function preloadSong(){if(window.au){au.preload='auto';au.load()}}
var msgs=["Kamu itu lucu banget, serius 😆","Kamu pantas dihargai, titik. 💖","Tawamu bikin hari orang lain lebih cerah ☀️","Kamu cukup. Persis seperti dirimu sekarang 🌷","Patah hati itu sakit, tapi kamu lebih kuat dari yang kamu kira 💪","Kamu bukan pilihan kedua. Kamu pilihan terbaik buat dirimu sendiri ✨","Yang pergi nggak bisa ngurangin nilai kamu 🫶"];
var taps=0;
var faces=["M84 122q16 16 32 0","M80 118q20 28 40 0","M86 124q14 10 28 0"];
function tapMochi(e){
  if(taps>=7)return;
  taps++;
  var m=$('mochi');m.classList.remove('hop');void m.getBoundingClientRect();m.classList.add('hop');
  $('mouth').setAttribute('d',faces[taps%3]);
  $('say').textContent=msgs[taps-1];
  $('cnt').textContent=taps<7?'Ketuk lagi! ('+taps+'/7)':'Mochi senang banget! 🥰';
  burst(e.clientX,e.clientY,['💖','✨','🌸','💛']);
  if(taps===7){$('next2').style.display='inline-block';confetti(40)}
}
function burst(x,y,set){
  for(var i=0;i<5;i++){var f=document.createElement('div');f.className='float';f.textContent=set[Math.floor(Math.random()*set.length)];f.style.left=(x-14+(Math.random()*80-40))+'px';f.style.top=(y-14)+'px';document.body.appendChild(f);setTimeout(function(el){el.remove()},1700,f)}
}
function confetti(n){
  var c=['#ff6fa5','#ffd23f','#6ee7b7','#7dd3fc','#c4b5fd','#fb923c'];
  for(var i=0;i<n;i++){var d=document.createElement('div');d.className='conf';d.style.left=Math.random()*100+'vw';d.style.background=c[i%c.length];d.style.animationDuration=(2+Math.random()*2.5)+'s';d.style.animationDelay=(Math.random()*.8)+'s';document.body.appendChild(d);setTimeout(function(el){el.remove()},5500,d)}
}

var bmsgs=["Kamu nggak sendirian 🤗","Pelan-pelan aja, nggak apa-apa 🌈","Kamu sahabat terbaik yang pernah ada 🥹","Kamu layak dicintai dengan utuh 💞","Besok bakal lebih ringan, janji 🌤️"];
var popped=0,spawner=null,bcols=['#ff8fb8','#ffd23f','#7dd3fc','#a7f3d0','#c4b5fd'];
function startBalloons(){
  popped=0;spawn();spawner=setInterval(spawn,1100);
}
function spawn(){
  if(popped>=5){clearInterval(spawner);return}
  var b=document.createElement('div');b.className='balloon';b.textContent='💌';
  b.style.left=(8+Math.random()*78)+'vw';b.style.background=bcols[Math.floor(Math.random()*5)];
  b.style.setProperty('--dx',(Math.random()*60-30)+'px');b.style.animationDuration=(7+Math.random()*3)+'s';
  b.onclick=function(e){
    if(b.dataset.done)return;b.dataset.done=1;
    var r=b.getBoundingClientRect();b.classList.add('pop');
    burst(r.left+35,r.top+40,['💥','✨','💖']);
    $('say3').textContent=bmsgs[popped];popped++;
    setTimeout(function(){b.remove()},250);
    if(popped>=5){clearInterval(spawner);setTimeout(function(){go('s4')},2200)}
  };
  b.addEventListener('animationend',function(ev){if(ev.animationName==='rise')b.remove()});
  $('sky').appendChild(b);
}

var au=new Audio();au.preload='none';au.src='audio/diri.m4a';
function fmt(t){if(!isFinite(t))return'0:00';var m=Math.floor(t/60),x=Math.floor(t%60);return m+':'+(x<10?'0':'')+x}
function togglePlay(){if(au.paused){au.play().catch(function(){})}else{au.pause()}}
au.addEventListener('play',function(){$('pp').textContent='⏸ Jeda';$('disc').classList.add('spin')});
au.addEventListener('pause',function(){$('pp').textContent='▶ Putar lagu';$('disc').classList.remove('spin')});
au.addEventListener('ended',function(){$('pp').textContent='▶ Putar lagi';$('disc').classList.remove('spin');confetti(60)});
au.addEventListener('loadedmetadata',function(){$('tdur').textContent=fmt(au.duration)});
au.addEventListener('timeupdate',function(){$('tcur').textContent=fmt(au.currentTime);if(au.duration)$('seek').value=au.currentTime/au.duration*100});
$('seek').addEventListener('input',function(){if(au.duration)au.currentTime=this.value/100*au.duration});

