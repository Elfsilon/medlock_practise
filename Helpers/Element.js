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
