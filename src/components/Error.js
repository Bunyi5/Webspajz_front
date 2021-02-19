import React from 'react'

import '../styles/Error.css'

export default class Error extends React.Component{
    render(){
        return(
            <div className='error-page'>
                <img className='mb-3' src={process.env.PUBLIC_URL + '/logo.png'} alt='logo'/>
                <div>401</div>
                <div>Unauthorized user</div>
                <a href='/'>Log into your account</a>
            </div>
        )
    }
}
