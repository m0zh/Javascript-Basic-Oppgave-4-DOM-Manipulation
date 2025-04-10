const produkter = [
  { navn: "Gaming screen", pris: 500, bilde: "./images/Gaming-screen.png" },
  { navn: "Gaming pc", pris: 2500, bilde: "./images/Gaming-pc.png" },
  { navn: "Gaming mouse", pris: 95, bilde: "./images/Gaming-mouse.png" },
  { navn: "Gaming keyboard", pris: 120, bilde: "./images/Gaming-keyboard.png" },
];

let totalPris = 0;
let totalProdukter = 0;
let handlekurv = {}; // Endret til et objekt for å holde oversikt over antall av hvert produkt

function showContent() {
  const container = document.getElementById("container");
  container.textContent = ""; // Tømmer containeren før vi viser produktene

  // Looper gjennom produkter og appender dem til siden
  for (let produkt of produkter) {
    const div = document.createElement("div");
    div.className = "produkt";

    const bilde = document.createElement("img");
    bilde.src = produkt.bilde;
    bilde.alt = produkt.navn;
    bilde.className = "produkt-bilde";
    div.appendChild(bilde);

    const tittel = document.createElement("h3");
    tittel.textContent = produkt.navn;

    const pris = document.createElement("p");
    pris.textContent = `Pris: ${produkt.pris} $`;

    const knapp = document.createElement("button");
    knapp.className = "knapp";
    knapp.textContent = "Legg i handlekurv";

    knapp.addEventListener("click", () => {
      leggTilIHandlekurv(produkt);
    });

    div.appendChild(tittel);
    div.appendChild(pris);
    div.appendChild(knapp);

    container.appendChild(div);
  }
}
// legger til produkter i handlekurven
function leggTilIHandlekurv(produkt) {
  // Sjekk om produktet allerede finnes i handlekurven
  if (handlekurv[produkt.navn]) {
    handlekurv[produkt.navn].antall += 1; // Øk antallet
  } else {
    // Hvis ikke, legg til produktet med antall = 1
    handlekurv[produkt.navn] = { ...produkt, antall: 1 };
  }

  totalPris += produkt.pris;
  totalProdukter += 1;

  visHandlekurv();
}

// Viser produktene i handlekurven
function visHandlekurv() {
  const handlekurvContainer = document.getElementById("handlekurv");
  handlekurvContainer.textContent = ""; // Tømmer handlekurven før vi viser den

  // Vis hvert produkt i handlekurven, sammen med antallet
  for (let produktNavn in handlekurv) {
    const produkt = handlekurv[produktNavn];

    const item = document.createElement("p");
    // Hvis antall > 1, vis "x$" for antallet
    if (produkt.antall > 1) {
      item.textContent = `${produkt.navn} x${produkt.antall} – ${
        produkt.pris * produkt.antall
      } $`;
    } else {
      item.textContent = `${produkt.navn} – ${produkt.pris} $`;
    }
    handlekurvContainer.appendChild(item);
  }

  // Vis totalsum og antall produkter i handlekurven
  const total = document.createElement("p");
  total.style.fontWeight = "bold";
  total.textContent = `Totalt: ${totalProdukter} produkter – ${totalPris} $`;
  handlekurvContainer.appendChild(total);

  // Vis "Kjøp"-knapp hvis handlekurven ikke er tom
  if (totalProdukter > 0) {
    const knapp = document.createElement("button");
    knapp.textContent = "Kjøp";
    knapp.className = "kjop-knapp";

    knapp.addEventListener("click", () => {
      visPopup();
      tømHandlekurv();
    });

    handlekurvContainer.appendChild(knapp);
  }
}
// resetter handlekurven
function tømHandlekurv() {
  handlekurv = {}; // Tøm handlekurven
  totalPris = 0;
  totalProdukter = 0;

  visHandlekurv();
}

// Funksjon for å vise pop-up med kjøpsinformasjon
function visPopup() {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  // Lag en melding med produktene og prisen
  const produktNavn = Object.values(handlekurv)
    .map((produkt) => `${produkt.navn} x${produkt.antall}`)
    .join(", ");
  popupMessage.textContent = `Du har kjøpt ${produktNavn} til en pris av ${totalPris} $.`;

  // Vis modalen
  popup.style.display = "block";
}

// Funksjon for å lukke pop-up
function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

window.onload = showContent;
