import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';
import styled from 'styled-components/macro';

const Search_Buttons = styled(Button)`
margin: 10px;
background: slateblue;
color: white;
border-color: orangered;
`;

const Styled_Input = styled(Input)`
border-color: lightskyblue;
`;


export class SearchInternet extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container fluid className="mt-5">
                <Row><Col md={{ size: 10, offset: 1 }}>
                    <div class="jumbotron">
                        <InputGroup className="input-group-lg">
                            <Styled_Input id="keyword" placeholder="Enter keyword" type="text" />
                        </InputGroup>
                        <div className="text-center mt-4">
                                <Search_Buttons id="search_other">Search Other</Search_Buttons>
                                <Search_Buttons id="search_movies">Search Movie</Search_Buttons>
                                <Search_Buttons id="search_people">Search People</Search_Buttons>
                        </div>
                    </div>
                </Col>
                </Row>
                <Row><Col md={{ size: 10, offset: 1 }}>
                </Col>
                </Row>
            </Container>);
    }
}