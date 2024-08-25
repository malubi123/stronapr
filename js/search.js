document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Wyczyść poprzednie wyniki

    if (query) {
        // Zdefiniuj różne warianty URL do przetestowania
        const urlVariants = [
            `http://${query}.com`,
            `https://${query}.com`,
            `http://www.${query}.com`,
            `https://www.${query}.com`,
            `http://${query}.org`,
            `https://${query}.org`,
            `http://www.${query}.org`,
            `https://www.${query}.org`,
            // Dodaj więcej wariantów w razie potrzeby
        ];

        // Sprawdź każdy wariant URL
        urlVariants.forEach(url => {
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        const resultItem = document.createElement('div');
                        resultItem.classList.add('result-item');
                        resultItem.innerHTML = `<p><a href="${url}" target="_blank">${url}</a></p>`;
                        resultsDiv.appendChild(resultItem);
                    }
                })
                .catch(error => {
                    console.error('Błąd:', error);
                });
        });
    } else {
        resultsDiv.innerHTML = '<p>Proszę wpisać zapytanie</p>';
    }
});

// Dodajemy event listener do przycisku plus
document.getElementById('plusButton').addEventListener('click', function() {
    window.location.href = "https://example.com"; // Tutaj wstaw adres strony, na którą ma przekierować przycisk
});
