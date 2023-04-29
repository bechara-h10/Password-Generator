const lengthSlider = document.querySelector('.password-length-container input')
const lengthValue = document.querySelector('.length-value')
const passwordInput = document.querySelector('.input-container input')
const settings = document.querySelectorAll('.setting input')
const copySpan = document.querySelector('.input-container span')
const passwordStrength = document.querySelector('.password-strength')

const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!$%&|[](){}:;.,*+-#@<>~',
}

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
      } else {
        randomPassword += randomChar
      }
    }
  }
  passwordInput.value = randomPassword
}
