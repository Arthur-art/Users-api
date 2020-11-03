var myPromise = function(){
  return new Promise(function(resolve,reject){
    var xhr=new XMLHttpRequest();
    xhr.open('GET','https://api.randomuser.me/?results=3');
    xhr.send(null);
    xhr.onreadystatechange=function(){
      if(xhr.readyState===4){
        if(xhr.status===200){
          resolve(JSON.parse(xhr.responseText));
        }else{
          reject('error');
        }
      }
    }
  });
}
myPromise()
.then(function(response){
  var container = document.querySelector('#user-card-container');
  var html = ``;
  Array.from(response.results).forEach(function(user){
    html+=`
       
    <div class="users"  user-id="${ user.login.uuid }">
   
    <img src="${user.picture.medium}" alt="user" />
    <button  type="button" onClick="renderUsersDetails(this)">Ver Perfil
</button>    
    <span>${user.name.first} ${user.name.last}</span>
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
    container.innerHTML=html;
    localStorage.setItem('storage', JSON.stringify(response.results));
  });
})
.catch(function(error){
  console.warn(error);
});
function renderUsersDetails(element){
  var storageJson = JSON.parse(localStorage.getItem('storage'));
  var userId = element.parentElement.getAttribute('user-id');
  var html=``;
  var container=document.querySelector('.containerUserInfo');
  var user = storageJson.find(function(user){
    return user.login.uuid === userId;
  });
  html=`
  <div class="users"><img src="${user.picture.large}" alt=""></div>
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
                    <td>${ user.gender}</td>
              </tr>
               
            </table>
        </div>

  `;
  container.innerHTML=html;
}