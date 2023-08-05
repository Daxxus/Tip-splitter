class Tip {
    constructor() {
        this.init = () => {
            this.listeners();
            this.startApp();
        };
        this.startApp = () => {
            const billl = this.inputBill.value === "";
            const people = this.inputPeople.value;
            if ((billl && people === "") || (billl && people <= "0")) {
                this.inputPeople.classList.add("error");
                this.span.style.display = "block";
                return;
            }
            else {
                this.inputPeople.classList.remove("error");
                this.span.style.display = "none";
                this.calculate();
            }
        };
        this.calculate = () => {
            this.inputBill.classList.add("error");
            this.bill = this.inputBill.value;
            this.custom = this.inputCustom.value;
            this.numberOfPersonss = this.inputPeople.value;
            if (this.numberOfPersonss <= "0") {
                this.inputPeople.classList.add("error");
                this.span.style.display = "block";
            }
            if (this.inputCustom.value !== "") {
                const totalPerPerson = (parseFloat(this.bill) +
                    Number(this.bill) * (Number(this.custom) / 100)) /
                    parseInt(this.numberOfPersonss);
                const tipAmount = parseFloat(Number(this.bill) * (Number(this.custom) / 100)) /
                    parseInt(this.numberOfPersonss);
                this.notANumber(totalPerPerson, tipAmount);
            }
        };
        this.listeners = () => {
            window.addEventListener("input", this.startApp);
            this.button.addEventListener("click", this.reset); //co w przypadku argumentu
            this.tips.forEach((tip) => tip.addEventListener("click", () => {
                this.inputCustom.value = "";
                const totalPerPerson = (parseFloat(this.bill) +
                    parseFloat(Number(this.bill) * Number(tip.value))) /
                    parseInt(this.numberOfPersonss);
                const tipAmount = parseFloat(Number(this.bill) * tip.value) /
                    parseInt(this.numberOfPersonss);
                this.notANumber(totalPerPerson, tipAmount);
            }));
        };
        this.reset = () => {
            this.inputs.forEach((inp) => {
                inp.value = "";
            });
            this.amount.textContent = "0.00";
            this.total.textContent = "0.00";
            this.calculate();
        };
        this.notANumber = (totalPerPerson, tipAmount) => {
            if (Number.isNaN(totalPerPerson) ||
                totalPerPerson === Infinity ||
                Number.isNaN(tipAmount) ||
                tipAmount === Infinity) {
                this.amount.textContent = "0.00";
                this.total.textContent = "0.00";
            }
            else {
                this.total.textContent = totalPerPerson.toFixed(2);
                this.amount.textContent = tipAmount.toFixed(2);
            }
        };
        this.inputBill = document.querySelector("#bill");
        this.inputPeople = document.querySelector(".people");
        this.inputCustom = document.querySelector("#custom");
        this.tips = document.querySelectorAll(".tip");
        this.span = document.querySelector("#peopleSpan");
        this.inputs = document.querySelectorAll("input");
        this.amount = document.querySelector("#spanAmount");
        this.total = document.querySelector("#spanTotal");
        this.button = document.querySelector(".btn");
        this.init();
    }
}
const tip = new Tip();
