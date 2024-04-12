document.addEventListener('DOMContentLoaded', fetchData);

function fetchData() {
    axios.get('https://simple-books-api.glitch.me')
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;
            document.getElementById('myid').innerHTML = data.message;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    axios.get('https://simple-books-api.glitch.me/books')
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;
            const tableBody = document.getElementById('booksTableBody');
            tableBody.innerHTML = '';

            data.forEach(book => {
                const row = tableBody.insertRow();
                const id = row.insertCell(0);
                const name = row.insertCell(1);
                const type = row.insertCell(2);
                const available = row.insertCell(3);

                id.textContent = book.id;
                name.textContent = book.name;
                type.textContent = book.type;
                available.textContent = book.available;
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function getBook() {
    const bookId = document.getElementById("bookid").value;
    axios.get(`https://simple-books-api.glitch.me/books/${bookId}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const book = response.data; // Assuming response.data is a single book object
            console.log(book);

            // Populate table with book data
            const tableBody = document.getElementById('bookTable');
            tableBody.innerHTML = '';

            const row = tableBody.insertRow();
            const id = row.insertCell(0);
            const name = row.insertCell(1);
            const type = row.insertCell(2);
            const available = row.insertCell(3);
            const author = row.insertCell(4);
            const price = row.insertCell(5);
            const stock = row.insertCell(6);

            id.textContent = book.id;
            name.textContent = book.name;
            type.textContent = book.type;
            available.textContent = book.available;
            author.textContent = book.author;
            price.textContent = book.price;
            stock.textContent = book.current-stock;
            console.log("book.current-stock",book.current-stock);
            


        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


// function getBook() {
//     const bookId = document.getElementById("bookid").value;
//     axios.get(`https://simple-books-api.glitch.me/books/${bookId}`)
//         .then(response => {
//             if (response.status !== 200) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = response.data;
//             console.log(data);
//             const tableBody = document.getElementById('bookTable');
//             tableBody.innerHTML = '';

//             data.forEach(book => {
//                 const row = tableBody.insertRow();
//                 const id = row.insertCell(0);
//                 const name = row.insertCell(1);
//                 const type = row.insertCell(2);
//                 const available = row.insertCell(3);
//                 const author = row.insertCell(4);
//                 const price = row.insertCell(5);
//                 const stock = row.insertCell(6);

//                 id.textContent = book.id;
//                 name.textContent = book.name;
//                 type.textContent = book.type;
//                 available.textContent = book.available;
//                 author.textContent = book.author;
//                 price.textContent = book.price;
//                 stock.textContent = book.current - stock;
//             });
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }

function getAllOrder() {
    axios.get('https://simple-books-api.glitch.me/orders', {
        headers: {
            Authorization: `Bearer 6ff7f763c0a9d5a8edfc30ac74f05bf27e0358b2a3d06cc2d6bb3ebb4b3c39dc`
        }
    })
        .then(response => {
            if (response.status !== 200 && response.status<300 ) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;
            console.log(data);
            const tableBody = document.getElementById('ordersTableBody');
            tableBody.innerHTML = '';

            data.forEach(book => {
                const row = tableBody.insertRow();
                const orderid = row.insertCell(0);
                const bookid = row.insertCell(1);
                const name = row.insertCell(2);
                const quantity = row.insertCell(3);

                orderid.textContent = book.id;
                bookid.textContent = book.bookId;
                name.textContent = book.customerName;
                quantity.textContent = book.quantity;
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function updateorders() {
    const orderId = document.getElementById("orderid").value;
    const name = document.getElementById("custname").value;
    const data = {
        customerName: name
    };
    
    axios.patch(`https://simple-books-api.glitch.me/orders/${orderId}`, data, {
        headers: {
            Authorization: `Bearer 6ff7f763c0a9d5a8edfc30ac74f05bf27e0358b2a3d06cc2d6bb3ebb4b3c39dc`
        }
    })
    .then(response => {
        console.log(response);
        if (response.status == 204) {
             console.log("Updated customer name successfully");
            
        } else {
           throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('There was a problem updating the order:', error);
    });
}

function deleteOrder() {
    // Replace '<YOUR TOKEN>' with your actual token
    const orderId = document.getElementById("orderid").value;
    const token = '6ff7f763c0a9d5a8edfc30ac74f05bf27e0358b2a3d06cc2d6bb3ebb4b3c39dc';
    
    axios.delete(`https://simple-books-api.glitch.me/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('Order deleted successfully');
        // Handle success
    })
    .catch(error => {
        console.error('There was a problem deleting the order:', error);
        // Handle error
    });
}

function placeorders() {
            const bookId = document.getElementById("bookid1").value;
            const customerName = document.getElementById("name").value;
            const data = {
                bookId: bookId,
                customerName: customerName
            };
            console.log(data);
            // const config = {
            //     headers: {
            //         Authorization: 'Bearer <6ff7f763c0a9d5a8edfc30ac74f05bf27e0358b2a3d06cc2d6bb3ebb4b3c39dc>'
            //     }
            // };
            // axios.post('https://simple-books-api.glitch.me/orders/', data, config)
            //     .then(response => {
            //         console.log('Order placed successfully:', response.data);
            //         // Handle response data here
            //     })
            //     .catch(error => {
            //         console.error('There was a problem placing the order:', error);
            //         // Handle error here
            //     });

            fetch('https://simple-books-api.glitch.me/orders', {
                //  mode: 'no-cors',
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 6ff7f763c0a9d5a8edfc30ac74f05bf27e0358b2a3d06cc2d6bb3ebb4b3c39dc"

                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(responseData => {
                    console.log('Order placed successfully:', responseData);
                    // Handle response data here
                })
                .catch(error => {
                    console.error('There was a problem placing the order:', error);
                    // Handle error here
                });

        }