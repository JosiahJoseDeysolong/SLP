import React from 'react';
import { BASE_URL } from '../../apiConfig'
import RegistrarSearchBox from './components/RegistrarSearchBox';

const AdminRegistrar = () => {

  return (
    <div>
      <h1>Admin Registrar Page</h1>
      <hr />

      <RegistrarSearchBox />

    </div>
  );
};

export default AdminRegistrar;
