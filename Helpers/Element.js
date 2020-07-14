class Element {
	root = null;
	constructor(tag, src = 'src', alt = 'alt') {
		this.elementRoot = document.createElement(tag);
		if (tag === 'img') {
			this.elementRoot.src = src;
			this.elementRoot.alt = alt;
		}
		return this;
	}

	get elementRoot() {
		return this.root;
	}

	set elementRoot(val) {
		this.root = val;
	}

	setId(id) {
		this.elementRoot.setAttribute('id', id);
		return this;
	}

	setType(type) {
		this.elementRoot.setAttribute('type', type);
		return this;
	}

	setPlaceholder(text) {
		this.elementRoot.setAttribute('placeholder', text);
		return this;
	}

	setFor(id) {
		this.elementRoot.setAttribute('for', id);
		return this;
	}

	setRequired() {
		this.elementRoot.setAttribute('required', 'required');
		return this;
	}

	setMethod(method) {
		this.elementRoot.setAttribute('method', method);
		return this;
	}

	setAction(action) {
		this.elementRoot.setAttribute('action', action);
		return this;
	}

	addText(text) {
		this.elementRoot.textContent = text;
		return this;
	}

	addClassNames(...classnames) {
		this.elementRoot.classList.add(...classnames);
		return this;
	}

	addListener(event, listener) {
		this.elementRoot.addEventListener(event, listener);
		return this;
	}

	append(...elements) {
		for (const element of elements) {
			this.elementRoot.append(element.elementRoot);
		}
		return this;
	}
}
