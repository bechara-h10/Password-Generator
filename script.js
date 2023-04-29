const lengthSlider = document.querySelector('.password-length-container input')
const lengthValue = document.querySelector('.length-value')
const passwordInput = document.querySelector('.input-container input')
const settings = document.querySelectorAll('.setting input')
const copySpan = document.querySelector('.input-container span')
const passwordStrength = document.querySelector('.password-strength')
const generateButton = document.querySelector('.generate-button')
const errorText = document.querySelector('.error-text')
const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!$%&|[](){}:;.,*+-#@<>~',
}

generatePassword()
updateStrengthSlider()

function generatePassword() {
  let staticPassword = ''
  let randomPassword = ''
  let excludeDuplicate = false
  let passwordLength = lengthSlider.value
  settings.forEach((setting) => {
    if (setting.checked) {
      if (
        setting.id !== 'exclude-duplicate' &&
        setting.id !== 'include-spaces'
      ) {
        staticPassword += characters[setting.id]
      } else if (setting.id == 'include-spaces') {
        staticPassword += `  ${characters[setting.id]}  `
      } else {
        excludeDuplicate = true
      }
    }
  })

  for (let i = 0; i < passwordLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)]
    if (excludeDuplicate) {
      if (!randomPassword.includes(randomChar) && randomChar !== ' ') {
        randomPassword += randomChar
      }
    } else {
      randomPassword += randomChar
    }
  }
  lengthValue.textContent = randomPassword.length
  passwordInput.value = randomPassword
}

function updateStrengthSlider() {
  passwordStrength.id =
    lengthSlider.value >= 8 && lengthSlider.value <= 12
      ? 'weak'
      : lengthSlider.value > 12 && lengthSlider.value < 24
      ? 'medium'
      : 'strong'
}

generateButton.addEventListener('click', () => {
  generatePassword()
  updateStrengthSlider()
})

lengthSlider.addEventListener('input', () => {
  generatePassword()
  updateStrengthSlider()
})

settings.forEach((setting) => {
  setting.addEventListener('change', () => {
    generatePassword()
    updateStrengthSlider()
  })
})

copySpan.addEventListener('click', () => {
  if (passwordInput.value == '') {
    errorText.classList.add('active')
    setTimeout(() => {
      errorText.classList.remove('active')
    }, 3000)
    return
  }
  navigator.clipboard.writeText(passwordInput.value)
  copySpan.textContent = 'done'
  copySpan.style.color = '#43a047'
  setTimeout(() => {
    copySpan.textContent = 'copy_all'
    copySpan.style.color = 'black'
  }, 2000)
})
