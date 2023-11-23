const cards = document.getElementsByClassName("ticket-card");
let backgroundColor;
for (let c of cards) {
    switch(c.dataset.ticketStatus) {
        case "created": 
            backgroundColor = 'text-bg-primary';
            break;
        case "doing":
            backgroundColor = 'text-bg-info';
            break;
        case "done":
            backgroundColor = 'text-bg-success';
            break;
        case "closed":
            backgroundColor = 'text-bg-secondary';
            break;
        default:
            backgroundColor = 'text-bg-primary';
    }
    c.classList.add(backgroundColor);
}