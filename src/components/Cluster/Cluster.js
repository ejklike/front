import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ClusterInfo } from '../';
import dummy from './dummy.json';

class Cluster extends React.Component {
   constructor(props) { 
      super(props);

      this.state = {
        clusters: []
      };
   }

   componentDidMount() {
    this.setClusters();
   }

   componentDidUpdate(prevProps) {
      if(this.props.isPressed !== prevProps.isPressed) {
         if(this.props.isPressed) {
            this.showClusters();
         } else {
            this.hideClusters();
         }
      }
   }

   setClusters() {
      for(let i=0; i<dummy.length; i++) {
        let pref = {
          strokeColor: 'orange',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'orange',
          fillOpacity: 0.35,
          center: {lat: dummy[i].lat, lng: dummy[i].lng},
          position: {lat: dummy[i].lat, lng: dummy[i].lng},
          radius: dummy[i].radius,
          name: dummy[i].name,
          description: dummy[i].description
        };
        
        let tourCluster = new window.google.maps.Circle(pref);
        
        new window.google.maps.event.addListener(tourCluster, 'mouseover', () => {
          tourCluster.setOptions({
            fillOpacity: 0.6
          });
          const content = ReactDOMServer.renderToString(
              <ClusterInfo name={tourCluster.name} description={tourCluster.description}/>);

          window.infoWindow2.setContent(content);
          window.infoWindow2.open(this.map, tourCluster);
        });
        
        new window.google.maps.event.addListener(tourCluster, 'mouseout', () =>{
          tourCluster.setOptions({
            fillOpacity: 0.35
          });
          window.infoWindow2.close(this.map, tourCluster);
        });

        let newClusters = this.state.clusters;
        newClusters.push(tourCluster);

        this.setState({clusters: newClusters});
      }
   }

   showClusters() {
     for(let i=0; i<this.state.clusters.length; i++) {
       this.state.clusters[i].setMap(this.props.map);
     }
   }

   hideClusters() {
      for(let i=0; i<this.state.clusters.length; i++) {
         this.state.clusters[i].setMap(null);
      }
   }

   render() {
      return null;
   }

}

export default Cluster;