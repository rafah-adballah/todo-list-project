import React from 'react'

function Navbar({taskes,inputFilter,setInputFilter}) {

    const handleSearch=(e)=>{
        const filter=taskes.filter(task=>task.des.includes(e.target.value))
        setInputFilter(filter);
    }
  return (
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand">TODO TASKES </a>
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
    
    </form>
  </div>
</nav>
  )
}

export default Navbar
