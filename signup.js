
            // SIGNUP DETAILS
            var Form = document.querySelector('#contact_form');
            var body = document.querySelector('body');
            var addBtn = document.querySelector('#BTN');
            var firstName = document.querySelector('#fname');
            var email = document.querySelector('#emailId');
            var submitBtn = document.querySelector('#SUBMIT');
            var password = document.querySelector('#pass');
            var confirmPassword = document.querySelector('#confirm');
            var adminPanel = document.querySelector('.container');
            var photos = document.querySelector('#photos');
            // ADMIN TABLE
            var Tbody = document.querySelector('#tbody')
            // USER DETAILS
            var userImg = document.querySelector('#userImg')
            var userName = document.querySelector('#userName')
            var userEmail = document.querySelector('#userEmail')
            var userPhone = document.querySelector('#userPhone')

            // EDIT DETAILS
            CONFIRM = () => {
              if(password.value !== confirmPassword.value){
                document.querySelector('#msg').style.display = 'block';
                return false
              }
              if(password.value == confirmPassword.value){
                document.querySelector('#msg').style.display = 'none';
              }
            }          
            ADD = () => {
              Form.style.display = "block";
              body.style.backgroundColor = "";
              addBtn.style.display = 'none';
              adminPanel.style.display = 'none';
              document.querySelector('#adminContent').hidden = true              

            } 
            DETAILS = () => {
              document.querySelector('#employee').style.display = 'block';
            }
            HIDE = () => {
              document.querySelector('#employee').style.display = 'none';
            } 
            

        // GET API
            fetch('http://localhost:3000/api/user',{
              method:'GET',
              headers:{'Content-Type':'application/json'},
            })
            .then(res => res.json())
            .then(data => { data.forEach(user_data => {
                console.log(data)
                
                const tr = document.createElement('tr')

                const td = document.createElement('td')

                const td1 = document.createElement('td')
                td1.innerHTML = user_data._id
                

                const td2 = document.createElement('td')
                td2.innerHTML = user_data.firstName +'  '+ user_data.lastName

                const td3 = document.createElement('td')
                td3.innerHTML = user_data.email

                const td4 = document.createElement('td')
                td4.innerHTML = user_data.contact_no
                
                const edit = document.createElement('a')
                edit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>'

                const view = document.createElement('a')
                view.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>'

                const rimove = document.createElement('a')
                rimove.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'

                tr.appendChild(td)
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(view)
                tr.appendChild(edit)
                tr.appendChild(rimove)
                Tbody.appendChild(tr)


                edit.addEventListener('click', (e) => {
                  localStorage.setItem('id',`${user_data._id}`)
                  localStorage.setItem('photo',`${user_data.photos}`)
                  localStorage.setItem('name',`${user_data.firstName +'  '+ user_data.lastName}`)
                  e.preventDefault()
                  window.location.href = 'editUserDetails.html'
                });

                view.addEventListener('click', (e) => {
                  e.preventDefault();
                  
                  addBtn.hidden = true
                  document.querySelector('#adminContent').hidden = true              
                  document.querySelector('#page-content').style.display = 'block'
                  userImg.src = `../server/${user_data.photos}`
                  userName.innerHTML = user_data.firstName +' '+user_data.lastName
                  userEmail.innerHTML = user_data.email
                  userPhone.innerHTML = user_data.contact_no
                });               

                rimove.addEventListener('click', (e) => {
                  e.preventDefault();

         // DELETE API
                  swal(`${user_data._id} deleted successfully`)
                  setTimeout(() => {
                    fetch(`http://localhost:3000/api/delete/${user_data._id}`,{
                    method:'DELETE'
                  })
                  .then(res => res.json())
                  .then(data => console.log(data))
                  window.location.href = 'signup.html'                 
                }, 1000);                 
                });
              })
            })
            

            Form.addEventListener('submit', (e) => {

              e.preventDefault();

              // Sweet Alert
              swal('ID GENERATED SUCCESSFULLY')
              setTimeout(() => {

        // POST API
                fetch('http://localhost:3000/api/signup',{
                mode:'no-cors',
                method : 'POST',
                headers : {
                  'content-Type':'application/json'
                },
                body : new FormData(Form)
              })
              .then(res => res.json())
              .then(data => console.log(data))

              }, 3000)                          
            });
                                                 