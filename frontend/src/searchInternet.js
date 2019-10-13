import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';
import styled from 'styled-components/macro';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

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

function values_unpacker(values_list){

    return values_list.join(", ");

}

export class SearchInternet extends React.Component {

    constructor(props) {
        super(props);
        this.getmovie = this.getmovie.bind(this);
        this.state = { value: '', result: '', expansion: 'Search' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    getmovie() {
        axios.get("/movies/search_internet/?movie_name=\"" + this.state.value + "\"&format=json").then(response => {
            this.setState({ result: response.data['results'], expansion: 'Search' });
        })
            .catch(function (error) {
                console.log(error);
            });
        console.log(this.state.result)
    }

    render() {
        if (this.state.result != '' && this.state.expansion == 'Search') {
            var list_items = this.state.result.map((item) => {
                return (
                    <div class="mt-3 mb-3">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={{ size: 4 }}>
                                        <img src={"https://image.tmdb.org/t/p/w780/" + item["poster_path"]} class="img-thumbnail img-fluid" />
                                    </Col>
                                    <Col md={{ size: 8 }}>
                                        <CardTitle className="display-4">{item["title"]}</CardTitle>
                                        <br />
                                        <CardText className="h5">Overview: {item["overview"]}</CardText>
                                        <br />
                                        <CardText>Genre: {values_unpacker(item["genre_ids"])}</CardText>
                                        <br />
                                        <CardText>Release Date: {item["release_date"]}</CardText>
                                        <br />
                                        <CardText>Vote Average: {item["vote_average"]}</CardText>
                                        <br />
                                        <CardText>Vote Count: {item["vote_count"]}</CardText>
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </div>
                )
            })
        } else {
            var list_items = <div></div>
        }
        return (
            <Container fluid className="mt-5">
                <Row><Col md={{ size: 10, offset: 1 }}>
                    <div>
                        <Styled_IG className="input-group-lg">
                            <Styled_Input id="keyword" placeholder="Enter keyword" type="text" value={this.state.value} onChange={this.handleChange} />
                        </Styled_IG>
                        <div className="text-center mt-4">
                            <Search_Buttons id="search_other">Search Other</Search_Buttons>
                            <Search_Buttons id="search_movies" onClick={this.getmovie}>Search Movie</Search_Buttons>
                            <Search_Buttons id="search_people">Search People</Search_Buttons>
                        </div>
                    </div>
                </Col>
                </Row>
                <Row><Col md={{ size: 6, offset: 3 }}>
                    {list_items}
                </Col>
                </Row>
            </Container>);
    }
}