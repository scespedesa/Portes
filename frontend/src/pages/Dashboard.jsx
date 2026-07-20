import {
  AlertTriangle,
  DoorClosed,
  Wrench,
  Building2,
  Activity
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell
} from "recharts";


// Datos temporales (después vendrán del backend)
const portes = [
  {
    id: 1,
    reference: "P-001",
    type: "Sectionnelle",
    batiment: "A",
    status: "OK"
  },
  {
    id: 2,
    reference: "P-002",
    type: "Rapide",
    batiment: "A",
    status: "HS"
  },
  {
    id: 3,
    reference: "P-003",
    type: "Sectionnelle",
    batiment: "B",
    status: "OK"
  },
  {
    id: 4,
    reference: "P-004",
    type: "Automatique",
    batiment: "C",
    status: "OK"
  }
];


const incidents = [
  {
    id:1,
    porte:"P-002",
    description:"La porte ne ferme pas",
    statut:"en_cours",
    priorite:"critique"
  },
  {
    id:2,
    porte:"P-003",
    description:"Détection intermittente",
    statut:"termine",
    priorite:"basse"
  }
];


const interventions = [
  {
    id:1,
    cout:350
  },
  {
    id:2,
    cout:800
  }
];



function Card({title,value,subtitle,Icon}){

return (

<div className="
bg-white 
rounded-xl 
border 
shadow-sm 
p-5 
flex 
justify-between 
items-center
">


<div>

<p className="text-sm text-gray-500">
{title}
</p>


<h2 className="
text-3xl 
font-bold 
mt-2
">
{value}
</h2>


<p className="
text-xs 
text-gray-400 
mt-1
">
{subtitle}
</p>

</div>



<div className="
bg-blue-100
text-blue-600
p-3
rounded-lg
">

<Icon size={25}/>

</div>


</div>

)

}




export default function Dashboard(){


const totalPortes = portes.length;


const portesHS =
portes.filter(
p=>p.status==="HS"
).length;



const incidentsOuverts =
incidents.filter(
i=>i.statut==="en_cours"
).length;



const cout =
interventions.reduce(
(acc,i)=>acc+i.cout,
0
);



const types = Object.entries(
portes.reduce(
(acc,p)=>{

acc[p.type] =
(acc[p.type] || 0)+1;

return acc;

},{})
)
.map(
([name,value])=>({
name,
value
})
);



const etatsIncidents = [
{
name:"En cours",
value: incidents.filter(
i=>i.statut==="en_cours"
).length
},
{
name:"Terminés",
value: incidents.filter(
i=>i.statut==="termine"
).length
}
];



const COLORS=[
"#2563eb",
"#16a34a"
];



return (

<div className="
min-h-screen
bg-gray-50
p-6
space-y-6
">


<div>

<h1 className="
text-3xl
font-bold
">
Tableau de bord
</h1>


<p className="text-gray-500">
Supervision des portes industrielles
</p>

</div>





<div className="
grid
md:grid-cols-4
gap-5
">


<Card
title="Portes"
value={totalPortes}
subtitle="Installées"
Icon={DoorClosed}
/>


<Card
title="Incidents ouverts"
value={incidentsOuverts}
subtitle="À traiter"
Icon={AlertTriangle}
/>


<Card
title="Portes HS"
value={portesHS}
subtitle="Intervention nécessaire"
Icon={Wrench}
/>


<Card
title="Coût interventions"
value={`${cout} €`}
subtitle="Cette année"
Icon={Activity}
/>


</div>







<div className="
grid
lg:grid-cols-2
gap-6
">


<div className="
bg-white
border
rounded-xl
shadow-sm
p-5
">


<h2 className="
font-semibold
mb-4
">
Portes par type
</h2>


<div className="h-72">

<ResponsiveContainer>

<BarChart data={types}>


<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Bar
dataKey="value"
fill="#2563eb"
radius={[6,6,0,0]}
/>


</BarChart>


</ResponsiveContainer>


</div>


</div>







<div className="
bg-white
border
rounded-xl
shadow-sm
p-5
">


<h2 className="font-semibold mb-4">
Etat des incidents
</h2>


<div className="h-72">

<ResponsiveContainer>


<PieChart>


<Pie
data={etatsIncidents}
dataKey="value"
nameKey="name"
outerRadius={90}
>


{
etatsIncidents.map(
(_,index)=>(

<Cell
key={index}
fill={COLORS[index]}
/>

))
}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>


</div>


</div>






<div className="
bg-white
border
rounded-xl
shadow-sm
p-5
">


<h2 className="font-semibold mb-4">
Derniers incidents
</h2>


<div className="space-y-3">


{
incidents.map(i=>(

<div
key={i.id}
className="
border-b
pb-3
"
>

<p className="font-medium">
{i.porte}
</p>


<p className="text-sm text-gray-500">
{i.description}
</p>


<span className="
text-xs
text-blue-600
">
{i.statut}
</span>


</div>


))
}


</div>


</div>



</div>


)

}