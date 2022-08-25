class ZButton extends HTMLElement {
  //     constructor: Ejecutado al instanciar el componente
  // conectedCallback: Ejecutado al insertar en el DOM
  // disconnectedCallback Ejecutado al retirarlo del DOM
  // attributeChangedCallback: Ejecutado al cambiar uno de sus atributos
  // adoptedCallback: Ejecutado cuando el componente se mueve a otro documento
  pendingsCall;
  mul;

  constructor() {
    super();
    // element created
    this.pendingsCall = [];
    this.attachShadow({ mode: "open" });
    const template = this.defineStyle();
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log(
      "browser calls this method when the element is added to the document"
    );

    this.createBase01();
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    console.log(
      "browser calls this method when the element is removed from the document"
    );
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return ["color", "text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("called when one of attributes listed above is modified");
    console.log("Change ", name, oldValue, newValue);
    if (name === "color") {
      if (!oldValue) {
        this.pendingsCall.push({
          callback: this.__updateByColor,
          parameters: [oldValue, newValue],
          context: this,
        });
      }
    }
    // called when one of attributes listed above is modified
  }

  adoptedCallback() {
    console.log("called when the element is moved to a new document");
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  addCounter(num) {
    for (let i = 0; i < num; i++) {
      setTimeout(() => {
        const t = `${this.getAttribute("text")} ${(i + 1) * this.mul}`;
        this.setAttribute("text", t);
        this.__UpdateText(t);
      }, 1000 * i);
    }
  }

  setMult(mul) {
    this.mul = mul;
  }

  __updateByColor(newValue) {
    const p = this.shadowRoot.querySelector("p");
    if (!!p) {
      p.classList.add(newValue);
    }
  }
  createBase01() {
    const p = document.createElement("p");
    p.innerText = this.getAttribute("text");

    this.shadowRoot.appendChild(p);
  }

  __UpdateText(text) {
    console.log(text);
    const p = this.shadowRoot.querySelector(TEXT_SELECTOR);
    p.innerText = text;
  }

  render() {}

  defineStyle() {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: inline-block;
          background-size: contain;
          width: 100%;
          height: 24px;
        }
        .danger{
            background: red;
            color: white;
        }
        .primary{
            background: dodgerblue;
            color: white;
        }
        
        
      </style>
    `;
    return template;
  }
}
