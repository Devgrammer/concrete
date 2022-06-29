import React from 'react'
import ContentLoader from "react-content-loader"

const Loader = (props) => {
    return (
        <div className="loader-container">
            <ContentLoader
                speed={ 2 }
                width={ 202 }
                height={ 260 }
                viewBox="0 0 202 260"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                { ...props }
            >
                <rect x="7" y="2" rx="3" ry="3" width="190" height="129" />
                <circle cx="266" cy="147" r="20" />
                <rect x="9" y="173" rx="0" ry="0" width="119" height="10" />
                <rect x="9" y="144" rx="0" ry="0" width="184" height="10" />
                <rect x="13" y="231" rx="0" ry="0" width="67" height="27" />
                <circle cx="150" cy="242" r="13" />
                <circle cx="183" cy="242" r="13" />
                <rect x="262" y="-3" rx="0" ry="0" width="104" height="162" />
            </ContentLoader>
        </div>
    )
}

export default Loader
