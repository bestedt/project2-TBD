async function acceptBtnHandler() {
    // update ticket status from created to doing, refresh page or go to /
    const ticketElement = document.querySelector('[data-ticket-id]');
    const ticketId = ticketElement.dataset.ticketId;
    const userId = ticketElement.dataset.userId;
    try {
        const response = await fetch(`/api/tickets/${ticketId}`, {
            method: 'PUT',
            body: JSON.stringify({
                status: "doing",
                user_id: userId,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to accept ticket.');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
}

async function doneBtnHandler() {
    // update ticket status from doing to done, refresh page or go to /
    const ticketElement = document.querySelector('[data-ticket-id]');
    const ticketId = ticketElement.dataset.ticketId;
    try {
        const response = await fetch(`/api/tickets/${ticketId}`, {
            method: 'PUT',
            body: JSON.stringify({
                status: "done",
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to mark ticket done.');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
}

async function closeBtnHandler() {
    // update ticket status from done to closed, refresh page or go to /
    const ticketElement = document.querySelector('[data-ticket-id]');
    const ticketId = ticketElement.dataset.ticketId;
    try {
        const response = await fetch(`/api/tickets/${ticketId}`, {
            method: 'PUT',
            body: JSON.stringify({
                status: "closed",
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to mark ticket closed.');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
}

const acceptBtn = document.getElementById("acceptBtn");
const doneBtn = document.getElementById("doneBtn");
const closeBtn = document.getElementById("closeBtn");

if (acceptBtn) acceptBtn.addEventListener('click', acceptBtnHandler);
if (doneBtn) doneBtn.addEventListener('click', doneBtnHandler);
if (closeBtn) closeBtn.addEventListener('click', closeBtnHandler);