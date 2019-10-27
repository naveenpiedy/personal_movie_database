import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components/macro';
import axios from 'axios';

const Styled_Modal = styled(Modal)`
width: 90vw;
max-width: 90vw;
`;


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
        if (this.props.showMovie!=-1){
            console.log(this.props.movie);
        }
        return (
            <Styled_Modal isOpen={this.props.show}>
                <ModalHeader toggle={(e) => { this.onClose(e) }}>{this.props.movie["tmdb_result"]["original_title"]}</ModalHeader>
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" id="-1" onClick={(e) => { this.onClose(e) }}>Cancel</Button>
                </ModalFooter>
            </Styled_Modal>
        )
    }
}