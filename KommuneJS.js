//window.addEventListener('load', fetchKommuner, fetchRegioner)
const kommunerURL= "http://localhost:3333/getKommuner"
let kommuner = []
let regioner = []
fetchRegioner()
fetchKommuner()

function makeRowsKommune() {
    //make rows from data
    const rows = kommuner.map(k => `
        <tr>
            <td>${k.navn}</td>
            <td>${k.kode}</td>
            <td>${k.href}</td>

            <td><a data-delete-id=${k.kode} href="#">Delete</a></td>
            <!-- <td><a data-data-edit='${JSON.stringify(k)}' href="#">Edit</a></td> -->
            <td><a data-id-edit='${k.kode}' href="#">Edit</a></td>
        </tr>
        `)
    document.getElementById("kommune-table-body").innerHTML = rows.join("")
    const deleteLinks = document.querySelectorAll('[data-delete-id]');
    deleteLinks.forEach(link => {
        link.addEventListener('click', handleDeleteClick);
        fetch(`http://localhost:3333/deleteKommune/${kode}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Opdater kommuner-array'et ved at fjerne den kommune, der blev slettet
                    kommuner = kommuner.filter(kommune => kommune.kode !== kode);

                    // Opdater tabellen i HTML med den opdaterede kommuner-array
                    makeRowsKommune();
                    console.log('Kommune blev slettet');
                } else {
                    // Håndter fejl, f.eks. vis en fejlmeddelelse
                    console.error('Fejl ved sletning af kommune. Statuskode:', response.status);
                    response.text().then(errorText => {
                        console.error('Fejltekst:', errorText);
                    });
                }
            })
            .catch(error => {
                console.error('Der opstod en fejl under fetch-anmodningen:', error);
            });
    });
}

function makeRowsRegion() {
    //make rows from data
    const rows = regioner.map(r => `
        <tr>
            <td>${r.navn}</td>
            <td>${r.href}</td>
            <td>${r.kode}</td>
            
            <td><a data-id-delete=${r.kode} href="#">Delete</a></td>
            <!-- <td><a data-data-edit='${JSON.stringify(r)}' href="#">Edit</a></td> -->
            <td><a data-id-edit='${r.kode}' href="#">Edit</a></td>
        </tr>
        `)
    document.getElementById("region-table-body").innerHTML = rows.join("")
}



function fetchKommuner(){
    fetch("http://localhost:3333/getKommuner")
        .then(result => {
            if (result.status >= 400) {
                throw new Error("Server returned an error");
            }
            return result.json();

        })
        .then(body => {
            kommuner = body
            console.log(kommuner)
            makeRowsKommune()
        })
        .catch(error => {
            console.error("There was an error fetching the data:", error);
        });


}

function fetchRegioner(){
    fetch("http://localhost:3333/getRegioner")
        .then(result => {
            if (result.status >= 400) {
                throw new Error("Server returned an error");
            }
            return result.json();
        })
        .then(body => {
            regioner = body
            console.log(body)
            makeRowsRegion()
        })
        .catch(error => {
            console.error("There was an error fetching the data:", error);
        });

}

function handleDeleteClick(event) {
    event.preventDefault();
    const kode = event.target.getAttribute('data-delete-id');

// Funktion til at håndtere klik på "Delete" linket
    function handleTableClick(evt) {
        evt.preventDefault()
        evt.stopPropagation()
        const target = evt.target;

        if (target.dataset.idDelete) {
            //alert("Delete "+target.dataset.idDelete)
            const idToDelete = Number(target.dataset.idDelete)

            //apiStudentDelete(idToDelete)
            const options = makeOptions("DELETE")
            fetch(`${kommunerURL}/${idToDelete}`, options)
                .then(handleHttpErrors)
                .catch(err => {
                    if (err.apiError) {
                        console.error("Full API error: ", err.apiError)
                    } else {
                        console.error(err.message)
                    }
                })

            //student = students.filter(u => (u.id == idToDelete) ? false : true)
            kommuner = kommuner.filter(k => k.kode !== idToDelete)

            makeRowsKommune()
        }

        if (target.dataset.idEdit) {
            const idToEdit = Number(target.dataset.idEdit)
            const kommune = kommuner.find(k => k.id === idToEdit)
            makeRowsKommune(kommune)
        }
    }
}


