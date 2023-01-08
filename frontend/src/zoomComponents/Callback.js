import React from "react";

export default function Callback() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let code = params.get('code');

    React.useEffect(() => {
        if (code) {
          fetch('http://localhost:4000/connectZoom', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({code}),
          }).then(() => {
            console.log("Getting access token")
          }).catch(() => {
            console.log("Error retrieving access token")
          });
        }
      }, [code]);

    return (
        <div>
            <h1 align='center'>Authorizing</h1>
        </div>
    )
}