const phonesEndpoint = '/phone';

listView();

function listView() {
    fetch(phonesEndpoint).then(phoneData => {
        phoneData.json().then(onPhoneList);
    })
}

function onPhoneList(phones) {
    let html = ` 
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
                        <form>
                            <button id='delete${phones[i].age}'>Delete</button>
                            <button id='update' name="operation" value='update'>Update</button>
                            <button id='${phones[i].age}' name="details" value="${phones[i].age}">Show More Details</button>
                        </form>
                    </td>   
                </tr>`
    }
    html += `
            </tbody>
        </table>`

    document.getElementById('main').innerHTML = html;

    eventListenersOnButtons(phones);
}

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
        console.log(responseData);

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

function eventListenersOnButtons(phones) {
    for (let i = 0; i < phones.length; i++) {
        const singlePhoneEndpoint = `/phone/${phones[i].age}`;
        //on show more details
        document.getElementById(phones[i].age).addEventListener('click', function (e) {
            e.preventDefault();
            fetch(singlePhoneEndpoint).then(phoneData => {
                phoneData.json().then(onDetails);
            });
        });
        //on delete
        document.getElementById(`delete${phoneAge}`).addEventListener('click', function (e,) {
            e.preventDefault();
            let age = this.id.slice(6);
            fetch(phonesEndpoint, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }, // this line is important, if this content-type is not set it wont work
                body: JSON.stringify(age)
            }).then(responseData => {
                console.log(responseData);
                listView();
            }).catch(err => {
                alert('not inserted')
            });
        });
    }
}

function onDetails(phoneAge) {
    if (!phoneAge.carrier) {
        phoneAge.carrier = '';
    } else {
        phoneAge.carrier = phoneAge.carrier;
    }
    let html = ''
    html += `
    <div>
        <img width='50' src="http://angular.github.io/angular-phonecat/step-14/app/${phoneAge.imageUrl}"/>
        <br>
        AGE: ${phoneAge.age}
        <br>
        CARRIER: ${phoneAge.carrier}
        <br>
        ID: ${phoneAge.id}
        <br>
        NAME: ${phoneAge.name}
        <br>
        SNIPPET: ${phoneAge.snippet}
        <br>
        <form>
            <button id='returnToFullList'> Return To Full List </button>
        </form>
    </div>`
    document.getElementById('main').innerHTML = html;
    document.getElementById('returnToFullList').addEventListener('click', (e) => {
        e.preventDefault();
        listView();
    })
}
