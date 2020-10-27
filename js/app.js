function getUserApi(){
    const getUser = new XMLHttpRequest();
    const url='https://api.randomuser.me/?results=3';

    getUser.open('GET', url, false);
    getUser.send();

    const response = JSON.parse(getUser.responseText);
    return response;
}

function renderUsers(){
    const users = getUserApi().results;
    const container = document.querySelector('#user-card-container');
    var usersHTML = ``;

    users.forEach(function(user){

        usersHTML +=`
    
        <div class="users" user-id="${ user.login.uuid }">
        <button type="button" onClick="renderUsersDetails(this)">
            <img src="${user.picture.medium}" alt="user" />
        </button>    
            <span>${ user.name.title } ${ user.name.first } ${ user.name.last }</span>
            <div class="rodape">
              <div class="curtidas">
                <img src="./img/curtidas.png" alt="" />
              </div>
              <div class="twiter">
                <img src="./img/twiter.png" alt="" />
              </div>
              <div class="reacoes">
                <img src="./img/reacoes.png" alt="" />
              </div>
            </div>
          </div>
        
        `;
    });

    localStorage.setItem('user', JSON.stringify(users));
    container.innerHTML = usersHTML;
}

function renderUsersDetails(element){
  const userJSON = JSON.parse(localStorage.getItem('user'));
  const userId = element.parentElement.getAttribute('user-id');
  const container = document.querySelector('.containerUserInfo');

  const user = userJSON.find(function(user){
    return user.login.uuid === userId;

  });

  container.innerHTML= `
  
  
  <div class="users"><img src="${ user.picture.large }" alt=""></div>
  <div class="table table-striped">
      <table>
        <tr>
              <th>Name</th>
              <td>${ user.name.title } ${ user.name.first } ${ user.name.last }</td>
        </tr>   
        <tr> 
              <th>email</th>
              <td>${ user.email }</td>
        </tr>   
        <tr>   
              <th>Cell</th>
              <td>${ user.cell }</td>
        </tr>
        <tr>
              <th>Endereco</th>
              <td>${ user.location.city }</td>
        </tr>
        <tr>
              <th>Gender</th>
              <td>${ user.gender.slice(0, 1).toUpperCase() }</td>
        </tr>
         
      </table>
  </div>
  
  
  
  `;

}

renderUsers();