import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import { Button } from 'reactstrap';
import styled from 'styled-components/macro';
import { Row, Col } from 'reactstrap';

const Roboto_Card = styled(CardText)`
font-family:'Roboto', sans-serif;
`;

const Raleway_Card = styled(CardText)`
font-family: font-family: 'Raleway', sans-serif;
`;

function values_unpacker(values_list) {

    return values_list.join(", ");

}

function get_year(date) {

    return date.substring(0, 4)
}

export class ListMovies extends React.Component {

    constructor(props) {
        super(props);
    }

    showModal = (e) => {
        this.props.show && this.props.show(e);
    }

    render() {
        var listToBeReturned = this.props.items.map((item) => {
            return (
                <div class="mt-3 mb-3">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md={{ size: 4 }}>
                                    <img src={"https://image.tmdb.org/t/p/w780/" + item["poster_path"]} class="img-thumbnail img-fluid" />
                                </Col>
                                <Col md={{ size: 8 }}>
                                    <CardTitle className="display-4">{item["title"]} ({get_year(item["release_date"])})</CardTitle>
                                    <br />
                                    <Roboto_Card className="h4"><small><i>Overview: </i>{item["overview"]}</small></Roboto_Card>
                                    <br />
                                    <Raleway_Card><i>Genre:</i> {values_unpacker(item["genre_ids"])}</Raleway_Card>
                                    <Raleway_Card><i>Release Date:</i> {item["release_date"]}</Raleway_Card>
                                    <Raleway_Card><i>Vote Average:</i> {item["vote_average"]}</Raleway_Card>
                                    <Raleway_Card><i>Vote Count:</i> {item["vote_count"]}</Raleway_Card>
                                    <Button onClick={(e) => { this.showModal(e) }} id={item["id"]}> Show more details</Button>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </div>
            )
        })
        return (<div>{listToBeReturned}</div>)
    }

}