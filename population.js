function getpopulation(){
    const city = document.getElementById('cityInput').value;
    const populationDetails = document.getElementById('populationDetails');
  
    if (city === '') {
      populationDetails.innerHTML = '<p>Please enter a city name.</p>';
      return;
    }
  
    // Fetch population details
    const populationUrl = `https://countriesnow.space/api/v0.1/countries/population/cities`;
    fetch(populationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        city: city
      })
    })
    .then(response => response.json())
    .then(populationData => {
      console.log(populationData)
      if (populationData.data && populationData.data.populationCounts && populationData.data.populationCounts.length > 0) {
        const population= `
          <h2>${city}</h2>
          <p>Population: ${populationData.data.populationCounts[0].value}</p>
        `;
        populationDetails.innerHTML = population;
      } else {
        populationDetails.innerHTML = '<p>No population data available for this city.</p>';
      }
    })
    .catch(error => {
      populationDetails.innerHTML = '<p>Error fetching population data. Please try again.</p>';
    });
  }