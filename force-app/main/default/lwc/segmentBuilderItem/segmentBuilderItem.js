import { LightningElement, track, api } from 'lwc';
// import getContactList from '@salesforce/apex/ContactController.getContactList';

const IS_OPEN = 'is-open';
const IS_CLOSED = 'is-closed';

export default class segmentBuilder extends LightningElement {
    @track rules = {
        label: 'OR Condition',
        type: 'group',
        nodes: [
            { label: 'Sales Order Product:', operator: 'At least', value: '10' }
        ]
    };

    @track conditionToggleOptions = [
        { label: 'AND', value: 'and' },
        { label: 'OR', value: 'or' }
    ];

    @track picklistOptions = [
        { label: 'First Name', value: 'first-name' },
        { label: 'Last Name', value: 'last-name' },
        { label: 'Name', value: 'name' }
    ];

    @track conditionalPicklistOptions = [
        { label: 'Is equal to', value: 'is-equal-to' }
    ];

    @track andOrPicklistOptions = [
        { label: 'AND', value: 'and' },
        { label: 'OR', value: 'or' }
    ];

    @track picklistValue = 'first-name';

    @track state = {
        ruleIsOpen: false,
        conditionalGroupIsOr: false,
        conditionalGroupIsOr2: false,
        conditionalGroupIsOr3: false
    };

    handleDeleteClicked(e) {}

    get ruleIsOpen() {
        return this.state.ruleIsOpen;
    }

    set ruleIsOpen(value) {
        this.state.ruleIsOpen = value;
    }

    get profileRuleIsOpen() {
        return this.state.profileRuleIsOpen;
    }

    set profileRuleIsOpen(value) {
        this.state.profileRuleIsOpen = value;
    }

    get conditionalGroupIsOr() {
        return this.state.conditionalGroupIsOr;
    }

    set conditionalGroupIsOr(value) {
        this.state.conditionalGroupIsOr = value;
    }

    get conditionalGroupIsOr2() {
        return this.state.conditionalGroupIsOr2;
    }

    set conditionalGroupIsOr2(value) {
        this.state.conditionalGroupIsOr2 = value;
    }

    get conditionalGroupIsOr3() {
        return this.state.conditionalGroupIsOr3;
    }

    set conditionalGroupIsOr3(value) {
        this.state.conditionalGroupIsOr3 = value;
    }

    handleConditionalGroupClick(e) {
        this.state.conditionalGroupIsOr = !this.state.conditionalGroupIsOr;
    }

    handleConditionalGroupClick2(e) {
        this.state.conditionalGroupIsOr2 = !this.state.conditionalGroupIsOr2;
    }

    handleConditionalGroupClick3(e) {
        this.state.conditionalGroupIsOr3 = !this.state.conditionalGroupIsOr3;
    }

    handleAggregateRuleOpenClick(e) {
        this.state.ruleIsOpen = !this.state.ruleIsOpen;
        const aggregateEditPanel = this.template.querySelector(
            '.aggregate-panel'
        );
        aggregateEditPanel.classList.add(IS_OPEN);

        const closedRuleActions = this.template.querySelector(
            '.aggregate-closed-rule-actions'
        );
        closedRuleActions.classList.add(IS_CLOSED);

        const aggregateRulesPanelClosed = this.template.querySelector(
            '.aggregate-rules-panel-closed'
        );
        aggregateRulesPanelClosed.classList.add(IS_CLOSED);

        // move focus to first tab stop in edit panel
        const comboboxInput = this.template.querySelector(
            '.aggregate-panel lightning-combobox'
        );
        comboboxInput.focus();
    }

    handleAggregatePanelCloseClick(e) {
        this.state.ruleIsOpen = !this.state.ruleIsOpen;
        const aggregateChildren = this.template.querySelector(
            '.aggregate-panel'
        );
        aggregateChildren.classList.remove(IS_OPEN);

        const closedRuleActions = this.template.querySelector(
            '.aggregate-closed-rule-actions'
        );
        closedRuleActions.classList.remove(IS_CLOSED);

        const aggregateRulesPanelClosed = this.template.querySelector(
            '.aggregate-rules-panel-closed'
        );
        aggregateRulesPanelClosed.classList.remove(IS_CLOSED);

        // return focus to edit button
        const ruleActions = this.template.querySelector(
            '.aggregate-closed-rule-actions button'
        );
        ruleActions.focus();
    }

    handleProfileRuleOpenClick(e) {
        this.state.profileRuleIsOpen = !this.state.profileRuleIsOpen;
        const profileRuleChildren = this.template.querySelector(
            '.profile-rule-panel'
        );
        profileRuleChildren.classList.add(IS_OPEN);

        const closedProfileRuleActions = this.template.querySelector(
            '.closed-profile-rule-actions'
        );
        closedProfileRuleActions.classList.add(IS_CLOSED);

        const profileRulePanelClosed = this.template.querySelector(
            '.profile-rule-panel-closed'
        );
        profileRulePanelClosed.classList.add(IS_CLOSED);

        // move focus to first tab stop in edit panel
        const comboboxInput = this.template.querySelector(
            '.profile-rule-panel lightning-combobox'
        );
        comboboxInput.focus();
    }

    handleProfilePanelCloseClick(e) {
        this.state.profileRuleIsOpen = !this.state.profileRuleIsOpen;
        const profileRuleChildren = this.template.querySelector(
            '.profile-rule-panel'
        );
        profileRuleChildren.classList.remove(IS_OPEN);

        const closedProfileRuleActions = this.template.querySelector(
            '.closed-profile-rule-actions'
        );
        closedProfileRuleActions.classList.remove(IS_CLOSED);

        const profileRulePanelClosed = this.template.querySelector(
            '.profile-rule-panel-closed'
        );
        profileRulePanelClosed.classList.remove(IS_CLOSED);

        // return focus to edit button
        const ruleActions = this.template.querySelector(
            '.closed-profile-rule-actions button'
        );
        ruleActions.focus();
    }

    handlePicklistChange(e) {
        this.picklistValue = event.detail.value;
    }

    handleConditionalPicklistChange(e) {
        this.conditionalPicklistValue = event.detail.value;
    }

    handleLoad() {
        // getContactList()
        //     .then(result => {
        //         this.contacts = result;
        //         this.error = undefined;
        //     })
        //     .catch(error => {
        //         this.error = error;
        //         this.contacts = undefined;
        //     });
    }

    connectedCallback() {
      this.setAttribute('role', 'listitem');
  }
}
