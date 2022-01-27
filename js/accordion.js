class Accordion {
    selector;
    accordionItems;
    accordionItemDom = '.accordion-item';
    accordionHeadDom = '.accordion-head';
    accordionIconDom = '.accordion-icon';
    expandedClass = 'show';
    options = {
        collapseSiblings: false,
        collapseIcon: '-',
        expandIcon: '+',
        expandedHandler(accordionItem, accordionItemIndex) {
        },
        collapsedHandler(accordionItem, accordionItemIndex) {
        },
    };

    constructor(selector, options) {
        this.selector = document.querySelector(selector);
        this.accordionItems = this.selector.querySelectorAll(this.accordionItemDom);
        this.options = {...this.options, ...options};
        this.initial();
        this.registerEvent();
    }

    initial() {
        const current = this;
        const accordionHeads = this.selector.querySelectorAll(this.accordionHeadDom);
        accordionHeads.forEach((accordionHead) => {
            let isExpandedAccordion = accordionHead.closest(`.${this.expandedClass}`);
            accordionHead.querySelector(this.accordionIconDom).innerHTML = isExpandedAccordion ?
                current.options.collapseIcon : current.options.expandIcon;
        });
    }

    registerEvent() {
        const current = this;

        this.accordionItems.forEach((accordionItem, accordionItemIndex) => {
            accordionItem.querySelector(this.accordionHeadDom).addEventListener('click', () => {
                current.options.collapseSiblings ?
                    current._collapseSiblings(accordionItemIndex) : null;
                current._toggleAccordionBody(accordionItem, accordionItemIndex);
            });
        });
    }

    _collapseSiblings(accordionItemIndex) {
        const current = this;

        this.accordionItems.forEach((item, itemIndex) => {
            if (accordionItemIndex !== itemIndex) {
                item.classList.remove(this.expandedClass);
                item.querySelector(this.accordionIconDom).innerHTML = current.options.expandIcon;
            }
        });
    }

    _toggleAccordionBody(accordionItem, accordionItemIndex) {
        const isAccordionBodyExpanded = accordionItem.classList.toggle(this.expandedClass);

        if (isAccordionBodyExpanded) {
            accordionItem.querySelector(this.accordionIconDom).innerHTML = this.options.collapseIcon;
            this.options.expandedHandler(accordionItem, accordionItemIndex);
        } else {
            accordionItem.querySelector(this.accordionIconDom).innerHTML = this.options.expandIcon;
            this.options.collapsedHandler(accordionItem, accordionItemIndex);
        }
    }
}
