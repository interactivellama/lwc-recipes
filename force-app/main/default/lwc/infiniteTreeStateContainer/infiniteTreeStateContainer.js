import { LightningElement, api, track } from 'lwc';
import { classSet } from 'c/utils';
import { classListMutation, normalizeString } from 'c/utilsPrivate';
import { computeSldsClass } from 'c/iconUtils';

const items = [
    {
        label: 'Western Sales Director',
        name: '1',
        items: [
            {
                label: 'Western Sales Manager',
                name: '2',
                items: [
                    {
                        label: 'CA Sales Rep',
                        name: '3',
                        variableType: 'text',
                        items: []
                    },
                    {
                        label: 'OR Sales Rep',
                        name: '4',
                        variableType: 'text',
                        items: []
                    }
                ]
            }
        ]
    },
    {
        label: 'Eastern Sales Director',
        name: '5',
        items: [
            {
                label: 'Eastern Sales Manager',
                name: '6',
                items: [
                    {
                        label: 'NY Sales Rep',
                        name: '7',
                        variableType: 'text',
                        items: []
                    },
                    {
                        label: 'MA Sales Rep',
                        name: '8',
                        variableType: 'text',
                        items: []
                    }
                ]
            }
        ]
    }
];

const mapping = {
    '1': 'Western Sales Director',
    '2': 'Western Sales Manager',
    '3': 'CA Sales Rep',
    '4': 'OR Sales Rep',
    '5': 'Eastern Sales Director',
    '6': 'Eastern Sales Manager',
    '7': 'NY Sales Rep',
    '8': 'MA Sales Rep'
};

const initialState = { path: [0, 0] };

export default class cInfiniteTreeStateContainer extends LightningElement {
    @track treeList = items;
    @track pathList;

    constructor() {
        super();
        this.pathList = initialState.path;
        this.template.addEventListener(
            'select',
            this.handleClickBranch.bind(this)
        );
        this.template.addEventListener(
            'request_path_change',
            this.handlePathChange.bind(this)
        );
    }

    handleClickBranch(e) {
        if (e.detail) {
            this.pathList = this.pathList.concat([e.detail.treeIndex]);
            console.log(this.pathList);
        }
    }

    handlePathChange(e) {
        this.pathList = e.detail.data.path;
    }
}
