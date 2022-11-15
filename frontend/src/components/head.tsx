import React from 'react';
import {Helmet} from "react-helmet";

interface HeadProps {
    title : string
}

const Head = (props: HeadProps) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    );
};

export default Head;