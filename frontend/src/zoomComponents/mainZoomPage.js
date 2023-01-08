import React from "react";

export default function MainZoomPage() {
    return (
        <div>
            <a target="_blank" rel="noreferrer" href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_ZOOM_REDIRECT_URL}`}>
                Authorize Zoom
            </a>
            <a target="_blank" rel="noreferrer" href={'https://localhost:3000/make-meet'}>
                Make Meet
            </a>
            <a target="_blank" rel="noreferrer" href={'https://localhost:3000/join-meet'}>
                Join Meet
            </a>
        </div>
    )
}

