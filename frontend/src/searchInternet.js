import React from 'react';
import { InputGroup, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import styled from 'styled-components/macro';
import axios from 'axios';
import { MovieDetails } from './moviedetails';
import { ListMovies } from './listMovies';

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
        this.getMovieList = this.getMovieList.bind(this);
        this.state = { value: '', result: '', expansion: 'Search', show: false, showMovie: -1 };
        this.handleChange = this.handleChange.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    getMovieList() {
        axios.get("/movies/search_internet/?movie_name=\"" + this.state.value + "\"&format=json").then(response => {
            this.setState({ result: response.data['results'], expansion: 'Search' });
        })
            .catch(function (error) {
                console.log(error);
            });
        console.log(this.state.result)
    }

    showModal(event) {
        const id = event.target.id;
        axios.get("/movies/get_by_id/", {
            params: {
                tmdb_id: id
            }
        }).then(response => {
            this.setState({
                ...this.state,
                show: !this.state.show,
                showMovie: response.data
            });
        })
            .catch(function (error) {
                return error
            });
        console.log(this.state.showMovie)
    }

    render() {
        if (this.state.result != '' && this.state.expansion == 'Search') {
            var list_items = <ListMovies items={this.state.result} show={this.showModal} />
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
                            <Search_Buttons id="search_movies" onClick={this.getMovieList}>Search Movie</Search_Buttons>
                            <Search_Buttons id="search_people">Search People</Search_Buttons>
                        </div>
                    </div>
                </Col>
                </Row>
                <MovieDetails show={this.state.show} movie={this.state.showMovie} onClose={this.showModal} />
                <Row><Col md={{ size: 6, offset: 3 }}>
                    {list_items}
                </Col>
                </Row>
            </Container>);
    }
}