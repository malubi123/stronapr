// Dodajemy event listener do przycisku wyszukiwania
document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Wyczyść poprzednie wyniki

    if (query) {
        // Endpoint API Wayback Machine do wyszukiwania wersji stron
        const apiUrl = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(query)}&output=json&fl=original&filter=statuscode:200`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const records = data[1] || []; // [1] zawiera dane z wyników wyszukiwania

                if (records.length === 0) {
                    resultsDiv.innerHTML = '<p>Brak wyników</p>';
                } else {
                    records.forEach(record => {
                        const archivedUrl = `https://web.archive.org/web/${record[1]}/${record[0]}`;
                        const originalUrl = record[0];

                        const resultItem = document.createElement('div');
                        resultItem.classList.add('result-item');
                        resultItem.innerHTML = `<h2>${originalUrl}</h2><p><a href="${archivedUrl}" target="_blank">${archivedUrl}</a></p>`;
                        resultsDiv.appendChild(resultItem);
                    });
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
