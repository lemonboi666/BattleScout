document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('dataForm');
    const submittedDataList = document.getElementById('submittedData');

    dataForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const inputData = document.getElementById('dataInput').value;

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: inputData }),
            });

            // Check if the response status is OK (2xx)
            if (response.ok) {
                // Fetch and display updated data
                fetchData();
            } else {
                // Handle non-successful response, e.g., display an error message
                console.error('Failed to submit data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    });
    
    const fetchData = async () => {
        try {
            console.log('Fetching data...');
    
            const response = await fetch('/data');
    
            // Check if the response status is OK (2xx)
            if (response.ok) {
                const data = await response.json();
    
                console.log('Fetched data:', data);
    
                // Clear existing data in the list
                submittedDataList.innerHTML = '';
    
                // Display the fetched data in the list
                data.forEach((item) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item.content;
                    submittedDataList.appendChild(listItem);
                });
            } else {
                // Handle non-successful response, e.g., display an error message
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    // Fetch and display data on page load
    fetchData();
});
