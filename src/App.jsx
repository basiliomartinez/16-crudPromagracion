import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import Administrador from "./components/pages/Administrador";
import DetalleServicio from "./components/pages/DetalleServicio";
import FormularioServicio from "./components/pages/FormularioServicio";
import Error404 from "./components/pages/Error404";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import { useEffect, useState } from "react";
import ProtectorRutas from "./components/routes/ProtectorRutas";

function App() {
  const usuarioSessionStorage =



  JSON.parse(sessionStorage.getItem("usuarioKey")) || false
  const [usuarioLogueado, setUsuarioLogueado] =
    useState(usuarioSessionStorage);

const servicioLocalStorage=  JSON.parse(localStorage.getItem('serviciosKey')) || []

const [servicios, setservicios]= useState([])



  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);  

useEffect(()=>{
  localStorage.setItem('servicioKey', JSON.stringify(servicios))
}, [servicios])

 const crearServicio = (nuevoServicio)=>{
// le voy agregar un id
    nuevoServicio.id = crypto.randomUUID() //kdjfgh45-df454-dfjh34
    setServicios([...servicios, nuevoServicio])
  }

  const editarServicio = (idServicio,servicioEditar) =>{
    // buscar el objeto dentro del array que tiene tal id, y actualizar sus valores
    const serviciosEditados = servicios.map((itemServicio)=>{
      //buscar el objeto a editar
       if(itemServicio.id === idServicio){
         return {
          ...itemServicio,
          ...servicioEditar
         }
       }
       return itemServicio 
    })
    setServicios(serviciosEditados)
  }

  const borrarServicio = (idServicio)=>{
    const serviciosFiltrados = servicios.filter((itemServicio)=> itemServicio.id !== idServicio)
    setServicios(serviciosFiltrados)
  }

  return (
    <BrowserRouter>
      <Menu
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
      />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/login"
          element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
        />

        <Route path="/detalle" element={<DetalleServicio />} />

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/administrador"
          element={<ProtectorRutas usuarioLogueado={usuarioLogueado} />}
        >
          <Route index element={<Administrador servicios={servicios} />} />
          <Route path="crear" element={<FormularioServicio />} />
          <Route path="editar" element={<FormularioServicio />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
