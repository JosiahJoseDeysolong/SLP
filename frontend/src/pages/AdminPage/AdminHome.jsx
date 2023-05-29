import React from 'react';
import { BASE_URL } from '../../apiConfig';

const AdminHome = () => {
  return (
    <div className="admin-home-container" style={{ width: '500px', margin: '0 auto' }}>
      <article className="admin-home-article">
        <h1>Admin Home Page</h1>
        <p>
          Welcome to the Admin Home Page of our web application. 
          As an admin, you have access to various features and functionalities to manage and oversee the system.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed ac metus aliquam, vehicula lorem ut, bibendum sem.
           Nullam nec justo at enim varius semper at nec lacus. 
           Quisque luctus ante ut felis tincidunt consequat. 
           Ut auctor, neque id interdum consectetur, urna enim ullamcorper urna, 
           at egestas tortor velit vitae nisi. Aliquam sit amet nibh a ligula rhoncus ullamcorper.
            Cras convallis nulla eget nibh eleifend, vel rhoncus lorem laoreet. Phasellus lobortis elit id purus ultricies mattis. 
            Sed in vulputate nisi, eget eleifend elit. Nullam eleifend est ut ultrices tempor.
        </p>
        <p>
          Fusce tempor ante sed facilisis ultrices. Vivamus hendrerit ex in quam cursus, 
          in aliquet dolor semper. Sed semper neque eu ex hendrerit lacinia. Nulla quis ante ut felis tristique maximus. 
          Morbi facilisis est id nisi hendrerit, non eleifend turpis porttitor. Integer sed suscipit nunc, sed faucibus metus. 
          Mauris ut enim risus.
        </p>
        <p>
          In hac habitasse platea dictumst. Proin ullamcorper lectus ut justo cursus volutpat. 
          Sed rutrum quam sed neque maximus congue. Mauris eu orci nulla. Duis feugiat aliquet ipsum, 
          sed dapibus risus fringilla non. Fusce ultrices iaculis erat, id convallis dolor tristique a. 
          Nulla facilisi. Donec maximus imperdiet turpis, eget eleifend nibh luctus ut.
        </p>
      </article>
    </div>
  );
};

export default AdminHome;
