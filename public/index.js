const phonesEndpoint = '/phone';

a(phonesEndpoint, onShowPhoneList);

function onShowPhoneList(allPhones) {
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
    for (let i = 0; i < allPhones.length; i++) {
        html += `
                <tr>
                    <td>${allPhones[i].name}</td>
                    <td><img width='50' src="http://angular.github.io/angular-phonecat/step-14/app/${allPhones[i].imageUrl}"/></td>
                    <td>
                        <button id='delete${allPhones[i].age}'>Delete</button>
                        <button id='update${allPhones[i].age}'>Update</button>
                        <button id='details${allPhones[i].age}'>Show More Details</button>
                    </td>   
                </tr>`
    }
    html += `
            </tbody>
        </table>`

    printToHtml(html);

    eventListenersOnButtons(allPhones);
}

function eventListenersOnButtons(allPhones) {
    //on add
    document.getElementById('add').addEventListener('click', function (e) {
        e.preventDefault();
        const thisOfAddForm = this;
        onAdd(thisOfAddForm);
    })

    for (let i = 0; i < allPhones.length; i++) {
        const phoneAge = allPhones[i].age;
        const singlePhoneEndpoint = `/phone/${phoneAge}`;

        //on details
        document.getElementById(`details${phoneAge}`).addEventListener('click', function (e) {
            e.preventDefault();
            a(singlePhoneEndpoint, onDetails);
        });

        //on delete
        document.getElementById(`delete${phoneAge}`).addEventListener('click', function (e) {
            e.preventDefault();
            let phoneAge = { age: this.id.slice(6) };
            b(phonesEndpoint, "DELETE", phoneAge);
        });

        //on update
        document.getElementById(`update${phoneAge}`).addEventListener('click', function (e) {
            e.preventDefault();
            a(singlePhoneEndpoint, onUpdate);
        });
    }
}

function onAdd(thisOfAddForm) {
    const phoneToAdd = {
        age: thisOfAddForm.form.age.value,
        carrier: thisOfAddForm.form.carrier.value,
        id: thisOfAddForm.form.id.value,
        imageUrl: thisOfAddForm.form.imageUrl.value,
        name: thisOfAddForm.form.name.value,
        snippet: thisOfAddForm.form.snippet.value,
    };
    b(phonesEndpoint, "POST", phoneToAdd);
}

function onDetails(phone) {
    let html = ''
    html += `
    <div>
        <img width='50' src="http://angular.github.io/angular-phonecat/step-14/app/${phone.imageUrl}"/>
        <br><br>
        <u>AGE:</u><br> ${phone.age}
        <br><br>
        <u>CARRIER: </u><br>${phone.carrier}
        <br><br>
        <u>ID: </u><br> ${phone.id}
        <br><br>
        <u>NAME: </u><br> ${phone.name}
        <br><br>
        <u>SNIPPET: </u><br>${phone.snippet}
        <br><br>
        <button id='returnToFullList'> Return To Full List </button>
    </div>`
    printToHtml(html);
    document.getElementById('returnToFullList').addEventListener('click', (e) => {
        e.preventDefault();
        a(phonesEndpoint, onShowPhoneList);
    })
}

function onUpdate(phoneOldDetails) {
    let html = ''
    html += `
            <input id='age' hidden value='${phoneOldDetails.age}'/>
            <br>
            <label class='updateLabel'>CARRIER: <input class='updateInput' id='carrier' value='${phoneOldDetails.carrier}'/></label>
            <br>
            <label class='updateLabel'>ID: <input class='updateInput' id='id' value='${phoneOldDetails.id}'/></label>
            <br>
            <label class='updateLabel'>iMAGE URL: <input class='updateInput' id='imageUrl' value='${phoneOldDetails.imageUrl}'/></label>
            <br>
            <label class='updateLabel'>NAME: <input class='updateInput' id='name' value='${phoneOldDetails.name}'/></label>
            <br>
            <label class='updateLabel'>SNIPPET: <input class='updateInput' id='snippet' value='${phoneOldDetails.snippet}'/></label>
            <br>
            <button id='saveChanges'> Save Changes </button>
            <button id='returnToFullList'> Return To Full List </button>`

    printToHtml(html);
    document.getElementById('saveChanges').addEventListener('click', (e) => {
        e.preventDefault();
        const phoneNewDetails = {
            age: document.getElementById("age").value,
            carrier: document.getElementById("carrier").value,
            id: document.getElementById("id").value,
            imageUrl: document.getElementById("imageUrl").value,
            name: document.getElementById("name").value,
            snippet: document.getElementById("snippet").value
        };
        b(phonesEndpoint, "PUT", phoneNewDetails);
    })
    document.getElementById('returnToFullList').addEventListener('click', (e) => {
        e.preventDefault();
        a(phonesEndpoint, onShowPhoneList);
    })
}

function a(endPoint, whenResponse) {
    fetch(endPoint).then(phoneData => {
        phoneData.json().then(whenResponse);
    })
}

function b(endPoint, httpVerb, bodyElement) {
    fetch(endPoint, {
        method: httpVerb,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyElement)
    }).then(responseData => {
        a(phonesEndpoint, onShowPhoneList);
    }).catch(err => {
        alert('not inserted');
    });
}

function printToHtml(html) {
    document.getElementById('main').innerHTML = html;
}