// Store local basé sur localStorage pour la maintenance de portes industrielles.

const KEY = "portes-industrielles-db-v1";

const seed = () => ({
  clients: [
    { id: "c1", nom: "Logistique Dupont SA", contact: "Marc Dupont", telephone: "01 23 45 67 89", email: "contact@dupont-logistique.fr", adresse: "12 rue de l'Industrie, 69100 Villeurbanne" },
    { id: "c2", nom: "Entrepôts Martin", contact: "Sophie Martin", telephone: "04 78 90 12 34", email: "s.martin@entrepots-martin.fr", adresse: "45 avenue du Port, 13008 Marseille" },
    { id: "c3", nom: "Groupe Bernard Industrie", contact: "Julien Bernard", telephone: "03 20 55 66 77", email: "contact@bernard-ind.fr", adresse: "8 zone industrielle, 59000 Lille" },
  ],
  portes: [
    { id: "p1", reference: "PRT-2024-001", type: "Sectionnelle", clientId: "c1", emplacement: "Quai de chargement A", dateInstallation: "2022-03-15", statut: "operationnelle" },
    { id: "p2", reference: "PRT-2024-002", type: "Rideau métallique", clientId: "c1", emplacement: "Entrée principale", dateInstallation: "2021-11-02", statut: "maintenance" },
    { id: "p3", reference: "PRT-2024-003", type: "Rapide", clientId: "c2", emplacement: "Chambre froide", dateInstallation: "2023-06-20", statut: "operationnelle" },
    { id: "p4", reference: "PRT-2024-004", type: "Sectionnelle", clientId: "c3", emplacement: "Atelier nord", dateInstallation: "2020-09-10", statut: "hors_service" },
  ],
  diagnostics: [
    { id: "d1", porteId: "p1", date: "2026-06-12", technicien: "Antoine Roux", observations: "Ressorts de compensation en bon état. Rails légèrement encrassés.", recommandations: "Nettoyage des rails et lubrification.", etatGeneral: "bon", attachments: [] },
    { id: "d2", porteId: "p4", date: "2026-06-28", technicien: "Camille Petit", observations: "Moteur défaillant, câble sectionné.", recommandations: "Remplacement moteur + câble complet.", etatGeneral: "mauvais", attachments: [] },
  ],
  incidents: [
    { id: "i1", porteId: "p2", date: "2026-07-05", description: "La porte ne se ferme plus complètement.", priorite: "haute", statut: "en_cours", signalePar: "M. Dupont" },
    { id: "i2", porteId: "p4", date: "2026-06-27", description: "Porte totalement bloquée en position fermée.", priorite: "critique", statut: "en_cours", signalePar: "J. Bernard" },
    { id: "i3", porteId: "p3", date: "2026-05-14", description: "Bruit inhabituel à l'ouverture.", priorite: "basse", statut: "termine", signalePar: "S. Martin" },
  ],
  reparations: [
    { id: "r1", porteId: "p3", incidentId: "i3", date: "2026-05-18", technicien: "Antoine Roux", description: "Remplacement des galets de guidage.", piecesUtilisees: "4x galets nylon", cout: 320, statut: "termine", attachments: [] },
    { id: "r2", porteId: "p4", incidentId: "i2", date: "2026-07-10", technicien: "Camille Petit", description: "Remplacement du moteur et du câble.", piecesUtilisees: "Moteur 400V, câble 8mm", cout: 1450, statut: "planifie", attachments: [] },
  ],
});

function load() {
  if (typeof window === "undefined") return seed();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      const s = seed();
      window.localStorage.setItem(KEY, JSON.stringify(s));
      return s;
    }
    return JSON.parse(raw);
  } catch {
    return seed();
  }
}

function save(d) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(d));
  window.dispatchEvent(new CustomEvent("db-updated"));
}

function makeCollection(name) {
  return {
    list: () => load()[name],
    get: (id) => load()[name].find((x) => x.id === id),
    upsert(item) {
      const d = load();
      const idx = d[name].findIndex((x) => x.id === item.id);
      if (idx >= 0) d[name][idx] = item;
      else d[name].push(item);
      save(d);
    },
    remove(id) {
      const d = load();
      d[name] = d[name].filter((x) => x.id !== id);
      save(d);
    },
  };
}

export const db = {
  all: () => load(),
  clients: makeCollection("clients"),
  portes: makeCollection("portes"),
  diagnostics: makeCollection("diagnostics"),
  incidents: makeCollection("incidents"),
  reparations: makeCollection("reparations"),
};

export function newId(prefix) {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export const labels = {
  statutIncident: { en_cours: "En cours", termine: "Terminé", planifie: "Planifié", annule: "Annulé" },
  priorite: { basse: "Basse", moyenne: "Moyenne", haute: "Haute", critique: "Critique" },
  statutPorte: { operationnelle: "Opérationnelle", hors_service: "Hors service", maintenance: "En maintenance" },
  etat: { bon: "Bon", moyen: "Moyen", mauvais: "Mauvais" },
};