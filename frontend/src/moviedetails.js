import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    render() {
        if (!this.props.show) {
            return null
        }
        return (
            <Modal isOpen={this.props.show}>
                <ModalHeader toggle={(e) => { this.onClose(e) }}>{this.props.movie}</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" id="-1" onClick={(e) => { this.onClose(e) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}