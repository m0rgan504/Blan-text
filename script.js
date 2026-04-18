// ══════════════════════════════════════════════
//  BLINDTEST IA — script.js
//  Génération via Claude (sans clé API requise)
// ══════════════════════════════════════════════

const KEY_LABELS = ['1','2','3','4','5','6','7','8','9','A','B','C'];
const AVATARS = ['🎤','🎸','🥁','🎹','🎷','🎺','🎻','🎧','🎵','🎶','🎬','📺','🏆','🦁','🐯','🦊','🐺','🐧','🦋','🌟'];

const CATEGORIES = [
  { id: 'music',  name: 'Musique',     icon: '🎵' },
  { id: 'film',   name: 'Films',       icon: '🎬' },
  { id: 'series', name: 'Séries',      icon: '📺' },
  { id: 'game',   name: 'Jeux vidéo',  icon: '🎮' },
  { id: 'sport',  name: 'Sport',       icon: '⚽' },
  { id: 'other',  name: 'Culture G.',  icon: '🌍' },
];

// ─── BANQUES DE QUESTIONS PAR CATÉGORIE ───────
// Questions générées à l'avance, très variées, par décennie
const QUESTION_BANK = {
  music: [
    // 70s-80s
    { years:[1970,1989], text:"Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?", answers:["ABBA","Led Zeppelin","The Beatles","Rolling Stones","Queen","Pink Floyd","The Who","Elton John","David Bowie","Fleetwood Mac","Eagles","AC/DC"], correct:4 },
    { years:[1970,1989], text:"Qui chantait 'Thriller' en 1982 ?", answers:["Prince","Michael Jackson","Stevie Wonder","James Brown","Whitney Houston","Madonna","Tina Turner","Diana Ross","Lionel Richie","Rick James","George Michael","Billy Joel"], correct:1 },
    { years:[1970,1989], text:"Quel artiste a sorti l'album 'Purple Rain' en 1984 ?", answers:["David Bowie","Madonna","Bruce Springsteen","Prince","Duran Duran","The Police","U2","Depeche Mode","Tears for Fears","Pet Shop Boys","Wham!","Sting"], correct:3 },
    { years:[1970,1989], text:"Qui chantait 'Like a Virgin' en 1984 ?", answers:["Cyndi Lauper","Pat Benatar","Blondie","Madonna","Annie Lennox","Whitney Houston","Tina Turner","Janet Jackson","Kim Wilde","Debbie Harry","Grace Jones","Kate Bush"], correct:3 },
    { years:[1970,1989], text:"Quel groupe britannique a sorti 'Don't You Want Me' en 1981 ?", answers:["Duran Duran","Spandau Ballet","Human League","Depeche Mode","New Order","The Cure","Joy Division","Tears for Fears","Simple Minds","ABC","Ultravox","Talk Talk"], correct:2 },
    // 90s
    { years:[1990,1999], text:"Qui chantait 'Baby One More Time' en 1998 ?", answers:["Christina Aguilera","Backstreet Boys","NSYNC","Spice Girls","Britney Spears","Destiny's Child","TLC","Mariah Carey","Whitney Houston","Janet Jackson","Alanis Morissette","No Doubt"], correct:4 },
    { years:[1990,1999], text:"Quel groupe a sorti 'Smells Like Teen Spirit' en 1991 ?", answers:["Pearl Jam","Soundgarden","Alice in Chains","Stone Temple Pilots","Nirvana","Green Day","The Offspring","Rage Against the Machine","Red Hot Chili Peppers","Foo Fighters","Bush","Weezer"], correct:4 },
    { years:[1990,1999], text:"Qui chantait 'Wannabe' en 1996 ?", answers:["Destiny's Child","TLC","En Vogue","Eternal","All Saints","Spice Girls","Salt-N-Pepa","Bananarama","Wilson Phillips","Ace of Base","Sugababes","B*Witched"], correct:5 },
    { years:[1990,1999], text:"Quel rappeur a sorti 'The Chronic' en 1992 ?", answers:["Snoop Dogg","Ice Cube","Tupac","Biggie","Dr. Dre","Jay-Z","Nas","Wu-Tang Clan","DMX","LL Cool J","Ice-T","Busta Rhymes"], correct:4 },
    { years:[1990,1999], text:"Qui a chanté 'My Heart Will Go On' pour Titanic en 1997 ?", answers:["Whitney Houston","Mariah Carey","Shania Twain","Gloria Estefan","Celine Dion","Toni Braxton","Sade","Enya","Sarah McLachlan","Jewel","Alanis Morissette","Natalie Imbruglia"], correct:4 },
    // 2000s
    { years:[2000,2009], text:"Qui chantait 'Crazy in Love' en 2003 ?", answers:["Rihanna","Alicia Keys","Mary J. Blige","Jennifer Lopez","Beyoncé","Mariah Carey","Ashanti","Ciara","Nelly Furtado","Amerie","Kelis","Pink"], correct:4 },
    { years:[2000,2009], text:"Quel groupe a sorti 'Boulevard of Broken Dreams' en 2004 ?", answers:["The Killers","Fall Out Boy","My Chemical Romance","Blink-182","Good Charlotte","Simple Plan","Green Day","Sum 41","Yellowcard","New Found Glory","Paramore","Taking Back Sunday"], correct:6 },
    { years:[2000,2009], text:"Qui a sorti 'Numb/Encore' avec Jay-Z en 2004 ?", answers:["Eminem","50 Cent","Kanye West","Linkin Park","Limp Bizkit","P. Diddy","Busta Rhymes","Lil Wayne","T.I.","The Game","Snoop Dogg","Nelly"], correct:3 },
    { years:[2000,2009], text:"Qui chantait 'Rehab' en 2006 ?", answers:["Lily Allen","Kate Nash","Duffy","Adele","Amy Winehouse","Norah Jones","Katie Melua","Corinne Bailey Rae","Feist","Regina Spektor","Ingrid Michaelson","Lenka"], correct:4 },
    { years:[2000,2009], text:"Quel artiste a sorti 'Gold Digger' en 2005 ?", answers:["Jay-Z","Pharrell","Usher","Ludacris","T.I.","Kanye West","Lil Wayne","50 Cent","The Game","Nelly","Chingy","Young Jeezy"], correct:5 },
    // 2010s
    { years:[2010,2019], text:"Qui chantait 'Rolling in the Deep' en 2010 ?", answers:["Amy Winehouse","Duffy","Lana Del Rey","Ellie Goulding","Adele","Florence + The Machine","Paloma Faith","Birdy","Bat for Lashes","Laura Marling","Jessie J","Emeli Sandé"], correct:4 },
    { years:[2010,2019], text:"Quel groupe a sorti 'Somebody That I Used to Know' en 2011 ?", answers:["Of Monsters and Men","Mumford & Sons","The Lumineers","Imagine Dragons","Gotye","Phoenix","Bon Iver","Fleet Foxes","Arcade Fire","Foster the People","Passion Pit","Two Door Cinema Club"], correct:4 },
    { years:[2010,2019], text:"Qui chantait 'Shape of You' en 2017 ?", answers:["Sam Smith","James Arthur","Olly Murs","Harry Styles","Ed Sheeran","Shawn Mendes","Charlie Puth","Niall Horan","Liam Payne","James Bay","George Ezra","JP Cooper"], correct:4 },
    { years:[2010,2019], text:"Quel rappeur a sorti 'DAMN.' en 2017 ?", answers:["J. Cole","Childish Gambino","Tyler the Creator","Logic","Big Sean","Kendrick Lamar","Drake","Travis Scott","Chance the Rapper","21 Savage","Migos","Future"], correct:5 },
    { years:[2010,2019], text:"Qui chantait 'Bad Guy' en 2019 ?", answers:["Lorde","Halsey","Dua Lipa","Lizzo","Billie Eilish","Ariana Grande","Olivia Rodrigo","Cardi B","Camila Cabello","Selena Gomez","Demi Lovato","Bebe Rexha"], correct:4 },
    // 2020s
    { years:[2020,2025], text:"Qui a sorti 'Levitating' en 2020 ?", answers:["Ariana Grande","Doja Cat","Olivia Rodrigo","Dua Lipa","Lizzo","Billie Eilish","Cardi B","Megan Thee Stallion","Demi Lovato","Bebe Rexha","Ava Max","Kim Petras"], correct:3 },
    { years:[2020,2025], text:"Qui chantait 'Blinding Lights' en 2020 ?", answers:["Drake","Post Malone","The Weeknd","Justin Bieber","Bruno Mars","Khalid","H.E.R.","Miguel","John Legend","SZA","6LACK","NAV"], correct:2 },
    { years:[2020,2025], text:"Quel artiste a sorti 'drivers license' en 2021 ?", answers:["Ariana Grande","Billie Eilish","Taylor Swift","Dua Lipa","Olivia Rodrigo","Selena Gomez","Demi Lovato","Halsey","Camila Cabello","Sabrina Carpenter","Gracie Abrams","Conan Gray"], correct:4 },
  ],

  film: [
    { years:[1970,1989], text:"Quel film de Spielberg a créé le concept de 'blockbuster' en 1975 ?", answers:["Star Wars","Close Encounters","E.T.","Raiders of the Lost Ark","Jaws","Poltergeist","Gremlins","Back to the Future","Indiana Jones","1941","Always","Empire of the Sun"], correct:4 },
    { years:[1970,1989], text:"Qui a réalisé 'Apocalypse Now' en 1979 ?", answers:["Martin Scorsese","Brian De Palma","Sidney Pollack","Michael Cimino","Francis Ford Coppola","George Lucas","Steven Spielberg","Robert Altman","Alan Parker","Hal Ashby","Bob Fosse","John Cassavetes"], correct:4 },
    { years:[1970,1989], text:"Dans quel film entend-on 'May the Force be with you' pour la première fois en 1977 ?", answers:["Flash Gordon","Battlestar Galactica","2001 A Space Odyssey","Logan's Run","Star Wars","Close Encounters","Superman","The Black Hole","Alien","Buck Rogers","Star Trek","Dune"], correct:4 },
    { years:[1990,1999], text:"Quel film a remporté l'Oscar du meilleur film en 1994 ?", answers:["Schindler's List","Philadelphia","The Piano","The Remains of the Day","Forrest Gump","Pulp Fiction","The Shawshank Redemption","Four Weddings and a Funeral","Quiz Show","Bullets Over Broadway","Hoop Dreams","Heavenly Creatures"], correct:4 },
    { years:[1990,1999], text:"Qui joue le personnage de Morpheus dans Matrix (1999) ?", answers:["Will Smith","Denzel Washington","Samuel L. Jackson","Vin Diesel","Laurence Fishburne","Wesley Snipes","Idris Elba","Don Cheadle","Jamie Foxx","Cuba Gooding Jr.","Terrence Howard","Jeffrey Wright"], correct:4 },
    { years:[1990,1999], text:"Dans quel film de 1999 Bruce Willis est-il un psychologue qui voit des gens morts ?", answers:["Unbreakable","Die Hard 3","The Jackal","Armageddon","The Sixth Sense","Pulp Fiction","12 Monkeys","The Fifth Element","Sin City","Mercury Rising","Color of Night","The Siege"], correct:4 },
    { years:[2000,2009], text:"Quel film a remporté la Palme d'Or à Cannes en 2004 ?", answers:["Elephant","The Son","The Child","4 Months 3 Weeks 2 Days","Fahrenheit 9/11","Hidden","The Wind That Shakes the Barley","Caché","Rosetta","L'Enfant","Swimming Pool","Time of the Wolf"], correct:4 },
    { years:[2000,2009], text:"Qui réalise la trilogie 'Le Seigneur des Anneaux' (2001-2003) ?", answers:["Steven Spielberg","James Cameron","Ridley Scott","Christopher Nolan","Peter Jackson","George Lucas","Bryan Singer","Sam Raimi","Gore Verbinski","Rob Reiner","Terry Gilliam","Wolfgang Petersen"], correct:4 },
    { years:[2000,2009], text:"Dans quel film de 2008 Heath Ledger joue-t-il le Joker ?", answers:["Batman Begins","Iron Man","Spider-Man 3","Superman Returns","The Dark Knight","X-Men Origins","Watchmen","Hellboy 2","Punisher War Zone","Ghost Rider","Daredevil","Blade Trinity"], correct:4 },
    { years:[2010,2019], text:"Quel film d'animation Pixar sort en 2015 sur les émotions d'une fillette ?", answers:["Brave","Monsters University","Finding Dory","Coco","Inside Out","The Good Dinosaur","Toy Story 4","Onward","Soul","Luca","Turning Red","Lightyear"], correct:4 },
    { years:[2010,2019], text:"Qui réalise 'Parasite' (2019), Palme d'Or et Oscar du meilleur film ?", answers:["Park Chan-wook","Kim Jee-woon","Na Hong-jin","Yeon Sang-ho","Bong Joon-ho","Lee Chang-dong","Hong Sang-soo","Kim Ki-duk","Im Sang-soo","Oh Seung-uk","Jang Jun-hwan","Choi Dong-hoon"], correct:4 },
    { years:[2010,2019], text:"Dans quel film de 2014 Matthew McConaughey voyage-t-il à travers un trou de ver ?", answers:["Arrival","The Martian","Gravity","Europa Report","Interstellar","Ad Astra","Contact","Event Horizon","Sunshine","Moon","Source Code","Oblivion"], correct:4 },
    { years:[2020,2025], text:"Quel film remporte l'Oscar du meilleur film en 2022 ?", answers:["Belfast","Licorice Pizza","Drive My Car","Dune","CODA","The Power of the Dog","King Richard","West Side Story","Don't Look Up","Tick Tick Boom","Spencer","The Tragedy of Macbeth"], correct:4 },
    { years:[2020,2025], text:"Qui joue Elvis Presley dans le biopic 'Elvis' de 2022 ?", answers:["Miles Teller","Timothée Chalamet","Ansel Elgort","Tom Holland","Austin Butler","Finn Wittrock","Lucas Hedges","Taron Egerton","Rami Malek","Ezra Miller","Joe Alwyn","Barry Keoghan"], correct:4 },
  ],

  series: [
    { years:[1990,1999], text:"Dans quelle série des années 90 les personnages s'appellent Ross, Rachel et Monica ?", answers:["Seinfeld","Frasier","Mad About You","Caroline in the City","Friends","Will & Grace","Everybody Loves Raymond","Home Improvement","Ellen","The Nanny","Dharma & Greg","NewsRadio"], correct:4 },
    { years:[1990,1999], text:"Quelle série culte des 90s suit des adolescents à Beverly Hills ?", answers:["Melrose Place","Baywatch","The O.C.","One Tree Hill","Beverly Hills 90210","Dawson's Creek","Saved by the Bell","Party of Five","My So-Called Life","Felicity","Roswell","7th Heaven"], correct:4 },
    { years:[2000,2009], text:"Dans quelle série les survivants d'un crash d'avion sont bloqués sur une île mystérieuse ?", answers:["Survivor","The Island","Alcatraz","Terra Nova","Lost","FlashForward","The Event","Heroes","Fringe","Prison Break","Jericho","Surface"], correct:4 },
    { years:[2000,2009], text:"Quel personnage de 'Breaking Bad' dit 'I am the danger' ?", answers:["Jesse Pinkman","Hank Schrader","Saul Goodman","Mike Ehrmantraut","Walter White","Gustavo Fring","Todd Alquist","Skyler White","Walt Jr.","Marie Schrader","Tuco Salamanca","Steven Gomez"], correct:4 },
    { years:[2000,2009], text:"Dans quelle série HBO des familles mafieuses s'affrontent dans le New Jersey ?", answers:["Boardwalk Empire","The Wire","Deadwood","Oz","The Sopranos","Rome","Carnivàle","Six Feet Under","Big Love","True Blood","Entourage","Flight of the Conchords"], correct:4 },
    { years:[2010,2019], text:"Quel acteur joue Jon Snow dans 'Game of Thrones' ?", answers:["Richard Madden","Joe Dempsie","Alfie Allen","Iain Glen","Kit Harington","Nikolaj Coster-Waldau","Peter Dinklage","Emile Hirsch","Ben Barnes","Luke Pasqualino","Gethin Anthony","Ed Skrein"], correct:4 },
    { years:[2010,2019], text:"Dans quelle série Netflix une fille aux pouvoirs surnaturels nommée Eleven apparaît ?", answers:["The OA","Dark","Sense8","The 4400","Stranger Things","Altered Carbon","Mindhunter","Ozark","House of Cards","Narcos","13 Reasons Why","Making a Murderer"], correct:4 },
    { years:[2010,2019], text:"Quelle série HBO suit les activités d'une famille royale fictive milliardaire ?", answers:["Billions","The Crown","House of Cards","Designated Survivor","Succession","Veep","VEEP","Homeland","Scandal","The Americans","Madam Secretary","Quantico"], correct:4 },
    { years:[2020,2025], text:"Dans quelle série coréenne des joueurs s'affrontent dans des jeux mortels pour de l'argent ?", answers:["Kingdom","Sweet Home","Hellbound","All of Us Are Dead","Squid Game","My Name","Juvenile Justice","The Glory","Bloodhounds","Moving","Mask Girl","D.P."], correct:4 },
    { years:[2020,2025], text:"Quelle série HBO suit une famille en deuil dans une maison mystérieuse ?", answers:["Lovecraft Country","Watchmen","The Outsider","His Dark Materials","The White Lotus","Euphoria","Succession","The Undoing","Sharp Objects","True Detective","Big Little Lies","Mare of Easttown"], correct:4 },
    { years:[2020,2025], text:"Dans quelle série Disney+ les Mandalorien et Baby Yoda apparaissent ?", answers:["Obi-Wan Kenobi","Andor","Ahsoka","Boba Fett","The Mandalorian","Loki","Hawkeye","Moon Knight","She-Hulk","Ms. Marvel","WandaVision","The Falcon"], correct:4 },
  ],

  game: [
    { years:[1970,1989], text:"Quel jeu d'arcade de 1980 met en scène un fantôme jaune qui mange des pac-gommes ?", answers:["Donkey Kong","Space Invaders","Galaga","Frogger","Pac-Man","Centipede","Asteroids","Missile Command","Defender","Tron","Zaxxon","Q*bert"], correct:4 },
    { years:[1970,1989], text:"Quel jeu de NES popularise un plombier italien en 1985 ?", answers:["Donkey Kong","Castlevania","Mega Man","Metroid","Super Mario Bros.","The Legend of Zelda","Kirby","Sonic","Contra","Duck Hunt","Excitebike","Punch-Out!!"], correct:4 },
    { years:[1990,1999], text:"Quel jeu de combat SEGA rivalise avec Street Fighter dans les 90s ?", answers:["Killer Instinct","Tekken","Soul Edge","Clay Fighter","Mortal Kombat","Samurai Shodown","King of Fighters","Art of Fighting","Bloody Roar","Eternal Champions","Virtua Fighter","Battle Arena Toshinden"], correct:4 },
    { years:[1990,1999], text:"Dans quel jeu de 1996 explore-t-on un manoir hanté avec Leon S. Kennedy ?", answers:["Dino Crisis","Silent Hill","Alone in the Dark","Parasite Eve","Resident Evil","Clock Tower","Eternal Darkness","Haunting Ground","Rule of Rose","Fatal Frame","Echo Night","Corpse Party"], correct:4 },
    { years:[1990,1999], text:"Quel jeu N64 de 1998 est considéré comme l'un des meilleurs de tous les temps ?", answers:["Super Mario 64","GoldenEye 007","Banjo-Kazooie","Star Fox 64","The Legend of Zelda: Ocarina of Time","Donkey Kong 64","Perfect Dark","Wave Race 64","F-Zero X","1080° Snowboarding","Pilotwings 64","Yoshi's Story"], correct:4 },
    { years:[2000,2009], text:"Quel jeu de 2004 permet d'explorer Liberty City dans un monde ouvert ?", answers:["True Crime","Driver","The Getaway","Scarface","GTA San Andreas","Mafia","Saints Row","Mercenaries","Godfather","Bully","Midnight Club","Smuggler's Run"], correct:4 },
    { years:[2000,2009], text:"Dans quel jeu de 2007 on récolte ou sauve des Little Sisters à Rapture ?", answers:["Deus Ex","System Shock 2","Dead Space","Prey","BioShock","Dishonored","Half-Life 2","Portal","Singularity","Quake 4","Doom 3","FEAR"], correct:4 },
    { years:[2010,2019], text:"Quel jeu de 2011 propose de créer et gérer un parc à thème en blocs cubiques ?", answers:["Terraria","Roblox","Starbound","Block Story","Minecraft","LEGO Worlds","Creativerse","Landmark","Trove","Portal Knights","Dragon Quest Builders","Eco"], correct:4 },
    { years:[2010,2019], text:"Dans quel jeu de FromSoftware de 2011 on meurt souvent et on revient à un feu de camp ?", answers:["Demon's Souls","Bloodborne","Sekiro","Elden Ring","Dark Souls","Nioh","The Surge","Code Vein","Salt and Sanctuary","Mortal Shell","Remnant","Death's Gambit"], correct:4 },
    { years:[2020,2025], text:"Quel jeu de 2020 brise tous les records de vente sur PS5 à sa sortie ?", answers:["Returnal","Ratchet & Clank","Sackboy","Astro's Playroom","Spider-Man Miles Morales","Demon's Souls","Kena","Deathloop","Ghostwire Tokyo","Gran Turismo 7","Horizon Forbidden West","God of War Ragnarök"], correct:4 },
    { years:[2020,2025], text:"Quel jeu open-world de FromSoftware sort en 2022 avec George R.R. Martin ?", answers:["Sekiro 2","Armored Core VI","Dark Souls 4","Bloodborne 2","Elden Ring","Demon's Souls Remake","Nioh 3","Lords of the Fallen","Lies of P","The Surge 3","Code Vein 2","Wo Long"], correct:4 },
  ],

  sport: [
    { years:[1970,1989], text:"Quel pays remporte la Coupe du Monde de football en 1970 ?", answers:["Allemagne","Uruguay","Argentine","Angleterre","Brésil","Italie","Pays-Bas","France","Espagne","URSS","Mexique","Tchécoslovaquie"], correct:4 },
    { years:[1970,1989], text:"Qui remporte Roland Garros 1984 et 1985 côté homme ?", answers:["Björn Borg","Jimmy Connors","John McEnroe","Ivan Lendl","Mats Wilander","Guillermo Vilas","José-Luis Clerc","Andrés Gómez","Yannick Noah","Henri Leconte","Thomas Muster","Stefan Edberg"], correct:3 },
    { years:[1990,1999], text:"Quelle équipe remporte la NBA en 1996 avec Michael Jordan ?", answers:["Los Angeles Lakers","Boston Celtics","Miami Heat","Phoenix Suns","Chicago Bulls","Seattle SuperSonics","New York Knicks","San Antonio Spurs","Utah Jazz","Orlando Magic","Houston Rockets","Detroit Pistons"], correct:4 },
    { years:[1990,1999], text:"Qui remporte le Tour de France 5 fois entre 1991 et 1995 ?", answers:["Eddy Merckx","Bernard Hinault","Laurent Fignon","Greg LeMond","Miguel Indurain","Marco Pantani","Bjarne Riis","Jan Ullrich","Richard Virenque","Laurent Jalabert","Tony Rominger","Claudio Chiappucci"], correct:4 },
    { years:[2000,2009], text:"Quel pays remporte la Coupe du Monde 2006 en Allemagne ?", answers:["Allemagne","Brésil","France","Portugal","Italie","Argentine","Angleterre","Espagne","Pays-Bas","Croatie","Ghana","Ukraine"], correct:4 },
    { years:[2000,2009], text:"Qui bat le record du monde du 100m aux JO de Pékin en 2008 ?", answers:["Justin Gatlin","Asafa Powell","Tyson Gay","Kim Collins","Usain Bolt","Maurice Greene","Tim Montgomery","Donovan Bailey","Francis Obikwelu","Churandy Martina","Marc Burns","Darvis Patton"], correct:4 },
    { years:[2010,2019], text:"Quelle équipe remporte la Ligue des Champions 3 fois de suite entre 2016 et 2018 ?", answers:["FC Barcelone","Bayern Munich","Juventus","Paris SG","Real Madrid","Manchester City","Liverpool","Atlético Madrid","Chelsea","Arsenal","Borussia Dortmund","Monaco"], correct:4 },
    { years:[2010,2019], text:"Qui remporte l'US Open de tennis 2012 après avoir été mené 2 sets à 0 en finale ?", answers:["Rafael Nadal","Novak Dj  window.scrollTo(0, 0);
}

// ══════════════════════════════════════════════
//  ÉCRAN 1 — ACCUEIL / JOUEURS
// ══════════════════════════════════════════════
function renderPlayers() {
  const grid = $('playersGrid');
  grid.innerHTML = '';
  players.forEach(p => {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
      <div class="player-avatar">${p.avatar}</div>
      <div class="player-name">${p.name}</div>
      <button class="player-del" data-id="${p.id}" title="Supprimer">✕</button>
    `;
    card.querySelector('.player-del').addEventListener('click', e => {
      e.stopPropagation();
      players = players.filter(x => x.id !== p.id);
      renderPlayers();
    });
    grid.appendChild(card);
  });
  $('btnGoSetup').disabled = players.length < 1;
}

// Modal joueur
let selectedAvatar = AVATARS[0];

$('btnAddPlayer').addEventListener('click', () => {
  selectedAvatar = AVATARS[0];
  $('playerNameInput').value = '';
  buildAvatarPicker();
  openModal('modalPlayer');
  setTimeout(() => $('playerNameInput').focus(), 120);
});

function buildAvatarPicker() {
  const picker = $('avatarPicker');
  picker.innerHTML = '';
  AVATARS.forEach((av, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'avatar-opt' + (i === 0 ? ' selected' : '');
    btn.textContent = av;
    btn.addEventListener('click', () => {
      picker.querySelectorAll('.avatar-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAvatar = av;
    });
    picker.appendChild(btn);
  });
}

$('btnConfirmPlayer').addEventListener('click', addPlayer);
$('playerNameInput').addEventListener('keydown', e => { if (e.key === 'Enter') addPlayer(); });

function addPlayer() {
  const name = $('playerNameInput').value.trim();
  if (!name) { $('playerNameInput').focus(); return; }
  players.push({ id: Date.now(), name, avatar: selectedAvatar, score: 0 });
  closeModal('modalPlayer');
  renderPlayers();
}

$('btnCancelPlayer').addEventListener('click', () => closeModal('modalPlayer'));

// Aller setup
$('btnGoSetup').addEventListener('click', () => {
  renderSetup();
  showScreen('setup');
});

// ══════════════════════════════════════════════
//  ÉCRAN 2 — SETUP QUESTIONS
// ══════════════════════════════════════════════
function renderSetup() {
  const list = $('questionsList');
  list.innerHTML = '';
  questions.forEach((q, i) => {
    const correct = q.answers.find(a => a.correct);
    const item = document.createElement('div');
    item.className = 'q-item';
    item.innerHTML = `
      <span class="q-item-num">Q${i+1}</span>
      <span class="q-item-text">${q.text || '(sans titre)'}</span>
      <span class="q-item-answer">✅ ${correct ? correct.text : '?'}</span>
      <div class="q-item-actions">
        <button class="btn-icon" data-edit="${i}" title="Modifier">✏️</button>
        <button class="btn-icon danger" data-del="${i}" title="Supprimer">🗑️</button>
      </div>
    `;
    item.querySelector('[data-edit]').addEventListener('click', () => openQuestionModal(i));
    item.querySelector('[data-del]').addEventListener('click', () => {
      questions.splice(i, 1);
      renderSetup();
    });
    list.appendChild(item);
  });
  $('qCount').textContent = `${questions.length} question(s)`;
  $('btnStartGame').disabled = questions.length < 1;
}

// Ouvrir modal question
$('btnAddQuestion').addEventListener('click', () => openQuestionModal(null));
$('btnBackHome').addEventListener('click', () => showScreen('home'));

function openQuestionModal(idx) {
  editingQIdx = idx;
  $('modalQTitle').textContent = idx === null ? 'Nouvelle question' : 'Modifier la question';

  const q = idx !== null ? questions[idx] : null;
  $('qTextInput').value = q ? q.text : '';

  buildAnswersSetup(q);
  openModal('modalQuestion');
  setTimeout(() => $('qTextInput').focus(), 120);
}

function buildAnswersSetup(q) {
  const container = $('answersSetup');
  container.innerHTML = '';
  let correctIdx = q ? q.answers.findIndex(a => a.correct) : 0;
  if (correctIdx < 0) correctIdx = 0;

  for (let i = 0; i < 12; i++) {
    const val = q ? (q.answers[i] ? q.answers[i].text : '') : '';
    const row = document.createElement('div');
    row.className = 'ans-input-row' + (i === correctIdx ? ' correct-row' : '');
    row.dataset.idx = i;
    row.innerHTML = `
      <span class="ans-key">${KEY_LABELS[i]}</span>
      <input class="ans-input-field" type="text" placeholder="Réponse ${i+1}..." maxlength="40" value="${escHtml(val)}" />
      <button class="ans-star ${i === correctIdx ? 'is-correct' : ''}" data-staridx="${i}" title="Bonne réponse">⭐</button>
    `;
    row.querySelector('.ans-star').addEventListener('click', () => setCorrect(i));
    container.appendChild(row);
  }
}

function setCorrect(idx) {
  document.querySelectorAll('.ans-input-row').forEach((row, i) => {
    row.classList.toggle('correct-row', i === idx);
    row.querySelector('.ans-star').classList.toggle('is-correct', i === idx);
  });
}

$('btnConfirmQ').addEventListener('click', saveQuestion);
$('btnCancelQ').addEventListener('click', () => closeModal('modalQuestion'));

function saveQuestion() {
  const text = $('qTextInput').value.trim();
  if (!text) { $('qTextInput').focus(); return; }

  const rows = document.querySelectorAll('.ans-input-row');
  const answers = [];
  let correctIdx = -1;

  rows.forEach((row, i) => {
    const val = row.querySelector('.ans-input-field').value.trim();
    const isCor = row.classList.contains('correct-row');
    if (isCor) correctIdx = i;
    answers.push({ text: val, correct: isCor });
  });

  // Vérifications
  const filled = answers.filter(a => a.text.length > 0);
  if (filled.length < 2) { alert('Remplis au moins 2 réponses.'); return; }
  if (correctIdx < 0 || !answers[correctIdx].text) { alert('Marque une bonne réponse (⭐) parmi les réponses remplies.'); return; }

  const qObj = { text, answers };
  if (editingQIdx !== null) {
    questions[editingQIdx] = qObj;
  } else {
    questions.push(qObj);
  }

  closeModal('modalQuestion');
  renderSetup();
}

$('btnStartGame').addEventListener('click', startGame);

// ══════════════════════════════════════════════
//  ÉCRAN 3 — JEU
// ══════════════════════════════════════════════
function startGame() {
  // Réinitialiser scores et état
  players.forEach(p => p.score = 0);
  game.qIndex = 0;
  game.eliminated = {};
  game.pendingAnswerIdx = null;
  players.forEach(p => { game.eliminated[p.id] = new Set(); });

  showScreen('game');
  loadQuestion(0);
}

function loadQuestion(idx) {
  game.qIndex = idx;
  game.pendingAnswerIdx = null;

  const q = questions[idx];
  $('qNum').textContent   = `Q${idx + 1}`;
  $('qTotal').textContent = `/ ${questions.length}`;
  $('qText').textContent  = q.text;

  renderScoreboard();
  renderAnswers(q);
}

function renderScoreboard() {
  const sb = $('scoreboard');
  sb.innerHTML = '';
  players.forEach(p => {
    const chip = document.createElement('div');
    const isElim = game.eliminated[p.id]?.has(game.qIndex);
    chip.className = 'score-chip' + (isElim ? ' eliminated' : '');
    chip.innerHTML = `
      <span class="chip-avatar">${p.avatar}</span>
      <span class="chip-name">${p.name}</span>
      <span class="chip-score">${p.score}</span>
    `;
    sb.appendChild(chip);
  });
}

function renderAnswers(q) {
  const grid = $('answersGrid');
  grid.innerHTML = '';

  q.answers.forEach((ans, i) => {
    if (!ans.text) return; // ne pas afficher les cases vides

    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.dataset.idx = i;
    btn.innerHTML = `
      <span class="key-badge">${KEY_LABELS[i]}</span>
      <span class="ans-text">${escHtml(ans.text)}</span>
    `;
    btn.addEventListener('click', () => onAnswerClick(i));
    grid.appendChild(btn);
  });
}

// Clic sur une réponse
function onAnswerClick(idx) {
  if (game.pendingAnswerIdx !== null) return; // déjà en attente
  game.pendingAnswerIdx = idx;
  const q = questions[game.qIndex];
  const chosen = q.answers[idx];

  // Ouvrir modal "qui a répondu ?"
  $('whoTitle').textContent = 'Qui a répondu ?';
  $('whoAnswer').textContent = chosen.text;

  const whoPlayers = $('whoPlayers');
  whoPlayers.innerHTML = '';
  players.forEach(p => {
    const isElim = game.eliminated[p.id]?.has(game.qIndex);
    const btn = document.createElement('button');
    btn.className = 'who-player-btn';
    btn.disabled = isElim;
    btn.innerHTML = `<div class="wp-avatar">${p.avatar}</div><div class="wp-name">${p.name}</div>`;
    btn.addEventListener('click', () => onPlayerChosen(p.id, idx));
    whoPlayers.appendChild(btn);
  });

  openModal('modalWhoAnswered');
}

function onPlayerChosen(playerId, answerIdx) {
  closeModal('modalWhoAnswered');
  const q = questions[game.qIndex];
  const correct = q.answers[answerIdx].correct;

  // Trouver le bouton correspondant
  const btn = document.querySelector(`.answer-btn[data-idx="${answerIdx}"]`);

  if (correct) {
    // ✅ Bonne réponse
    if (btn) {
      btn.classList.add('revealed-correct', 'flash-green');
      disableAllAnswers();
    }
    const p = players.find(x => x.id === playerId);
    p.score += 1;
    renderScoreboard();

    // Petite pause puis question suivante
    setTimeout(() => nextQuestion(), 1800);
  } else {
    // ❌ Mauvaise réponse — éliminer ce joueur de la question
    if (btn) {
      btn.classList.add('revealed-wrong', 'flash-red');
      btn.disabled = true;
    }
    game.eliminated[playerId].add(game.qIndex);
    renderScoreboard();
    game.pendingAnswerIdx = null;

    // Vérifier si tous les joueurs sont éliminés
    const allElim = players.every(p => game.eliminated[p.id]?.has(game.qIndex));
    if (allElim) {
      // Révéler la bonne réponse et passer
      revealCorrect(q);
      setTimeout(() => nextQuestion(), 2000);
    }
  }
}

function revealCorrect(q) {
  q.answers.forEach((ans, i) => {
    if (ans.correct) {
      const btn = document.querySelector(`.answer-btn[data-idx="${i}"]`);
      if (btn) btn.classList.add('revealed-correct');
    }
  });
  disableAllAnswers();
}

function disableAllAnswers() {
  document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
}

function nextQuestion() {
  const next = game.qIndex + 1;
  if (next >= questions.length) {
    endGame();
  } else {
    loadQuestion(next);
  }
}

// Passer la question
$('btnSkip').addEventListener('click', () => {
  const q = questions[game.qIndex];
  revealCorrect(q);
  setTimeout(() => nextQuestion(), 1200);
});

// Raccourcis clavier
document.addEventListener('keydown', e => {
  if (!screens.game.classList.contains('active')) return;
  if (document.querySelector('.modal-overlay.open')) return;

  const key = e.key.toUpperCase();
  const idx = KEY_LABELS.indexOf(key);
  if (idx >= 0) {
    const btn = document.querySelector(`.answer-btn[data-idx="${idx}"]`);
    if (btn && !btn.disabled) btn.click();
  }
});

$('btnCancelWho').addEventListener('click', () => {
  game.pendingAnswerIdx = null;
  closeModal('modalWhoAnswered');
});

// ══════════════════════════════════════════════
//  ÉCRAN 4 — FIN
// ══════════════════════════════════════════════
function endGame() {
  showScreen('end');

  const sorted = [...players].sort((a, b) => b.score - a.score);
  const finalDiv = $('finalScores');
  finalDiv.innerHTML = '';

  sorted.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = `final-row rank-${i+1}`;
    row.style.animationDelay = `${i * 0.08}s`;
    const rankEmoji = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`;
    row.innerHTML = `
      <span class="final-rank">${rankEmoji}</span>
      <span class="final-avatar">${p.avatar}</span>
      <span class="final-name">${p.name}</span>
      <span class="final-pts">${p.score} pt${p.score > 1 ? 's' : ''}</span>
    `;
    finalDiv.appendChild(row);
  });
}

$('btnReplay').addEventListener('click', () => {
  renderSetup();
  showScreen('setup');
});

$('btnHomeEnd').addEventListener('click', () => {
  renderPlayers();
  showScreen('home');
});

// ══════════════════════════════════════════════
//  UTILITAIRES MODAL
// ══════════════════════════════════════════════
function openModal(id) {
  $(id).classList.add('open');
}
function closeModal(id) {
  $(id).classList.remove('open');
}

// Fermer en cliquant l'overlay
['modalPlayer','modalQuestion','modalWhoAnswered'].forEach(id => {
  $(id).addEventListener('click', e => {
    if (e.target === $(id)) closeModal(id);
  });
});

// Fermer avec Escape (sauf modalWhoAnswered en attente)
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  ['modalPlayer','modalQuestion'].forEach(id => closeModal(id));
});

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════
renderPlayers();
