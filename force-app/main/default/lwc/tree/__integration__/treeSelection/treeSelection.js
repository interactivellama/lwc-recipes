import { LightningElement, track } from 'lwc';
const items = [
    {
        label: 'Asia Pacific Sales',
        name: 'Asia Pacific Sales',
        id: '1',
        disabled: false,
        expanded: false,
        items: [
            {
                label: 'Asia Sales',
                name: 'Asia Sales',
                id: '1.1',
                disabled: false,
                items: [],
            },
        ],
    },
    {
        label: 'Europe Sales',
        name: 'Europe Sales',
        disabled: false,
        expanded: true,
        items: [
            {
                label: 'UK Sales',
                name: 'UK Sales',
                disabled: false,
                items: [],
            },
            {
                label: 'EU Sales',
                name: 'EU Sales',
                disabled: false,
                items: [],
            },
        ],
    },
    {
        label: 'Americas',
        name: 'Americas',
        disabled: false,
        expanded: false,
        items: [
            {
                label: 'Northern America Sales',
                name: 'Northern America Sales',
                disabled: false,
                items: [
                    {
                        label: 'United States Sales',
                        name: 'United States Sales',
                        disabled: false,
                        items: [],
                    },
                ],
            },
        ],
    },
];
export default class TreeSelection extends LightningElement {
    @track treeList = items;

    @track _selected = 'United States Sales';

    get selected() {
        return this._selected;
    }

    handleClick() {
        this._selected = 'Americas';
    }
}
