import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '0px' };
    return (
      <Menu style={menuStyle} attached="top" borderless>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image size='mini' src="/images/logo.png"/>
          <span className='bowfolio-green' style={{ fontWeight: 800, fontSize: '24px' }}>Bowfolios</span>
        </Menu.Item>
        {this.props.currentUser ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/home" key='home'>Home</Menu.Item>
        ) : ''}
        <Menu.Item as={NavLink} activeClassName="active" exact to="/profiles" key='profiles'>Profiles</Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/projects" key='projects'>Projects</Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/interests" key='interests'>Interests</Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/lucky" key='lucky'>
            I&apos;m feeling lucky!
        </Menu.Item>
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/addProject" key='addP'>Add Project</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/filter" key='filter'>Filter</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown className='bowfolio-green' text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter so that links work. */
export default withRouter(NavBarContainer);
