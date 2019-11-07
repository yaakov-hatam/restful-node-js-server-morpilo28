const phonesEndpoint = '/phone';

listView();

function listView() {
    fetch(phonesEndpoint).then(phoneData => {
        phoneData.json().then(onPhoneList);
    })
}

function onPhoneList(phones) {
    let html = ` 
    <form novalidate method="post" action="/phone">
        <input name="age" placeholder="AGE" />
        <input name="carrier" placeholder="CARRIER" />
        <input name="id" placeholder="ID" />
        <input name="imageUrl" placeholder="IMAGE Url" />
        <input name="name" placeholder="NAME" />
        <input name="snippet" placeholder="SNIPPET" />
        <button id="add" name="add">Add Phone</button>
    </form>
    <br>
    <br>
    <table>
        <thead>
            <tr>
                <th>NAME</th>
                <th>IMAGE</th>
            </tr>
        </thead>
        <tbody>`;
    for (let i = 0; i < phones.length; i++) {
        html += `
                <tr>
                    <td>${phones[i].name}</td>
                    <td><img width='50' src="http://angular.github.io/angular-phonecat/step-14/app/${phones[i].imageUrl}"/></td>
                    <td>
                        <button id='delete${phones[i].age}'>Delete</button>
                        <button id='update${phones[i].age}'>Update</button>
                        <button id='details${phones[i].age}'>Show More Details</button>
                    </td>   
                </tr>`
    }
    html += `
            </tbody>
        </table>`

    document.getElementById('main').innerHTML = html;

    eventListenersOnButtons(phones);
}

function eventListenersOnButtons(phones) {
    //on add
    document.getElementById('add').addEventListener('click', function (e) {
        e.preventDefault();
        const phone = {
            age: this.form.age.value,
            carrier: this.form.carrier.value,
            id: this.form.id.value,
            imageUrl: this.form.imageUrl.value,
            name: this.form.name.value,
            snippet: this.form.snippet.value,
        };
    
        fetch(phonesEndpoint, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }, // this line is important, if this content-type is not set it wont work
            body: JSON.stringify(phone)
        }).then(responseData => {
    
            this.form.age.value = '';
            this.form.carrier.value = '';
            this.form.id.value = '';
            this.form.imageUrl.value = '';
            this.form.name.value = '';
            this.form.snippet.value = '';
    
            listView();
        }).catch(err => {
            alert('not inserted')
        });
    })

    for (let i = 0; i < phones.length; i++) {
        const singlePhoneEndpoint = `/phone/${phones[i].age}`;
        
        //on details
        document.getElementById(`details${phones[i].age}`).addEventListener('click', function (e) {
            e.preventDefault();
            fetch(singlePhoneEndpoint).then(phoneData => {
                phoneData.json().then(onDetails);
            });
        });
        const phoneAge = phones[i].age;
        
        //on delete
        document.getElementById(`delete${phoneAge}`).addEventListener('click', function (e) {
            e.preventDefault();
            let phoneAge = {age: this.id.slice(6)};
            fetch(phonesEndpoint, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }, // this line is important, if this content-type is not set it wont work
                body: JSON.stringify(phoneAge)
            }).then(responseData => {
                listView();
            }).catch(err => {
                alert('not inserted')
            });
        });

        //on update
        document.getElementById(`update${phoneAge}`).addEventListener('click', function (e) {
            e.preventDefault();
            let phoneAge = {age: this.id.slice(6)};
            fetch(phonesEndpoint, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' }, // this line is important, if this content-type is not set it wont work
                body: JSON.stringify(phoneAge)
            }).then(responseData => {
                responseData.json().then(onUpdate);
            }).catch(err => {
                console.log('err' + err);
                alert('not inserted')
            });
        });
    }
}

function onDetails(phone) {
    if (!phone.carrier) {
        phone.carrier = '';
    } else {
        phone.carrier = phone.carrier;
    }
    let html = ''
    html += `
    <div>
        <img width='50' src="http://angular.github.io/angular-phonecat/step-14/app/${phone.imageUrl}"/>
        <br>
        AGE: ${phone.age}
        <br>
        CARRIER: ${phone.carrier}
        <br>
        ID: ${phone.id}
        <br>
        NAME: ${phone.name}
        <br>
        SNIPPET: ${phone.snippet}
        <br>
        <button id='returnToFullList'> Return To Full List </button>
    </div>`
    document.getElementById('main').innerHTML = html;
    document.getElementById('returnToFullList').addEventListener('click', (e) => {
        e.preventDefault();
        listView();
    })
}

function onUpdate(phone){
    let html = ''
    html += `
    <form>
        <input name='age' placeholder='${phone[0].age}'>
        <br>
        <input name='carrier' placeholder='${phone[0].carrier}'>
        <br>
        <input name='id' placeholder='${phone[0].id}'>
        <br>
        <input name='name' placeholder='${phone[0].name}'>
        <br>
        <input name='snippet' placeholder='${phone[0].snippet}'>
        <br>
        <button id='saveChanges'> Save Changes </button>
        <button id='returnToFullList'> Return To Full List </button>
    </form>`
    document.getElementById('main').innerHTML = html;
    document.getElementById('returnToFullList').addEventListener('click', (e) => {
        e.preventDefault();
        listView();
    })
    document.getElementById('saveChanges').addEventListener('click', (e) => {
        e.preventDefault();
      /*   console.log(this.form.age.value);
        debugger;
        const phone = {
            age: this.form.age.value,
            carrier: this.form.carrier.value,
            id: this.form.id.value,
            imageUrl: this.form.imageUrl.value,
            name: this.form.name.value,
            snippet: this.form.snippet.value,
        };
        debugger;
        fetch(phonesEndpoint, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }, // this line is important, if this content-type is not set it wont work
            body: JSON.stringify(phone)
        }).then(responseData => {
            listView();
        }).catch(err => {
            alert('not inserted')
        }); */
    })
}