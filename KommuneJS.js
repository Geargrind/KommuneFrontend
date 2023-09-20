//window.addEventListener('load', fetchKommuner, fetchRegioner)
const kommunerURL= "http://localhost:3333/regionkommunerdat22c"
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

            <td><a data-id-delete=${k.id} href="#">Delete</a></td>
            <!-- <td><a data-data-edit='${JSON.stringify(k)}' href="#">Edit</a></td> -->
            <td><a data-id-edit='${k.id}' href="#">Edit</a></td>
        </tr>
        `)
    document.getElementById("kommune-table-body").innerHTML = rows.join("")
}

function makeRowsRegion() {
    //make rows from data
    const rows = regioner.map(r => `
        <tr>
            <td>${r.navn}</td>
            <td>${r.href}</td>
            <td>${r.kode}</td>
            
            <td><a data-id-delete=${r.id} href="#">Delete</a></td>
            <!-- <td><a data-data-edit='${JSON.stringify(r)}' href="#">Edit</a></td> -->
            <td><a data-id-edit='${r.id}' href="#">Edit</a></td>
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

/*
function populateKommuneTable(body){
    const kommuner = document.getElementById("kommune-table-body");
    kommuner.innerHTML = '';

    body.forEach(kommune => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = kommune.navn;
        row.appendChild(nameCell);

        const hrefCell = document.createElement('td');
        hrefCell.textContent = kommune.href;
        row.appendChild(hrefCell);

        const kodeCell = document.createElement('td');
        kodeCell.textContent = kommune.kode;
        row.appendChild(kodeCell);

        const rNavnCell = document.createElement('td');
        kodeCell.textContent = kommune.region.navn;
        row.appendChild(kodeCell);

        kommuner.appendChild(row);
    });
}



function populateRegionTable(body){
    const regioner = document.getElementById("region-table-body");
    regioner.innerHTML = '';

    body.forEach(region => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = region.navn;
        row.appendChild(nameCell);

        const hrefCell = document.createElement('td');
        hrefCell.textContent = region.href;
        row.appendChild(hrefCell);

        const kodeCell = document.createElement('td');
        kodeCell.textContent = region.kode;
        row.appendChild(kodeCell);

        regioner.appendChild(row);
    });
}

 */
