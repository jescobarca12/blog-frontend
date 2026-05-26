function Perfil(){
    const nombre = 'jorge';
    const edad = 23;
    const ciudad = 'Medellin';
    const profesion = 'Estudiante';
return(
    <>
        <h1>====Mi Perfil===</h1>
        <p>Nombre:{nombre}</p>
        <p>Edad:{edad}</p>
        <p>Ciudad:{ciudad}</p>
        <p>Profesión:{profesion}</p>
        <hr />
    </>
);
}
export default Perfil;