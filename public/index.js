const phonesEndpoint = '/phone';

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
    }).catch(err => {
        alert('not inserted')
    });
})

document.getElementById('search').addEventListener('click', (e)=>{
    e.preventDefault();
    console.log('deaddddddddddddddddd');
})

fetch(phonesEndpoint).then(phoneData => {
    phoneData.json().then(phoneList);
})

function phoneList(phones) {
    let html = '';
    for (let i = 0; i < phones.length; i++) {
        /*  if (!phones[i].carrier) {
             phoneCarrier = '';
         } else {
             phoneCarrier = phones[i].carrier;
         } */
        html += `<tr>
        <td>${phones[i].name}</td>
        <td><img width='50' src="http://angular.github.io/angular-phonecat/step-14/app/${phones[i].imageUrl}"/></td>
            <td>
                <form>
                    <input type='hidden' name='age' value='${phones[i].age}'>
                    <button id='delete'>Delete</button>
                    <button id='update' name="operation" value='update'>Update</button>
                    <button id='details' name="operation" value="details">Show More Details</button>
                </form>
            </td>   
        </tr>`
    }
    document.getElementById('phones').innerHTML = html;
}