import React from 'react'
import ReactDOM from 'react-dom'
import Application from "./components/Application"
import objectFitImages from 'object-fit-images'

let filteringMatchesElement = document.getElementsByTagName('filtering-matches-application')[0];
let serverUrl = filteringMatchesElement.attributes["serverurl"].value;

ReactDOM.render(<Application serverUrl={serverUrl}/>, filteringMatchesElement);

objectFitImages();

