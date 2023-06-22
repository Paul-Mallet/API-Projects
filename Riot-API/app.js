
const quiz = [
    {
        id: 1,
        categories: ["top", "silver", "5"],
        img: "img/top-silver-5-darius.png"
    },
    {
        id: 2,
        categories: ["mid", "gold", "10"],
        img: "img/mid-gold-10-akali.png"
    }
]

const defaultButton = document.getElementById('default-button')
const otherButtons = document.querySelectorAll('.roles-filter button')

const filters_div = document.querySelector("#filters_div")


defaultButton.addEventListener("click", () => {
        if (filters_div.classList.contains("hide")) {
            filters_div.classList.remove("hide")
        } else {
            filters_div.classList.add("hide")
        }
    })


otherButtons.forEach( btn => { 
    btn.addEventListener("click", () => {
        const otherValue = btn.getAttribute('data-value')

        defaultButton.setAttribute('data-value', otherValue)
        defaultButton.querySelector('span').textContent = btn.querySelector('span').textContent

        const otherImageSrc = btn.querySelector('img').src

        defaultButton.querySelector('img').src = otherImageSrc

        if (filters_div.classList.contains("hide")) {
            filters_div.classList.remove("hide")
        } else {
            filters_div.classList.add("hide")
        }
    })
})

// cliquer sur btn-dft + autres -> 