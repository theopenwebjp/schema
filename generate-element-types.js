const { JSDOM } = require('jsdom')
const fs = require('fs')
const path = require('path')

/**
* @param {any[]} arr
*/
function unique(arr) {
  /**
  * @type {any[]}
  */
  const done = []

  return arr.filter(i => {
    if (done.includes(i)) {
      return false
    } else {
      done.push(i)
      return true
    }
  })
}

/**
* HTML Block elements
* @see https://www.w3resource.com/html/HTML-block-level-and-inline-elements.php
*/
const HTML_BLOCK_ELEMENTS = [
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'pre', 'address', 'blockquote', 'dl', 'div', 'fieldset', 'form', 'hr', 'noscript', 'table'
]

/**
* HTML Inline elements
* @see https://www.w3resource.com/html/HTML-block-level-and-inline-elements.php
*/
const HTML_INLINE_ELEMENTS = [
  'b', 'big', 'i', 'small', 'tt', 'abbr', 'acronym', 'cite', 'code', 'dfn', 'em', 'kbd', 'strong', 'samp', 'var', 'a', 'bdo', 'br', 'img', 'map', 'object', 'q', 'script', 'span', 'sub', 'sup', 'button', 'input', 'label', 'select', 'textarea'
]

function HTMLBlockElementsType() {
  return 'type HTMLBlockElements = ' + unique(HTML_BLOCK_ELEMENTS.map(i => HTMLTagToHTMLElementConstructorName(i))).join(' | ')
}
function HTMLInlineElementsType() {
  return 'type HTMLInlineElements = ' + unique(HTML_INLINE_ELEMENTS.map(i => HTMLTagToHTMLElementConstructorName(i))).join(' | ')
}

/**
* @param {string} tag
*/
function HTMLTagToHTMLElementConstructorName(tag) {
  const document = (new JSDOM(`<!DOCTYPE html>`)).window.document
  return document.createElement(tag).constructor.name
}

/**
* For generating files in Node.js
*/
async function generateElementTypes() {
  const string = `
  export ${HTMLBlockElementsType()}
  export ${HTMLInlineElementsType()}
  `
  await fs.promises.writeFile(path.resolve(__dirname, './test/output', './element-types.ts'), string)
}
generateElementTypes()

/*
// SHOULD be generated:
export type HTMLBlockElements = HTMLParagraphElement | HTMLHeadingElement | HTMLOListElement | HTMLUListElement | HTMLPreElement | HTMLElement | HTMLQuoteElement | HTMLDListElement | HTMLDivElement | HTMLFieldSetElement | HTMLFormElement | HTMLHRElement | HTMLTableElement
export type HTMLInlineElements = HTMLElement | HTMLAnchorElement | HTMLBRElement | HTMLImageElement | HTMLMapElement | HTMLObjectElement | HTMLQuoteElement | HTMLScriptElement | HTMLSpanElement | HTMLButtonElement | HTMLInputElement | HTMLLabelElement | HTMLSelectElement | HTMLTextAreaElement
*/
