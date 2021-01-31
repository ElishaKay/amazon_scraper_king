import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import FacebookLogin from 'react-facebook-login';
import { loginWithFacebook, authenticate, isAuth } from '../../actions/auth';
import { FACEBOOK_CLIENT_ID } from '../../config';

const LoginFacebook = () => {
    const componentClicked = () => {
        console.log('heyo! the Fb button was clicked!')
    }

    const responseFacebook = response => {
        // console.log(response);
        // const tokenId = response.tokenId;
        // const user = { tokenId };

        console.log('response in LoginFacebook Func', response)

        console.log('Picture', response.picture.data.url)

        // loginWithFacebook(user).then(data => {
        //     if (data.error) {
        //         console.log(data.error);
        //     } else {
        //         authenticate(data, () => {
        //             if (isAuth() && isAuth().role === 1) {
        //                 Router.push(`/admin`);
        //             } else {
        //                 Router.push(`/user`);
        //             }
        //         });
        //     }
        // });
    };

    return (
        <div className="pb-3">
            <FacebookLogin
                appId={`${FACEBOOK_CLIENT_ID}`}
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} 
            />
        </div>
    );
};

export default LoginFacebook;
