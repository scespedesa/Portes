import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Td,
} from "../components/LayoutApp.jsx";

import {
  AddButton,
  RowActions,
  Badge,
  Field,
  inputClass,
} from "../components/RowActions.jsx";

import Modal from "../components/Modal.jsx";

import {
  AttachmentPicker,
  AttachmentBadges,
} from "../components/Attachments.jsx";


const empty = () => ({
  id: Date.now(),
  porteId: "",
  date: new Date().toISOString().slice(0, 10),
  technicien: "",
  observations: "",
  recommandations: "",
  etatGeneral: "bon",
  attachments: [],
});


const labels = {
  etat: {
    bon: "Bon",
    moyen: "Moyen",
    mauvais: "Mauvais",
  },
};


const etatTone = (e) => {
  if (e === "bon") return "green";
  if (e === "moyen") return "amber";
  return "red";
};


export default function Diagnostics() {

  // Datos temporales (serán reemplazados por FastAPI)
  const [portes] = useState([
    {
      id: 1,
      reference: "P-001",
      emplacement: "Atelier A",
    },
    {
      id: 2,
      reference: "P-002",
      emplacement: "Atelier B",
    },
  ]);


  const [diagnostics, setDiagnostics] = useState([
    {
      id: 1,
      porteId: 1,
      date: "2026-07-20",
      technicien: "Jean Martin",
      observations: "Fonctionnement normal",
      recommandations: "Aucune",
      etatGeneral: "bon",
      attachments: [],
    },
  ]);


  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty());
  const [editing, setEditing] = useState(false);



  const start = (diagnostic = null) => {

    setEditing(Boolean(diagnostic));

    setForm(
      diagnostic
        ? { ...diagnostic }
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

      setDiagnostics(
        diagnostics.map((d) =>
          d.id === form.id
            ? form
            : d
        )
      );

    } else {

      setDiagnostics([
        ...diagnostics,
        {
          ...form,
          id: Date.now(),
        },
      ]);

    }


    setOpen(false);
    setForm(empty());

  };



  const remove = (id) => {

    setDiagnostics(
      diagnostics.filter(
        (d) => d.id !== id
      )
    );

  };



  const head = [
    { label: "Date" },
    { label: "Porte" },
    { label: "Technicien" },
    { label: "État" },
    { label: "Observations" },
    { label: "Fichiers" },
    {
      label: "Actions",
      align: "right",
    },
  ];



  return (

    <div className="p-6">

      <Card>

        <CardHeader>

          <CardTitle>
            Diagnostics ({diagnostics.length})
          </CardTitle>


          <AddButton
            onClick={() => start()}
            label="Nouveau diagnostic"
          />

        </CardHeader>



        <CardBody className="p-0">


          <Table
            head={head}
            empty={
              diagnostics.length === 0
                ? "Aucun diagnostic enregistré."
                : null
            }
            colSpan={7}
          >


            {[
              ...diagnostics,
            ]
              .sort(
                (a,b) =>
                  b.date.localeCompare(a.date)
              )
              .map((d)=>(


              <tr key={d.id}>


                <Td>
                  {
                    new Date(d.date)
                      .toLocaleDateString("fr-FR")
                  }
                </Td>


                <Td className="font-medium text-slate-900">

                  {
                    portes.find(
                      (p)=>p.id === d.porteId
                    )?.reference ?? "—"
                  }

                </Td>


                <Td>
                  {d.technicien}
                </Td>



                <Td>

                  <Badge
                    tone={
                      etatTone(
                        d.etatGeneral
                      )
                    }
                  >

                    {
                      labels.etat[
                        d.etatGeneral
                      ]
                    }

                  </Badge>

                </Td>



                <Td className="max-w-md truncate text-slate-500">

                  {d.observations}

                </Td>



                <Td>

                  <AttachmentBadges
                    items={
                      d.attachments
                    }
                  />

                </Td>



                <Td align="right">

                  <RowActions

                    onEdit={() =>
                      start(d)
                    }

                    onDelete={() =>
                      remove(d.id)
                    }

                  />

                </Td>



              </tr>


            ))}


          </Table>


        </CardBody>


      </Card>





      <Modal

        open={open}

        onClose={() =>
          setOpen(false)
        }

        onSubmit={submit}

        title={
          editing
            ? "Modifier le diagnostic"
            : "Nouveau diagnostic"
        }

      >


        <div className="grid grid-cols-2 gap-3">



          <div className="col-span-2">


            <Field label="Porte">


              <select

                className={inputClass}

                value={form.porteId}

                onChange={(e)=>
                  setForm({
                    ...form,
                    porteId:
                      Number(e.target.value),
                  })
                }

              >


                <option value="">
                  Sélectionner une porte
                </option>


                {
                  portes.map((p)=>(

                    <option
                      key={p.id}
                      value={p.id}
                    >

                      {p.reference}
                      {" — "}
                      {p.emplacement}

                    </option>

                  ))
                }


              </select>


            </Field>


          </div>




          <Field label="Date">


            <input

              type="date"

              className={inputClass}

              value={form.date}

              onChange={(e)=>
                setForm({
                  ...form,
                  date:e.target.value,
                })
              }

            />


          </Field>





          <Field label="Technicien">


            <input

              className={inputClass}

              value={form.technicien}

              onChange={(e)=>
                setForm({
                  ...form,
                  technicien:
                    e.target.value,
                })
              }

            />


          </Field>






          <div className="col-span-2">


            <Field label="État général">


              <select

                className={inputClass}

                value={form.etatGeneral}

                onChange={(e)=>
                  setForm({
                    ...form,
                    etatGeneral:
                      e.target.value,
                  })
                }

              >

                <option value="bon">
                  Bon
                </option>

                <option value="moyen">
                  Moyen
                </option>

                <option value="mauvais">
                  Mauvais
                </option>


              </select>


            </Field>


          </div>





          <div className="col-span-2">


            <Field label="Observations">


              <textarea

                className={inputClass}

                rows={3}

                value={form.observations}

                onChange={(e)=>
                  setForm({
                    ...form,
                    observations:
                      e.target.value,
                  })
                }

              />


            </Field>


          </div>





          <div className="col-span-2">


            <Field label="Recommandations">


              <textarea

                className={inputClass}

                rows={2}

                value={
                  form.recommandations
                }

                onChange={(e)=>
                  setForm({
                    ...form,
                    recommandations:
                      e.target.value,
                  })
                }

              />


            </Field>


          </div>





          <div className="col-span-2">


            <AttachmentPicker

              value={
                form.attachments ?? []
              }

              onChange={(next)=>
                setForm({
                  ...form,
                  attachments:
                    next,
                })
              }

            />


          </div>




        </div>


      </Modal>



    </div>

  );

}