class Thanks {
    constructor() {
        this.root = this.init();
    }

    init() {
        let thanksWrapper = new Element('div').addClassNames('appointment__thanks', 'thanks');
        let thanksImg = new Element('img', 'assets/thanks.svg', 'Thanks').addClassNames('thanks__image');
        let thanksCaption = new Element('h3').addClassNames('thanks__caption', 'thanks__text', 'thanks__text_bold').addText('Спасибо!');
        let thanksText = new Element('p').addClassNames('thanks__text').addText('Ожидайте, скоро с Вами свяжется наш специалист.');

        return thanksWrapper.append(
            thanksImg,
            thanksCaption,
            thanksText
        );
    }

    render() {
        return this.root.elementRoot;
    }
}