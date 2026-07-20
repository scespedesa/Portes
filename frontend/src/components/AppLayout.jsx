import {
    Menu,
    LogOut
} from "lucide-react";

import {
    Outlet,
    useNavigate
} from "react-router-dom";

import {useState} from "react";

import Sidebar from "../components/Sidebar";
import Button from "./Button";


function AppLayout({ children }){


const [collapsed,setCollapsed]=useState(false);


const navigate=useNavigate();



function logout(){

localStorage.removeItem("token");

navigate("/");

}



return (

<div className="
flex
min-h-screen
bg-gray-100
">


<Sidebar
collapsed={collapsed}
/>



<div className="
flex-1
flex
flex-col
">


<header className="
h-16
bg-white
border-b
flex
items-center
justify-between
px-5
">


<div className="
flex
items-center
gap-4
">


<button

onClick={()=>
setCollapsed(!collapsed)
}

className="
p-2
rounded-lg
hover:bg-gray-100
"

>

<Menu size={22}/>


</button>



<h1 className="
font-semibold
text-lg
">

Plateforme maintenance

</h1>


</div>





<button

onClick={logout}

className="
flex
items-center
gap-2
border
rounded-lg
px-3
py-2
hover:bg-gray-100
"

>

<LogOut size={16}/>

Déconnexion



</button>


</header>




<main className="
flex-1
p-6
overflow-auto
">
    


<Outlet/>

{children}
</main>


</div>



</div>

)


}


export default AppLayout;