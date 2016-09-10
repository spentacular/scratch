/**
 * Module dependencies
 */

const text = document.querySelector('#text')
const clearBtn = document.querySelector('.js-clear')

/**
 * Local storage save string
 */

const storageName = 'SCRATCH'

/**
 * Debounce function to slow write to local storage
 */

const debounce = function (fn, duration = 200) {
  let timeout = null

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), duration)
  }
}

/**
 * Load from local storage on window start, or blank string
 */

const load = () => {
  const content = window.localStorage.getItem(storageName) || ''
  text.value = content
  text.focus()
}

/**
 * Save text
 */

const save = event => {
  window.localStorage.setItem(storageName, event.target.value)
}

/**
 * Delete text
 */

const del = () => {
  text.value = ''
  window.localStorage.setItem(storageName, text.value)
  text.focus()
}

/**
 * Debounce save
 */

const saveDebounce = debounce(save, 200)

/**
 * Write text input to local storage
 */

text.addEventListener('input', saveDebounce)

/**
 * Clear storage
 */

clearBtn.addEventListener('click', del)

/**
 * Load on start
 */

load()

/**
 * Delete on key press
 */

document.addEventListener('keydown', event => {
  if (event.metaKey && event.shiftKey && event.keyCode === 8) {
    del()
  }
})
