// create new post button handler

function createBtnHandler() {
    document.location.replace('/newTicket');
}

const createBtn = document.getElementById('createBtn')
createBtn.addEventListener('click', createBtnHandler);