import {
    Factory,
    LayoutDashboard,
    DoorClosed,
    Stethoscope,
    AlertTriangle,
    Wrench
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";


const nav = [

    {
        title:"Accueil",
        path:"/",
        icon:LayoutDashboard
    },

    {
        title:"Tableau de bord",
        path:"/dashboard",
        icon:LayoutDashboard
    },

    {
        title:"Vue de l'usine",
        path:"/usine",
        icon:Factory
    },

    {
        title:"Batiments",
        path:"/batiments",
        icon:Factory
    },

    {
        title:"Portes",
        path:"/portes",
        icon:DoorClosed
    },

    {
        title:"Diagnostics",
        path:"/diagnostics",
        icon:Stethoscope
    },

    {
        title:"Incidents",
        path:"/incidents",
        icon:AlertTriangle
    },

    {
        title:"Interventions",
        path:"/interventions",
        icon:Wrench
    }

];



function Sidebar({collapsed}){


const location = useLocation();



return (

<aside

className={`
bg-white
border-r
transition-all
duration-300
h-screen
${collapsed ? "w-20" : "w-64"}
`}

>


{/* LOGO */}

<div className="
h-16
border-b
flex
items-center
justify-center
gap-3
">


<div className="
h-10
w-10
rounded-lg
bg-blue-600
text-white
flex
items-center
justify-center
">

<Factory size={22}/>

</div>



{
!collapsed &&

<div>

<p className="
font-bold
">

PortesPro

</p>


<p className="
text-xs
text-gray-500
">

Maintenance

</p>


</div>

}


</div>





{/* MENU */}


<nav className="
p-4
space-y-2
">


{
nav.map(item=>{


const Icon=item.icon;


const active =
location.pathname.startsWith(item.path);



return (

<Link

key={item.path}

to={item.path}

className={`
flex
items-center
gap-3
px-3
py-3
rounded-lg
transition

${active
?
"bg-blue-100 text-blue-700"
:
"text-gray-600 hover:bg-gray-100"
}

`}

>


<Icon size={20}/>


{
!collapsed &&

<span>

{item.title}

</span>

}


</Link>


)


})

}


</nav>



</aside>

)

}


export default Sidebar;