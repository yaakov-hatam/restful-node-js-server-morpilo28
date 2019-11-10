const tokenEndPoint = '/token';

document.getElementById('send').addEventListener('click', () => {
    fetch(tokenEndPoint, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body:
            JSON.stringify({ name: document.getElementById('name').value })
    }).then(responseData => {
        console.log(responseData);
    })
});
