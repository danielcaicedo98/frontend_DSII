import React from "react";


const Loader = () => {
  return (
    <div class="d-flex justify-content-center rounded-circle">
      <div className="card p-3 bg-light rounded-circle">
        <div class="spinner-border ml-4" role="status">
          <span class=""></span>
        </div>
        <div className="">Cargando...</div>
      </div>
    </div>
  );
};

export default Loader;
