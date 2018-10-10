import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext();

const childrenShape = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
]).isRequired;

export class View extends PureComponent {
    static propTypes = {
        view: PropTypes.node,
        children: childrenShape,
    };

    state = {
        slots: {},
    };

    render() {
        const { view, children } = this.props;
        const { slots } = this.state;

        return (
            <Provider value={{
                slots,
                updateSlot: (slot, value) => this.setState({
                    slots: { ...slots, [slot]: value },
                }),
            }}>
                {view}
                {children}
            </Provider>
        );
    }
}

export const Slot = ({ name }) => (
    <Consumer>
        {({ slots }) => slots[name]}
    </Consumer>
);

Slot.propTypes = {
    name: PropTypes.string,
};

export const Template = ({ slot, children }) => (
    <Consumer>{content => (
        <TemplateNotifier
            slot={slot}
            updateSlot={() => content.updateSlot(slot, children)}
        />
    )}</Consumer>
);

Slot.propTypes = {
    slot: PropTypes.string,
    children: childrenShape,
};

class TemplateNotifier extends PureComponent {
    static propTypes = {
        updateSlot: PropTypes.func,
    };

    componentDidMount() {
        this.props.updateSlot();
    }

    render() {
        return null;
    }
}
