function SoundBlasterFata1ty(){this.is_enabled=true;this.lastPlayed=_.now();this.betSounds=[];this.betSounds.push(document.getElementById('bet1-sound'));this.betSounds.push(document.getElementById('bet2-sound'));this.betSounds.push(document.getElementById('bet3-sound'));this.betSounds.forEach(function(e){e.volume=0.2;});this.gameStartSound=document.getElementById('game-start-sound');this.gameStartSound.volume=0.1;this.clickSounds=[];this.clickSounds.push(document.getElementById('click-sound-1'));this.clickSounds.push(document.getElementById('click-sound-2'));this.clickSounds.push(document.getElementById('click-sound-3'));this.clickSounds.push(document.getElementById('click-sound-4'));this.clickSounds.push(document.getElementById('click-sound-5'));this.clickSounds.push(document.getElementById('click-sound-6'));this.clickSounds.push(document.getElementById('click-sound-7'));this.clickSounds.push(document.getElementById('click-sound-8'));this.clickSounds.push(document.getElementById('click-sound-9'));this.clickSounds.push(document.getElementById('click-sound-10'));this.clickSounds.forEach(function(e){e.volume=0.15;});this.clickCounter=0;}
SoundBlasterFata1ty.prototype.bet=function bet(){if(!this.is_enabled)return;if(this.lastPlayed>_.now()- 1000)return;this.lastPlayed=_.now();try{this.betSounds[Math.floor(Math.random()*3)].play();}catch(ex){console.error(ex);}}
SoundBlasterFata1ty.prototype.gameStart=function gameStart(){if(!this.is_enabled)return;this.lastPlayed=_.now();this.gameStartSound.play();}
SoundBlasterFata1ty.prototype.click=function click(){if(!this.is_enabled)return;if(this.clickCounter>9)this.clickCounter=0;this.clickSounds[this.clickCounter].play();this.clickCounter++;}
SoundBlasterFata1ty.prototype.toggle=function toggle(){if(this.is_enabled){this.is_enabled=false;}else{this.is_enabled=true;}}