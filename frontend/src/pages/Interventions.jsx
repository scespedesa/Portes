import { useState } from "react";
import { Card, CardHeader, CardTitle, CardBody, Table, Td } from "../components/LayoutApp.jsx";
import { AddButton, RowActions, Badge, Field, inputClass } from "../components/RowActions.jsx";
import Modal from "../components/Modal.jsx";
import { AttachmentPicker, AttachmentBadges } from "../components/Attachments.jsx";


const empty = () => ({
  id: Date.now(),
  porteId: "",
  incidentId: "",
  date_debut: new Date().toISOString().slice(0, 10),
  technicien: "",
  description: "",
  pieces_changees: "",
  cout: 0,
  statut: "planifie",
  attachments: [],
  capex_opex:"",
  date_fin: new Date().toISOString().slice(0, 10),
  diagnostics_id: [],
  resultat:"",
});


const statutLabels = {
  planifie: "Planifiée",
  en_cours: "En cours",
  termine: "Terminée",
  annule: "Annulée",
};


const statutTone = (s) =>
  s === "termine"
    ? "green"
    : s === "en_cours"
    ? "blue"
    : s === "annule"
    ? "slate"
    : "amber";


export default function Interventions() {


  // Données temporaires frontend
  const [portes] = useState([
    {
      id: 1,
      reference: "Porte-A01",
      emplacement: "Entrée principale",
    },
    {
      id: 2,
      reference: "Porte-B02",
      emplacement: "Atelier",
    },
  ]);


  const [incidents] = useState([
    {
      id: 1,
      porteId: 1,
      date_debut: "2026-07-10",
      description: "La porte ne ferme plus automatiquement",
    },
  ]);

    const [diagnostics] = useState([
    {
      id: 1,
      porteId: 1,
      date_debut: "2026-07-10",
      description: "La porte ne ferme plus automatiquement",
    },
  ]);


  const [Interventions, setInterventions] = useState([
    {
      id: 1,
      porteId: 1,
      incidentId: 1,
      date_debut: "2026-07-12",
      technicien: "Jean Dupont",
      description: "Remplacement du capteur",
      pieces_changees: "Capteur infrarouge",
      cout: 120,
      statut: "termine",
      attachments: [],
      capex_opex:"capex",
      date_fin: "2026-07-20",
      diagnostics_id: [1,2],
      resultat:"Remplacement capteur , passage securisé",
    },
  ]);


  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty());
  const [editing, setEditing] = useState(false);



  const start = (r) => {
    setEditing(Boolean(r));

    setForm(
      r
        ? {
            ...r,
            incidentId: r.incidentId ?? "",
          }
        : empty()
    );

    setOpen(true);
  };



  const submit = () => {

    if (!form.porteId || !form.technicien) {
      alert("Porte et technicien requis");
      return;
    }


    if (editing) {

      setInterventions((prev) =>
        prev.map((r) =>
          r.id === form.id
            ? {
                ...form,
                cout: Number(form.cout) || 0,
              }
            : r
        )
      );

    } else {

      setInterventions((prev)=>[
        ...prev,
        {
          ...form,
          id: Date.now(),
          cout:Number(form.cout)||0
        }
      ]);

    }


    setOpen(false);
  };



  const remove = (id)=>{

    setInterventions((prev)=>
      prev.filter((r)=>r.id!==id)
    );

  };



  const total = Interventions.reduce(
    (sum,r)=>sum+r.cout,
    0
  );



  const head = [
    { label:"Date debut"},
    { label:"Porte"},
    { label:"Technicien"},
    { label:"Description"},
    { label:"Pièces"},
    { label:"Coût", align:"right"},
    { label:"Statut"},
    { label:"Fichiers"},
    { label:"Capex_Opex"},
    { label:"Date fin"},
    { label:"resultat"},
    { label:"Actions", align:"right"},
  ];



  return (

    <>

      <Card>

        <CardHeader>

          <div>
            <CardTitle subtitle={`Total : ${total.toLocaleString("fr-FR")} €`}>
              Réparations ({Interventions.length})
            </CardTitle>
          </div>


          <AddButton
            onClick={()=>start()}
            label="Nouvelle réparation"
          />


        </CardHeader>



        <CardBody className="p-0">


          <Table
            head={head}
            empty={
              Interventions.length===0
              ?"Aucune réparation."
              :null
            }
            colSpan={9}
          >


          {
            [...Interventions]
            .sort(
              (a,b)=>b.date_debut.localeCompare(a.date_debut)
            )
            .map((r)=>(


              <tr key={r.id}>


                <Td>
                  {
                    new Date(r.date_debut)
                    .toLocaleDateString("fr-FR")
                  }
                </Td>



                <Td className="font-medium text-slate-900">

                  {
                    portes.find(
                      p=>p.id===r.porteId
                    )?.reference ?? "—"
                  }

                </Td>



                <Td>
                  {r.technicien}
                </Td>



                <Td className="max-w-xs truncate">
                  {r.description}
                </Td>



                <Td className="text-sm text-slate-500">
                  {r.pieces_changees}
                </Td>

                <Td align="right" className="font-medium">
                  {r.cout.toLocaleString("fr-FR")} €
                </Td>

                <Td>

                  <Badge tone={statutTone(r.statut)}>
                    {statutLabels[r.statut]}
                  </Badge>

                </Td>
                <Td>
                  <AttachmentBadges items={r.attachments}/>
                </Td>
                <Td className="max-w-xs truncate">
                  {r.capex_opex}
                </Td>

                <Td>
                  {
                    new Date(r.date_fin)
                    .toLocaleDateString("fr-FR")
                  }
                </Td>

                <Td className="max-w-xs truncate">
                  {r.resultat}
                </Td>

                <Td align="right">

                  <RowActions
                    onEdit={()=>start(r)}
                    onDelete={()=>remove(r.id)}
                  />

                </Td>


              </tr>


            ))
          }



          </Table>


        </CardBody>


      </Card>





      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        onSubmit={submit}
        title={
          editing
          ?"Modifier la réparation"
          :"Nouvelle réparation"
        }
      >



      <div className="grid grid-cols-2 gap-3">



        <div className="col-span-2">

          <Field label="Porte">

            <select
              className={inputClass}
              value={form.porteId}
              onChange={
                e=>setForm({
                  ...form,
                  porteId:Number(e.target.value)
                })
              }
            >

              <option value="">
                Sélectionner une porte
              </option>


              {
                portes.map(p=>(

                  <option
                    key={p.id}
                    value={p.id}
                  >
                    {p.reference} — {p.emplacement}
                  </option>

                ))
              }


            </select>


          </Field>

        </div>




        <Field label="Date debut">

          <input
            type="date"
            className={inputClass}
            value={form.date_debut}
            onChange={
              e=>setForm({
                ...form,
                date_debut:e.target.value
              })
            }
          />

        </Field>





        <Field label="Technicien">

          <input
            className={inputClass}
            value={form.technicien}
            onChange={
              e=>setForm({
                ...form,
                technicien:e.target.value
              })
            }
          />

        </Field>

        <Field label="Capex_Opex">

          <input
            className={inputClass}
            value={form.capex_opex}
            onChange={
              e=>setForm({
                ...form,
                capex_opex:e.target.value
              })
            }
          />

        </Field>

        <Field label="Resultat">

          <input
            className={inputClass}
            value={form.resultat}
            onChange={
              e=>setForm({
                ...form,
                resultat:e.target.value
              })
            }
          />

        </Field>




        <Field label="Coût (€)">

          <input
            type="number"
            className={inputClass}
            value={form.cout}
            onChange={
              e=>setForm({
                ...form,
                cout:Number(e.target.value)
              })
            }
          />

        </Field>





        <Field label="Statut">

          <select
            className={inputClass}
            value={form.statut}
            onChange={
              e=>setForm({
                ...form,
                statut:e.target.value
              })
            }
          >

            {
              Object.entries(statutLabels)
              .map(([k,v])=>(

                <option key={k} value={k}>
                  {v}
                </option>

              ))
            }

          </select>

        </Field>


        <Field label="Date fin">

          <input
            type="date"
            className={inputClass}
            value={form.date_fin}
            onChange={
              e=>setForm({
                ...form,
                date_fin:e.target.value
              })
            }
          />

        </Field>


        <div className="col-span-2">

          <Field label="Description">

            <textarea
              rows={2}
              className={inputClass}
              value={form.description}
              onChange={
                e=>setForm({
                  ...form,
                  description:e.target.value
                })
              }
            />

          </Field>

        </div>





        <div className="col-span-2">

          <Field label="Pièces utilisées">

            <input
              className={inputClass}
              value={form.pieces_changees}
              onChange={
                e=>setForm({
                  ...form,
                  pieces_changees:e.target.value
                })
              }
            />

          </Field>

        </div>




        <div className="col-span-2">

          <AttachmentPicker
            value={form.attachments}
            onChange={
              next=>setForm({
                ...form,
                attachments:next
              })
            }
          />

        </div>



      </div>



      </Modal>



    </>

  );
}