async function createBtnHandler(event) {
    event.preventDefault();
    const roomno = document.querySelector('#roomno').value.trim();
    const title = document.querySelector('#title').value.trim() + ` at room ${roomno}`;
    const content = document.querySelector('#content').value.trim();
    const status = 'created'
    const userIdElement = document.querySelector('[data-user-id]');
    const creator_id = userIdElement.dataset.userId;

    if (title && content) {
        try {
            const response = await fetch('/api/tickets/', {
              method: 'POST',
              body: JSON.stringify({ title, content, status, creator_id }),
              headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/');
              } else {
                alert(response.status)
              }
            } catch (err) {
              console.log(err)
              res.status(500).json(err);
            };
    }
}

document
.querySelector('.newTicket-form')
.addEventListener('submit', createBtnHandler);