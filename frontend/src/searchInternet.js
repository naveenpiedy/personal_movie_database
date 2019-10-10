import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';
import styled from 'styled-components/macro';
import axios from 'axios';

const Search_Buttons = styled(Button)`
margin: 10px;
background: #87BDFA;
color: white;
`;

const Styled_Input = styled(Input)`
font-size: 25em;
outline: 0;
border-bottom: 5px solid skyblue;
`;


const Styled_IG = styled(InputGroup)`
box-shadow: 0 10px 15px -3px rgba(135,206,250, 0.3), 0 4px 6px -2px rgba(255, 255, 255, .05);
`;

export class SearchInternet extends React.Component {
    constructor(props) {
        super(props);
        this.getmovie = this.getmovie.bind(this);
        this.state = {value: '', result:''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    getmovie() {
        axios.get("/movies/?movie_name=\""+this.state.value+"\"&format=json").then(response => {
            this.setState({result: response.data});
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(this.state.result);
      }
    
    render() {
        return (
            <Container fluid className="mt-5">
                <Row><Col md={{ size: 10, offset: 1 }}>
                    <div>
                        <Styled_IG className="input-group-lg">
                            <Styled_Input id="keyword" placeholder="Enter keyword" type="text" value={this.state.value} onChange={this.handleChange} />
                        </Styled_IG>
                        <div className="text-center mt-4">
                                <Search_Buttons id="search_other" onClick={this.getmovie}>Search Other</Search_Buttons>
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