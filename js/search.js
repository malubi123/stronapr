document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', function() {
        const query = document.getElementById('searchInput').value;
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Wyczyść poprzednie wyniki

        if (query) {
            fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`)
                .then(response => response.json())
                .then(data => {
                    const generalResults = data.RelatedTopics || [];
                    const googleSitesResults = generalResults.filter(item => item.FirstURL && item.FirstURL.includes('sites.google.com'));
                    const otherResults = generalResults.filter(item => item.FirstURL && !item.FirstURL.includes('sites.google.com'));

                    googleSitesResults.forEach(item => {
                        if (item.Text) {
                            const resultItem = document.createElement('div');
                            resultItem.classList.add('result-item');
                            resultItem.innerHTML = `<h2>${item.Text}</h2><p><a href="${item.FirstURL}" target="_blank">${item.FirstURL}</a></p>`;
                            resultsDiv.appendChild(resultItem);
                        }
                    });

                    otherResults.forEach(item => {
                        if (item.Text) {
                            const resultItem = document.createElement('div');
                            resultItem.classList.add('result-item');
                            resultItem.innerHTML = `<h2>${item.Text}</h2><p><a href="${item.FirstURL}" target="_blank">${item.FirstURL}</a></p>`;
                            resultsDiv.appendChild(resultItem);
                        }
                    });

                    if (generalResults.length === 0) {
                        resultsDiv.innerHTML = '<p>Brak wyników</p>';
                    }
                })
                .catch(error => {
                    console.error('Błąd:', error);
                    resultsDiv.innerHTML = '<p>Wystąpił błąd podczas wyszukiwania</p>';
                });
        } else {
            resultsDiv.innerHTML = '<p>Proszę wpisać zapytanie</p>';
        }
    });

    // Dodajemy event listener do przycisku plus
    document.getElementById('plusButton').addEventListener('click', function() {
        window.location.href = "https://example.com"; // Tutaj wstaw adres strony, na którą ma przekierować przycisk
    });
});
