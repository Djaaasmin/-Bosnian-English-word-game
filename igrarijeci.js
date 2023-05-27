 const prijevodInput = document.getElementById('prijevod-input');
const feedback = document.getElementById('feedback');
const bosanskaRijec = document.getElementById('bosanska-rijec');
const novaRijecButton = document.querySelector('button:last-of-type');
const provjeriButton = document.getElementById('provjeri-button');

// definira rječnik sa prijevodima
const rijecnik = {
  'kroz':'through',
  'izmedju': 'between',
  'ispod' : 'under',
  'ispred': 'front',
  'preko' : 'across',
  'malo':'small',
  'velik' : 'big',
  'strani' : 'foreign',
  'lijep'  : 'beautiful',
  'cijenjen' : 'appreciated',
  'dlakav' : 'hairy',
  'lošiji' : 'worse',
  'veseo'  : 'happy',
  'ociscen': 'cleaned',
  'umoran' : 'tired',
  'blijed' : 'pale',
  'neobičan':'unusual',
 



      
 
  

 
  




};

let kljucevi = Object.keys(rijecnik);
let nasumicniKljuc = kljucevi[Math.floor(Math.random() * kljucevi.length)];

// provjerava prijevod
function provjeriPrijevod() {
  const bosanskaRijecTekst = bosanskaRijec.textContent.toLowerCase();
  const prijevod = prijevodInput.value.trim().toLowerCase();
  if (typeof rijecnik[bosanskaRijecTekst] === 'string') {
    if (prijevod === rijecnik[bosanskaRijecTekst]) {
      feedback.textContent = 'Tačno!';
    } else {
      feedback.textContent = `Netačno! Engleska riječ je "${rijecnik[bosanskaRijecTekst]}".`;
      // ako upisana riječ nije ispravna, vratiti bosansku riječ natrag u ključeve koje treba prikazati kasnije
      kljucevi.push(bosanskaRijecTekst);
    }
  } else if (Array.isArray(rijecnik[bosanskaRijecTekst])) {
    if (rijecnik[bosanskaRijecTekst].includes(prijevod)) {
      feedback.textContent = 'Tačno!';
    } else {
      feedback.textContent = `Netačno! Engleska riječ je "${rijecnik[bosanskaRijecTekst][0]}".`;
      // ako upisana riječ nije ispravna, vratiti bosansku riječ natrag u ključeve koje treba prikazati kasnije
      kljucevi.push(bosanskaRijecTekst);
    }
  }
}


// nasumično odabire riječ iz rječnika i prikazuje je na stranici
function prikaziNasumicnuRijec() {
  if (kljucevi.length === 0) {
    bosanskaRijec.textContent = 'Završeno!';
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
