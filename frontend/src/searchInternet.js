import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


export class SearchInternet extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container fluid className="mt-5">
                <Row><Col md={{ size: 10, offset: 1 }}>
                <InputGroup className="input-group-lg">
                    <Input placeholder="Enter keyword" />
                </InputGroup>
                </Col>
                </Row>
                <Row><Col md={{ size: 10, offset: 1 }}>
                </Col>
                </Row>
            </Container>);
    }
}