import React from 'react';
import history from '../../history';

import '../../styles/Profile.css'

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            profile_url: 'https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/user-account-profile-human-avatar-face-head--512.png'
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authorization')
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Error fetching user!');
            }
        }).then(res => {
            this.setState({
                user: res
            })
        }).catch(err => {
            console.log(err)
        })
    }

    handleLogout() {
        localStorage.removeItem('authorization');
        history.push('/');
    }

    render() {
        return (
            <div className='profile-container'>
                <img src={this.state.profile_url} alt='.' />
                <label className='full-name'>{this.state.user.firstName} {this.state.user.lastName}</label>
                <button type='button' onClick={this.handleLogout}>
                    <span className='fa fa-sign-out fa_color'></span>
                </button>
            </div>
        );
    }
}