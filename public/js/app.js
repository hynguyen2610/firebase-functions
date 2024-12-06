const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const requestForm = document.querySelector('.new-request form');
const btnHello = document.querySelector('.call');

// open request modal
requestLink.addEventListener('click', () => {
    requestModal.classList.add('open');
});

// close request modal
requestModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('new-request')) {
        requestModal.classList.remove('open');
    }
});

// add a new request
requestForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const addRequest = firebase.functions().httpsCallable('addRequest');
    addRequest({
        text: requestForm.request.value
    })
        .then(() => {
            requestForm.reset();
            requestForm.querySelector('.error').textContent = '';
            requestModal.classList.remove('open');
        })
        .catch(error => {
            requestForm.querySelector('.error').textContent = error.message;
        });
});

btnHello.addEventListener('click', () => {
    console.log('client calls hello()');
    //Call the function sayHello
    const sayHello = firebase.functions().httpsCallable('hello');
    sayHello()
        .then((result) => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
});