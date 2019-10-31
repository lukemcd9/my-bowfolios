import React from 'react';
import { Card, Header, Image, Label } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';

/** Component for layout out a Profile Card. */
export const MakeCard = (props) => (
    <Card>
        <Card.Content>
            <Image floated='right' size='mini' src={props.profile.picture} />
            <Card.Header>{props.profile.firstName} {props.profile.lastName}</Card.Header>
            <Card.Meta>
                <span className='date'>{props.profile.title}</span>
            </Card.Meta>
            <Card.Description>
                {props.profile.bio}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            {_.map(props.profile.interests,
                (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
        </Card.Content>
        <Card.Content extra>
            <Header as='h5'>Projects</Header>
            {_.map(props.profile.projects, (project, index) => <Image key={index} size='mini' src={project}/>)}
        </Card.Content>
    </Card>
);

MakeCard.propTypes = {
    profile: PropTypes.object.isRequired,
};
