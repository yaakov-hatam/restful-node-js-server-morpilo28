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
        const thisAddForm = this;
        onAdd(thisAddForm);
    })

    for (let i = 0; i < phones.length; i++) {
        const phoneAge = phones[i].age;
        const singlePhoneEndpoint = `/phone/${phones[i].age}`;

        //on details
        document.getElementById(`details${phones[i].age}`).addEventListener('click', function (e) {
            e.preventDefault();
            fetch(singlePhoneEndpoint).then(phoneData => {
                phoneData.json().then(onDetails);
            });
        });

        //on delete
        document.getElementById(`delete${phoneAge}`).addEventListener('click', function (e) {
            e.preventDefault();
            let phoneAge = { age: this.id.slice(6) };
            onDelete(phoneAge, phonesEndpoint);
        });

        //on update
        document.getElementById(`update${phoneAge}`).addEventListener('click', function (e) {
            e.preventDefault();
            fetch(singlePhoneEndpoint).then(phoneData => {
                phoneData.json().then(onUpdate);
            });
        });
    }
}

function onAdd(thisAddForm) {
    const phone = {
        age: thisAddForm.form.age.value,
        carrier: thisAddForm.form.carrier.value,
        id: thisAddForm.form.id.value,
        imageUrl: thisAddForm.form.imageUrl.value,
        name: thisAddForm.form.name.value,
        snippet: thisAddForm.form.snippet.value,
    };
    fetch(phonesEndpoint, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(phone)
    }).then(responseData => {
        thisAddForm.form.age.value = '';
        thisAddForm.form.carrier.value = '';
        thisAddForm.form.id.value = '';
        thisAddForm.form.imageUrl.value = '';
        thisAddForm.form.name.value = '';
        thisAddForm.form.snippet.value = '';
        listView();
    }).catch(err => {
        alert('not inserted');
    });
}

function onDelete(phoneAge) {
    fetch(phonesEndpoint, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(phoneAge)
    }).then(responseData => {
        listView();
    }).catch(err => {
        alert('not inserted');
    });
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

function onUpdate(phone) {
    let html = ''
    html += `
            <input id='age' hidden value='${phone.age}'/>
            <br>
            <label>CARRIER: <input id='carrier' placeholder='${phone.carrier}' value='${phone.carrier}'/></label>
            <br>
            <label>ID: <input id='id' placeholder='${phone.id}' value='${phone.id}'/></label>
            <br>
            <label>iMAGE URL: <input id='imageUrl' placeholder='${phone.imageUrl}' value='${phone.imageUrl}'/></label>
            <br>
            <label>NAME: <input id='name' placeholder='${phone.name}' value='${phone.name}'/></label>
            <br>
            <label>SNIPPET: <input id='snippet' placeholder='${phone.snippet}' value='${phone.snippet}'/></label>
            <br>
            <button id='saveChanges'> Save Changes </button>
            <button id='returnToFullList'> Return To Full List </button>`

    document.getElementById('main').innerHTML = html;
    document.getElementById('saveChanges').addEventListener('click', (e) => {
        e.preventDefault();
        console.log(this);
        const phone = {
            age: document.getElementById("age").value,
            carrier: document.getElementById("carrier").value,
            id: document.getElementById("id").value,
            imageUrl: document.getElementById("imageUrl").value,
            name: document.getElementById("name").value,
            snippet: document.getElementById("snippet").value
        };
        console.log(phone);

        fetch(phonesEndpoint, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' }, // this line is important, if this content-type is not set it wont work
            body: JSON.stringify(phone)
        }).then(responseData => {
            listView();
        }).catch(err => {
            alert('not inserted')
        });
    })
    document.getElementById('returnToFullList').addEventListener('click', (e) => {
        e.preventDefault();
        listView();
    })
}