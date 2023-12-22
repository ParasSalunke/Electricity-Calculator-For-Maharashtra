function changeLanguage() {
    const selectedLanguage = document.getElementById("language").value;
    const labels = document.querySelectorAll("label");

    if (selectedLanguage === "marathi") {
        labels[0].textContent = "भाषा निवडा";
        labels[1].textContent = "एकूण उपभोग युनिट्स प्रविष्ट करा";
        labels[2].textContent = "युनिट १ साठी युनिट दर प्रविष्ट करा";
        labels[3].textContent = "युनिट २ साठी युनिट दर प्रविष्ट करा";
        labels[4].textContent = "युनिट ३ साठी युनिट दर प्रविष्ट करा";
        labels[5].textContent = "युनिट ४ साठी युनिट दर प्रविष्ट करा";
        labels[6].textContent = "युनिट ५ साठी युनिट दर प्रविष्ट करा";
        labels[7].textContent = "स्थिर आकार प्रविष्ट करा";
        labels[8].textContent = "वहन आकार प्रविष्ट करा";
        labels[9].textContent = "युनिट १ साठी इं.स.आ (रु) प्रविष्ट करा";
        labels[10].textContent = "युनिट २ साठी इं.स.आ (रु) प्रविष्ट करा";
        labels[11].textContent = "युनिट ३ साठी इं.स.आ (रु) प्रविष्ट करा";
        labels[12].textContent = "युनिट ४ साठी इं.स.आ (रु) प्रविष्ट करा";
        labels[13].textContent = "युनिट ५ साठी इं.स.आ (रु) प्रविष्ट करा";
        labels[14].textContent = "वीज शुल्क % प्रविष्ट करा";
        labels[15].textContent = "वीज विक्रि कर प्रविष्ट करा";
        labels[16].textContent = "व्याज प्रविष्ट करा";
        labels[17].textContent = "एकूण थकबाकी/जमा प्रविष्ट करा";
    } else {
        labels[0].textContent = "Select Language";
        labels[1].textContent = "Enter Total Consume Units";
        labels[2].textContent = "Enter Unit Rate For Unit 1";
        labels[3].textContent = "Enter Unit Rate For Unit 2";
        labels[4].textContent = "Enter Unit Rate For Unit 3";
        labels[5].textContent = "Enter Unit Rate For Unit 4";
        labels[6].textContent = "Enter Unit Rate For Unit 5";
        labels[7].textContent = "Enter Fixed Charges";
        labels[8].textContent = "Enter Distribution Charges";
        labels[9].textContent = "Enter Fuel Charges For Unit 1";
        labels[10].textContent = "Enter Fuel Charges For Unit 2";
        labels[11].textContent = "Enter Fuel Charges For Unit 3";
        labels[12].textContent = "Enter Fuel Charges For Unit 4";
        labels[13].textContent = "Enter Fuel Charges For Unit 5";
        labels[14].textContent = "Enter Electricity Charges %";
        labels[15].textContent = "Enter Electricity Duty Charges";
        labels[16].textContent = "Enter Electricity Interest";
        labels[17].textContent = "Enter Total Dues/Deposits";
        document.querySelector("button").textContent = "Calculate";
    }

}

function resetForm() {
    const inputFields = document.querySelectorAll('input[type="number"]');
    inputFields.forEach((field) => {
        field.value = '';
    });

}

function calculateBillAndPlaySound() {
    const clickSound = document.getElementById("clickSound");
    clickSound.play();
    calculateBill();
}

function resetFormAndPlaySound() {
    const clickSound = document.getElementById("clickSound");
    clickSound.play();
    resetForm();
}

function calculateBill() {
    const totalunits = parseFloat(document.getElementById("totalunits").value);
    const unitrate1 = parseFloat(document.getElementById("unitrate1").value) || 0;
    const unitrate2 = parseFloat(document.getElementById("unitrate2").value) || 0;
    const unitrate3 = parseFloat(document.getElementById("unitrate3").value) || 0;
    const unitrate4 = parseFloat(document.getElementById("unitrate4").value) || 0;
    const unitrate5 = parseFloat(document.getElementById("unitrate5").value) || 0;
    const fixedcharges = parseFloat(document.getElementById("fixedcharges").value) || 0;
    const distributioncharge = parseFloat(document.getElementById("distributioncharge").value) || 0;
    const fuel1 = parseFloat(document.getElementById("fuel1").value) || 0;
    const fuel2 = parseFloat(document.getElementById("fuel2").value) || 0;
    const fuel3 = parseFloat(document.getElementById("fuel3").value) || 0;
    const fuel4 = parseFloat(document.getElementById("fuel4").value) || 0;
    const fuel5 = parseFloat(document.getElementById("fuel5").value) || 0;
    const electricitycharge = parseFloat(document.getElementById("electricitycharge").value)|| 0;
    const interest = parseFloat(document.getElementById("interest").value) || 0;
    const dutycharge = parseFloat(document.getElementById("dutycharge").value) || 0;
    const discount = parseFloat(document.getElementById("discount").value) || 0;

    if (
        isNaN(totalunits) || isNaN(unitrate1) || isNaN(unitrate2) || isNaN(unitrate3) || isNaN(unitrate4) || isNaN(unitrate5) ||
        isNaN(fixedcharges) || isNaN(distributioncharge) || isNaN(fuel1) || isNaN(fuel2) || isNaN(fuel3) || isNaN(fuel4) || isNaN(fuel5) ||
        isNaN(electricitycharge) || isNaN(dutycharge) || isNaN(interest) || isNaN(discount)
    ) {
        const errorPopup = document.getElementById("errorPopup");
        errorPopup.style.display = "block";
        errorPopup.style.animation = "popupFadeIn 0.5s";

        setTimeout(function () {
            errorPopup.style.display = "none";
        }, 3000);
    } else {
        let { cost, fuelCost } = calculateCost(totalunits, unitrate1, unitrate2, unitrate3, unitrate4, unitrate5, fuel1, fuel2, fuel3, fuel4, fuel5);
        const amountZ = totalunits * distributioncharge;
        const duty = totalunits * dutycharge;
        const sub = fixedcharges + amountZ + duty + cost + fuelCost;
        const charge = (sub * electricitycharge) / 100;
        const final = charge + sub;
        const amountP = final + interest + discount;

        const roundedfixedcharges = fixedcharges.toFixed(2);
        const resultElement1 = document.getElementById("result1");
        resultElement1.innerHTML = `स्थिर आकार (Fixed Charges) : ₹${roundedfixedcharges}`;

        const roundedcost = cost.toFixed(2);
        const resultElement2 = document.getElementById("result2");
        resultElement2.innerHTML = `वीज आकार (Energy Charges) : ₹${roundedcost}`;

        const roundedamountZ = amountZ.toFixed(2);
        const resultElement3 = document.getElementById("result3");
        resultElement3.innerHTML = `वहन आकार (Wheeling Charges) : ₹${roundedamountZ}`;

        const roundedfuelCost = fuelCost.toFixed(2);
        const resultElement4 = document.getElementById("result4");
        resultElement4.innerHTML = `इंधन समायोजन आकार (Fuel Charges) : ₹${roundedfuelCost}`;

        const roundedcharge = charge.toFixed(2);
        const resultElement5 = document.getElementById("result5");
        resultElement5.innerHTML = `वीज शुल्क (Electricity Tax) : ₹${roundedcharge}`;

        const roundedduty = duty.toFixed(2);
        const resultElement6 = document.getElementById("result6");
        resultElement6.innerHTML = `वीज विक्रि कर (Duty Charges) : ₹${roundedduty}`;

        const roundedinterest = interest.toFixed(2);
        const resultElement7 = document.getElementById("result7");
        resultElement7.innerHTML = `व्याज (Interest) : ₹${roundedinterest}`;

        const roundeddiscount = discount.toFixed(2);
        const resultElement8 = document.getElementById("result8");
        resultElement8.innerHTML = `एकूण थकबाकी/जमा (Dues/Deposits) : ₹${roundeddiscount}`;

        const totalBill = amountP.toFixed(2);
        const resultElement9 = document.getElementById("result9");
        resultElement9.innerHTML = `Total Electricity Bill = ₹${totalBill}`;
    }
}

function calculateCost(totalunits, unitrate1, unitrate2, unitrate3, unitrate4, unitrate5, fuel1, fuel2, fuel3, fuel4, fuel5) {
    let cost = 0;
    let fuelCost = 0;

    if (totalunits <= 100) {
        cost = totalunits * unitrate1;
        fuelCost = totalunits * fuel1;
    } else {
        cost = 100 * unitrate1;
        fuelCost = 100 * fuel1;

        if (totalunits <= 300) {
            cost += (totalunits - 100) * unitrate2;
            fuelCost += (totalunits - 100) * fuel2;
        } else {
            cost += 200 * unitrate2;
            fuelCost += 200 * fuel2;

            if (totalunits <= 500) {
                cost += (totalunits - 300) * unitrate3;
                fuelCost += (totalunits - 300) * fuel3;
            } else {
                cost += 200 * unitrate3;
                fuelCost += 200 * fuel3;

                if (totalunits <= 1000) {
                    cost += (totalunits - 500) * unitrate4;
                    fuelCost += (totalunits - 500) * fuel4;
                } else {
                    cost += 500 * unitrate4;
                    fuelCost += 500 * fuel4;

                    cost += (totalunits - 1000) * unitrate5;
                    fuelCost += (totalunits - 1000) * fuel5;
                }
            }
        }
    }

    return { cost, fuelCost };
}

changeLanguage();
