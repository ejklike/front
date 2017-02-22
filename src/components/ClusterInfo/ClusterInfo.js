import React from 'react';

class ClusterInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <strong>{this.props.name}</strong> <br/>
                {this.props.description}
            </div>
        );
    }
}

export default ClusterInfo;