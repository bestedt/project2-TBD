fetch(`/api/data/serviceQuality`)
.then(response=>response.json())
.then(serviceData=>{ 
    console.log(serviceData)
    const meet = serviceData.meet;
    const miss = serviceData.total - serviceData.meet;

    // set percent show on screen
    const percentSpan = document.getElementById('serviceQualityPercent');
    percentSpan.textContent = `  ${serviceData.percent}%  `;
    if (serviceData.percent > 80) {
        percentSpan.className = 'text-success';
    } else {
        percentSpan.className = 'text-danger'
    }

    // draw pie chart
    const data = {
        labels: [
          'meet',
          'miss',
        ],
        datasets: [{
          label: 'service quality',
          data: [meet, miss], //serviceData
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
          ],
          hoverOffset: 4
        }]
      };
    
    const config = {
        type: 'pie',
        data: data,
      };
    
    const ctx = document.getElementById('performanceChart');
    const chart = new Chart(ctx, config);
})
.catch(err=>console.error(err));