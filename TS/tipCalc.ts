class Tip {
	inputBill: HTMLInputElement
	inputPeople: HTMLInputElement
	inputCustom: HTMLInputElement
	tips: NodeListOf<Element>
	span: HTMLSpanElement
	amount: HTMLSpanElement
	total: HTMLSpanElement
	button: HTMLButtonElement
	target: EventTarget
	inputs: NodeListOf<HTMLInputElement>
	bill: string
	numberOfPersonss: string
	custom: string
	constructor() {
		this.inputBill = document.querySelector("#bill")
		this.inputPeople = document.querySelector(".people")
		this.inputCustom = document.querySelector("#custom")

		this.tips = document.querySelectorAll(".tip")
		this.span = document.querySelector<HTMLSpanElement>("#peopleSpan")
		this.inputs = document.querySelectorAll("input")

		this.amount = document.querySelector<HTMLSpanElement>("#spanAmount")
		this.total = document.querySelector<HTMLSpanElement>("#spanTotal")
		this.button = document.querySelector<HTMLButtonElement>(".btn")
		this.init()
	}
	init = () => {
		this.listeners()
		this.startApp()
	}

	startApp = () => {
		const billl = this.inputBill.value === ""
		const people = this.inputPeople.value

		if ((billl && people === "") || (billl && people <= "0")) {
			this.inputPeople.classList.add("error")
			this.span.style.display = "block"
			return
		} else {
			this.inputPeople.classList.remove("error")
			this.span.style.display = "none"
			this.calculate()
		}
	}

	calculate = () => {
		this.inputBill.classList.add("error")
		this.bill = this.inputBill.value
		this.custom = this.inputCustom.value
		this.numberOfPersonss = this.inputPeople.value

		if (this.numberOfPersonss <= "0") {
			this.inputPeople.classList.add("error")
			this.span.style.display = "block"
		}

		if (this.inputCustom.value !== "") {
			const totalPerPerson =
				(Number(this.bill) + Number(this.bill) * (Number(this.custom) / 100)) /
				Number(this.numberOfPersonss)

			const tipAmount =
				(Number(this.bill) * (Number(this.custom) / 100)) /
				Number(this.numberOfPersonss)

			this.notANumber(totalPerPerson, tipAmount)
		}
	}

	listeners = () => {
		window.addEventListener("input", this.startApp)
		this.button.addEventListener("click", this.reset) //co w przypadku argumentu
		this.tips.forEach((tip: any) =>
			tip.addEventListener("click", () => {
				this.inputCustom.value = ""
				const totalPerPerson =
					(Number(this.bill) + Number(this.bill) * Number(tip.value)) /
					Number(this.numberOfPersonss)
				const tipAmount =
					(Number(this.bill) * tip.value) / Number(this.numberOfPersonss)

				this.notANumber(totalPerPerson, tipAmount)
			})
		)
	}

	reset = () => {
		this.inputs.forEach((inp) => {
			inp.value = ""
		})
		this.amount.textContent = "0.00"
		this.total.textContent = "0.00"
		this.calculate()
	}

	notANumber = (totalPerPerson: number, tipAmount: number) => {
		if (
			Number.isNaN(totalPerPerson) ||
			totalPerPerson === Infinity ||
			Number.isNaN(tipAmount) ||
			tipAmount === Infinity
		) {
			this.amount.textContent = "0.00"
			this.total.textContent = "0.00"
		} else {
			this.total.textContent = totalPerPerson.toFixed(2)
			this.amount.textContent = tipAmount.toFixed(2)
		}
	}
}
const tip = new Tip()
