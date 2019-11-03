const phonesEndpoint = '/phone';

fetch(phonesEndpoint).then(phoneData => {
    phoneData.json().then(phoneList);
})

function phoneList(phones) {
    let phoneCarrier = '';
    let html = '';
    for (let i = 0; i < phones.length; i++) {
        if (!phones[i].carrier) {
            phoneCarrier = '';
        } else {
            phoneCarrier = phones[i].carrier;
        }
        html += `<tr>
            <td>${phones[i].age}</td>
            <td>${phoneCarrier}</td>
            <td>${phones[i].id}</td>
            <td>${phones[i].imageUrl}</td>
            <td>${phones[i].name}</td>
            <td>${phones[i].snippet}</td>
        </tr>`
    }
    document.getElementById('phones').innerHTML = html;
}
