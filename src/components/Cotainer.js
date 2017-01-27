import React from 'react';
import Map from './Map';
import GoogleApiComponent from './GoogleApiModules/GoogleApiComponent';

export class Container extends React.Component{
    render(){
        const style = {
            width: '100vw',
            height: '100vh'
        }

        return(
            <div style={style}>
                <Map google={this.props.google}/>
            </div>
        );
    }
}

export default GoogleApiComponent({
    apiKey: 'YOUR_API_KEY'
})(Container)
