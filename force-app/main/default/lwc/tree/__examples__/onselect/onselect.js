import { LightningElement, track } from 'lwc';

export default class TreeOnselect extends LightningElement {
    @track selectedItemValue;

    handleOnselect(event) {
        const item = this.findNested(this.items, 'name', event.detail.name);

        this.selectedItemValue = item.label;
    }

    // Searches the object for the item containing a key of the provided name that contains the value provided
    findNested(obj, key, value) {
        // Base case
        if (obj[key] === value) {
            return obj;
        }

        // otherwise
        const objKeys = Object.keys(obj);
        objKeys.forEach(objKey => {
            let found;
            if (typeof obj[objKey] === 'object' || Array.isArray(obj[objKey])) {
                found = this.findNested(obj[objKey], objKey, value);
            }
            return found;
        });

        return null;
    }

    items = [
        {
            label: 'User',
            name: 'user',
            disabled: false,
            expanded: true,
            items: [
                {
                    label: 'Standard User',
                    name: 'standard_user',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
                {
                    label: 'Chatter User',
                    name: 'chatter_user',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
            ],
        },
        {
            label: 'Administrator',
            name: 'administrator',
            disabled: false,
            expanded: true,
            items: [
                {
                    label: 'System Administrator',
                    name: 'system_administrator',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
                {
                    label: 'Chatter Administrator',
                    name: 'chatter_administrator',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
            ],
        },
        {
            label: 'Community User',
            name: 'community_user',
            disabled: false,
            expanded: true,
            items: [
                {
                    label: 'Community Login User',
                    name: 'community_login_user',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
                {
                    label: 'Community Plus Login User',
                    name: 'community_plus_login_user',
                    disabled: false,
                    expanded: true,
                    items: [],
                },
            ],
        },
    ];
}
