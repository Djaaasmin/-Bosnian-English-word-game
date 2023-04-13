const prijevodInput = document.getElementById('prijevod-input');
const feedback = document.getElementById('feedback');
const bosanskaRijec = document.getElementById('bosanska-rijec');
const novaRijecButton = document.querySelector('button:last-of-type');
const provjeriButton = document.getElementById('provjeri-button');

// definira rječnik sa prijevodima
const rijecnik = {
  'новини':'news',
  'книга' : 'book',
  'зображення'  : 'image',
  'пошук' : 'search',
  'купив'  :  'bought',
  'чути'  :   'hear',
  'допомога'  :   'help',
  'зворотний зв язок' : 'feedback',
  'слово'  : 'word',
  'собака'   :  'dog',
  'кішка' :  'cat',
  'будинок'  :  'house',
  'розірвати' : 'tore up',
  'забути' : 'forget',
  



      
 
  

 
  




};

let kljucevi = Object.keys(rijecnik);
let nasumicniKljuc = kljucevi[Math.floor(Math.random() * kljucevi.length)];

// provjerava prijevod
function provjeriPrijevod() {
  const bosanskaRijecTekst = bosanskaRijec.textContent.toLowerCase();
  const prijevod = prijevodInput.value.trim().toLowerCase();
  if (typeof rijecnik[bosanskaRijecTekst] === 'string') {
    if (prijevod === rijecnik[bosanskaRijecTekst]) {
      feedback.textContent = 'точно!';
    } else {
      feedback.textContent = `Невірно! англійське слово є "${rijecnik[bosanskaRijecTekst]}".`;
      // ako upisana riječ nije ispravna, vratiti bosansku riječ natrag u ključeve koje treba prikazati kasnije
      kljucevi.push(bosanskaRijecTekst);
    }
  } else if (Array.isArray(rijecnik[bosanskaRijecTekst])) {
    if (rijecnik[bosanskaRijecTekst].includes(prijevod)) {
      feedback.textContent = 'точно!';
    } else {
      feedback.textContent = `Невірно! англійське слово є "${rijecnik[bosanskaRijecTekst][0]}".`;
      // ako upisana riječ nije ispravna, vratiti bosansku riječ natrag u ključeve koje treba prikazati kasnije
      kljucevi.push(bosanskaRijecTekst);
    }
  }
}


// nasumično odabire riječ iz rječnika i prikazuje je na stranici
function prikaziNasumicnuRijec() {
  if (kljucevi.length === 0) {
    bosanskaRijec.textContent = 'закінчено!';
    novaRijecButton.disabled = true;
    return;
  }
  nasumicniKljuc = kljucevi[Math.floor(Math.random() * kljucevi.length)];
  bosanskaRijec.textContent = nasumicniKljuc;
  kljucevi = kljucevi.filter((item) => item !== nasumicniKljuc);
  prijevodInput.value = '';
  feedback.textContent = '';
}

novaRijecButton.addEventListener('click', prikaziNasumicnuRijec);
provjeriButton.addEventListener('click', provjeriPrijevod);
prijevodInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    provjeriPrijevod();
  }
});
