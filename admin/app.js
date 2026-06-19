const form = document.getElementById("adminForm");
const tableBody = document.querySelector("#applicantTable tbody");

let applicants = JSON.parse(
    localStorage.getItem("visaApplicants")
) || [];

// Page Load
renderTable();

// Add Applicant
form.addEventListener("submit", function(e){

    e.preventDefault();

    const applicant = {
        name: document.getElementById("name").value,
        passport: document.getElementById("passport").value,
        dob: document.getElementById("dob").value,
        country: document.getElementById("country").value,
        visaType: document.getElementById("visaType").value,
        status: document.getElementById("status").value
    };

    // Duplicate Passport Check
    const exists = applicants.find(function(item){

        return item.passport === applicant.passport;

    });

    if(exists){

        alert("Passport Number Already Exists!");

        return;

    }

    applicants.push(applicant);

    saveApplicants();

    renderTable();

    form.reset();

});

// Save Data
function saveApplicants(){

    localStorage.setItem(
        "visaApplicants",
        JSON.stringify(applicants)
    );

}

// Render Table
function renderTable(){

    tableBody.innerHTML = "";

    applicants.forEach(function(applicant, index){

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${applicant.name}</td>
            <td>${applicant.passport}</td>
            <td>${applicant.dob}</td>
            <td>${applicant.country}</td>
            <td>${applicant.visaType}</td>
            <td>${applicant.status}</td>

            <td>

                <button
                class="btn btn-warning btn-sm edit-btn me-1">

                    Edit

                </button>

                <button
                class="btn btn-danger btn-sm delete-btn">

                    Delete

                </button>

            </td>
        `;

        // Edit Button
        const editBtn =
        row.querySelector(".edit-btn");

        editBtn.addEventListener("click", function(){

            document.getElementById("name").value =
            applicant.name;

            document.getElementById("passport").value =
            applicant.passport;

            document.getElementById("dob").value =
            applicant.dob;

            document.getElementById("country").value =
            applicant.country;

            document.getElementById("visaType").value =
            applicant.visaType;

            document.getElementById("status").value =
            applicant.status;

            applicants.splice(index, 1);

            saveApplicants();

            renderTable();

        });

        // Delete Button
        const deleteBtn =
        row.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function(){

            if(confirm("Delete this applicant?")){

                applicants.splice(index, 1);

                saveApplicants();

                renderTable();

            }

        });

        tableBody.appendChild(row);

    });

}

// Logout
const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click", function(){

        localStorage.removeItem("isLoggedIn");

        window.location.href =
        "login.html";

    });

}