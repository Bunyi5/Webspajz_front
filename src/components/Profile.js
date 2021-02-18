import React from 'react';
import history from '../history';

import '../styles/Profile.css'

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
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
            <div className='d-flex'>
                <label className='p-2 text-white-50'>{this.state.user.firstName} {this.state.user.lastName}</label>
                <button className='btn btn-sm' type='button' onClick={this.handleLogout}>
                    <span className='fa fa-sign-out fa_color'/>
                </button>
            </div>
        );
    }
}
