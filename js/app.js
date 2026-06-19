const form = document.getElementById("visaForm");
const passport = document.getElementById("passport");
const dob = document.getElementById("dob");
const country = document.getElementById("country");
const resultCard = document.getElementById("resultCard");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    resultCard.style.display = "block";

    const passportNumber =
    passport.value.trim();

    const selectedDob =
    dob.value;

    const selectedCountry =
    country.value;

    const applicants = JSON.parse(
        localStorage.getItem("visaApplicants")
    ) || [];

    const applicant = applicants.find(function(item){

        return item.passport === passportNumber;

    });

    if(!applicant){

        resultCard.className =
        "result-card rejected mt-4";

        resultCard.innerHTML = `
            <div class="status-icon">✕</div>

            <h3 style="color:red;">
                No Record Found
            </h3>

            <p>
                Passport number not found.
            </p>
        `;

        return;

    }

    if(applicant.dob !== selectedDob){

        resultCard.className =
        "result-card rejected mt-4";

        resultCard.innerHTML = `
            <div class="status-icon">✕</div>

            <h3 style="color:red;">
                DOB Mismatch
            </h3>

            <p>
                Date of Birth does not match.
            </p>
        `;

        return;

    }

    if(applicant.country !== selectedCountry){

        resultCard.className =
        "result-card rejected mt-4";

        resultCard.innerHTML = `
            <div class="status-icon">✕</div>

            <h3 style="color:red;">
                Country Mismatch
            </h3>

            <p>
                Selected country does not match.
            </p>
        `;

        return;

    }

    if(applicant.status === "Approved"){

        resultCard.className =
        "result-card approved mt-4";

    }
    else if(applicant.status === "Pending"){

        resultCard.className =
        "result-card pending mt-4";

    }
    else{

        resultCard.className =
        "result-card rejected mt-4";

    }

    resultCard.innerHTML = `
        <div class="status-icon">

            ${
                applicant.status === "Approved"
                ? "✓"
                : applicant.status === "Pending"
                ? "⏳"
                : "✕"
            }

        </div>

        <h3>
            ${applicant.status}
        </h3>

        <p>
            Visa application status found successfully.
        </p>

        <hr>

        <div class="info">

            <div>
                <strong>Name</strong><br>
                ${applicant.name}
            </div>

            <div>
                <strong>Passport</strong><br>
                ${applicant.passport}
            </div>

            <div>
                <strong>Country</strong><br>
                ${applicant.country}
            </div>

            <div>
                <strong>Visa Type</strong><br>
                ${applicant.visaType}
            </div>

            <div>
                <strong>Last Updated</strong><br>
                ${new Date().toLocaleDateString()}
            </div>

        </div>
    `;

});