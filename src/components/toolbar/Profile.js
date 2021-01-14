import React from 'react';

import '../../styles/Profile.css'



export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile_url: 'https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/user-account-profile-human-avatar-face-head--512.png'
        };
    }

/*     componentDidMount() {
        fetch('', {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw Error('Error fetching profile picture!')
                }
                return response.blob()
            })
            .then(image => {
                this.setState({
                    images: image
                })
            })
            .catch(err => {
                console.log(err)
            })
    } */

    render() {
        return (
            <div className='profile-container'>
                <img src={this.state.profile_url} alt='.' />
                <label>Név</label>
                <button type='button'>
                    <span className='fa fa-sign-out fa_color'></span>
                </button>
            </div>
        );
    }
}